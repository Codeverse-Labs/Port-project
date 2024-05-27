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

function UserMobilePage() {
  const { data: userMobileData, isLoading: userLoading } =
    useGetAllUserMobileQuery();
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery();

  const [newUserMobile] = useNewUserMobileMutation();
  const [updateUserMobile] = useUpdateUserMobileMutation();
  const [deleteUserMobile] = useDeleteUserMobileMutation();

  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    mobileId: '',
    number: '',
    userId: '',
    GivenFrom: '',
    GivenUntill: '',
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

  const handleUserMobileEdit = (id, MobileNumber, GivenFrom, GivenUntill) => {
    setIsUpdate(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setFormData({
      mobileId: id,
      number: MobileNumber,
      GivenFrom: GivenFrom === '0000-00-00' ? '' : GivenFrom,
      GivenUntill: GivenUntill === '0000-00-00' ? '' : GivenUntill,
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
      UserId: 160,
      GivenFrom: formData.GivenFrom,
      GivenUntill: formData.GivenUntill,
    };

    if (isUpdate === true) {
      const UserMobileUpdateRes = await updateUserMobile(userMobileUpdateData);

      setFormData({
        mobileId: '',
        number: '',
        userId: '',
        GivenFrom: '',
        GivenUntill: '',
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
          <div className="">
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20">
              <div class="flex -mx-3 mb-2 justify-center justify-items-center">
                {
                  <div
                    class={`${isUpdate ? 'w-1/4' : 'w-1/3'} px-3 mb-6 md:mb-0`}
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
                      />
                    </div>
                  </div>
                }

                {isUpdate && (
                  <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                    <label
                      class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                      for="grid-state"
                    >
                      Select User
                    </label>
                    <div class="relative">
                      <select
                        class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                        id="grid-state"
                        name="department"
                        value={formData.department}
                        type="text"
                        required
                        onChange={handleChange}
                      >
                        <option value="">Select Department</option>
                        {!departmentLoading &&
                          departmentData.map((departments) => (
                            <option
                              key={departments.Id}
                              value={departments.Name}
                            >
                              {departments.Name}
                            </option>
                          ))}
                      </select>
                      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg
                          class="fill-current h-4 w-4"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                )}

                {isUpdate && (
                  <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
                      />
                    </div>
                  </div>
                )}

                {isUpdate && (
                  <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
              <div className="text-xl text-center mt-6">Mobile Numbers</div>
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
                            onClick={() => {
                              handleDeleteUser(row.Id);
                            }}
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
