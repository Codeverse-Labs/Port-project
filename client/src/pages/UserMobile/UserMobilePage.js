


import { React, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  useDeleteUserMobileMutation,
  useGetAllUserMobileQuery,
  useNewUserMobileMutation,
  useUpdateUserMobileMutation,
} from '../../services/userMobileService';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useGetAllDepartmentsQuery } from '../../services/departmentService';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function UserMobilePage() {
    const navigate = useNavigate();
  const { data: userMobileData, isLoading: userLoading } =
    useGetAllUserMobileQuery();
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery();

  const [newUserMobile] = useNewUserMobileMutation();
  const [updateUserMobile] = useUpdateUserMobileMutation();
  const [deleteUserMobile] = useDeleteUserMobileMutation();

  const [isUpdate, setIsUpdate] = useState(false);
  const [isAssign, setIsAssign] = useState(false);

  const [formData, setFormData] = useState({
    mobileId: '',
    number: '',
    userId: '',
    GivenFrom: new Date(),
    GivenUntill: new Date(),
  });

  const handleGivenFromDateChange = (date) => {
    setFormData({
      ...formData,
      GivenFrom: date,
    });
  };

  const handleGivenUntilDateChange = (date) => {
    setFormData({
      ...formData,
      GivenUntill: date,
    });
  };

  function convertToISO(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);
  
    // Get the ISO string from the Date object
    const isoString = date.toISOString();
  
    return isoString;
  }
  

  const handleUserMobileEdit = (id, user, MobileNumber, GivenFrom, GivenUntill) => {
    setIsUpdate(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setFormData({
      mobileId: id,
      userId: user,
      number: MobileNumber,
      GivenFrom: GivenFrom,
      GivenUntill: GivenUntill === null ? new Date() : GivenUntill,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const userMobileCreateData = {
      MobileNumber: formData.number,
    };

    const userMobileUpdateData = {
      id: formData.mobileId,
      UserId: formData.userId,
      GivenFrom: formData.GivenFrom,
      GivenUntill: convertToISO(formData.GivenUntill),
    };

    console.log(formData)

    if (isUpdate === true) {
      const UserMobileUpdateRes = await updateUserMobile(userMobileUpdateData);

      setFormData({
        mobileId: '',
        number: '',
        userId: '',
        GivenFrom: new Date(),
        GivenUntill: new Date(),
      });
      setIsUpdate(false);

      if (UserMobileUpdateRes.data) {
        toast.success('User Mobile updated successfully');
      }

      if (UserMobileUpdateRes.error) {
        toast.error('User Mobile update failed');
      }
    } else {
      const UserMobileCreateRes = await newUserMobile(userMobileCreateData);
      setFormData({
        number: '',
      });

      if (UserMobileCreateRes.data) {
        toast.success('User Mobile created successfully');
      }

      if (UserMobileCreateRes.error) {
        toast.error('User Mobile create failed');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const deleteUserRes = await deleteUserMobile(id);

    if (deleteUserRes.error) {
      toast.error('User delete failed');
    } else {
      toast.success('User deleted successfully');
    }
  };
  return (
    <>
      <div className="h-[75px]">
        <Navbar />
      </div>
      <div className=" flex justify-items-center">
        <div className="w-[300px]">
          <Sidebar />
        </div>
        <div className="flex-grow justify-center justify-items-center z-10">

        <div className="mt-4 flex justify-center justify-items-center">
            <button
              class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="button"
              onClick={() => navigate('/mobitel/usermobile/vecant')}
            >
              Assign Vecant Numbers
            </button>
          </div>
          <div className=" mt-4">
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20 border border-gray-600">
              <div class="flex -mx-3 mb-2 justify-center justify-items-center">
                {
                  <div
                    class={`${isUpdate ? 'w-1/3' : 'w-1/3'} px-3 mb-6 md:mb-0`}
                  >
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      Phone Number
                    </label>
                    <div class="relative flex items-center gap-2">
                      <p>(+94)</p>
                      <input
                        class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        name="number"
                        value={formData.number}
                        type="text"
                        required
                        onChange={handleChange}
                        disabled={isUpdate ? true: false}
                      />
                    </div>
                  </div>
                }


                {isUpdate && (
                  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      Given Date
                    </label>
                    <div class="relative">
                      <DatePicker
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={handleGivenFromDateChange}
                        value={formData.GivenFrom}
                        id="grid-state"
                        disabled
                      />
                    </div>
                  </div>
                )}

                {isUpdate && (
                  <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      Given Until
                    </label>
                    <div class="relative">
                      <DatePicker
                        className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        onChange={handleGivenUntilDateChange}
                        value={formData.GivenUntill}
                      />
                    </div>
                  </div>
                )}
              </div>
              <button
                class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="button"
                onClick={handleSubmit}
              >
                {isUpdate ? 'Edit Number' : 'Add Number'}
              </button>
            </form>
          </div>

          {!userLoading && userMobileData?.length !== 0 && (
            <div className="mx-2 flex-grow justify-center justify-items-center">
              <div className="text-xl text-center mt-6">Vecant Mobile Numbers</div>
              <table className="border-collapse mt-6 mx-auto">
                <thead>
                  <tr>
                    {Object.keys(userMobileData[0])?.map((header, index) => (
                      <th
                        key={index}
                        className="border border-gray-500 px-4 py-2"
                      >
                        {header}
                      </th>
                    ))}
                    <th className="border border-gray-500 px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {userMobileData?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.keys(userMobileData[0]).map(
                        (header, colIndex) => (
                          <td
                            key={colIndex}
                            className="border border-gray-500 px-4 py-2"
                          >
                            {row[header]}
                          </td>
                        )
                      )}
                      <td className="border border-gray-500 px-4 py-2">
                        <div className="flex justify-between gap-2">
                          <button
                            className="text-gray-600"
                            onClick={() =>
                              handleUserMobileEdit(
                                row.Id,
                                row.UserId,
                                row.MobileNumber,
                                row.GivenFrom,
                                row.GivenUntill
                              )
                            }
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            className="text-red-500"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserMobilePage;

