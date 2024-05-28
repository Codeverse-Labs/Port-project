import { React, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  useDeleteUserMobileMutation,
  useGetAllVecantUserMobileQuery,
  useNewUserMobileMutation,
  useUpdateUserMobileMutation,
  useGetAllVecantUsersQuery,
} from '../../services/userMobileService';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import moment from 'moment-timezone';
import { parseISO } from 'date-fns';

function UserMobileVecantPage() {
  const navigate = useNavigate();
  const { data: userMobileVecantData, isLoading: userVecantMobileLoading } =
    useGetAllVecantUserMobileQuery();
  const {
    data: userMobileVecantUserData,
    isLoading: userMobileVecantUserLoading,
  } = useGetAllVecantUsersQuery();

  const [updateUserMobile] = useUpdateUserMobileMutation();
  const [deleteUserMobile] = useDeleteUserMobileMutation();

  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    userId: '',
    mobileId: '',
    GivenFrom: new Date(),
    GivenUntill: null,
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

  const handleUserMobileEdit = (id, MobileNumber) => {
    setIsUpdate(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setFormData({
      mobileId: id,
    });
  };

  function convertToISO(dateString) {
    // Parse the date string into a Date object
    const date = new Date(dateString);
  
    // Get the ISO string from the Date object
    const isoString = date.toISOString();
  
    return isoString;
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    const userMobileUpdateData = {
      id: formData.mobileId,
      UserId: formData.userId,
      GivenFrom: convertToISO(formData.GivenFrom),
      GivenUntill: null,
    };

    console.log(formData)

    const UserMobileUpdateRes = await updateUserMobile(userMobileUpdateData);

    setFormData({
      userId: '',
      mobileId: '',
      GivenFrom: new Date(),
      GivenUntill: null,
    });
    setIsUpdate(false);

    if (UserMobileUpdateRes.data) {
      toast.success('User Mobile Assigned successfully');
    }

    if (UserMobileUpdateRes.error) {
      toast.error('User Mobile assign failed');
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
          <div className=" mt-4">
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20 border border-gray-600">
              <div class="flex -mx-3 mb-2 justify-center justify-items-center">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Phone Numbers
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="mobileId"
                      value={formData.mobileId}
                      type="text"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select Phone Number</option>
                      {!userVecantMobileLoading &&
                        userMobileVecantData.map((item) => (
                          <option key={item.Id} value={item.Id}>
                            {item.MobileNumber}
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
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Users
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="userId"
                      value={formData.userId}
                      type="text"
                      required
                      onChange={handleChange}
                    >
                      <option value="">Select User</option>
                      {!userMobileVecantUserLoading &&
                        userMobileVecantUserData.map((item) => (
                          <option key={item.Id} value={item.Id}>
                            {item.Name}
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

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Given From
                  </label>
                  <div class="relative">
                    <DatePicker
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      onChange={handleGivenFromDateChange}
                      value={formData.GivenFrom}
                    />
                  </div>
                </div>
              </div>
              <button
                class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="button"
                onClick={handleSubmit}
              >
                Assign Number
              </button>
            </form>
          </div>

          {!userVecantMobileLoading && userMobileVecantData?.length !== 0 && (
            <div className="mx-2 flex-grow justify-center justify-items-center">
              <div className="text-xl text-center mt-6">Mobile Numbers</div>
              <table className="border-collapse mt-6 mx-auto">
                <thead>
                  <tr>
                    {Object.keys(userMobileVecantData[0])?.map(
                      (header, index) => (
                        <th
                          key={index}
                          className="border border-gray-500 px-4 py-2"
                        >
                          {header}
                        </th>
                      )
                    )}
                    <th className="border border-gray-500 px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {userMobileVecantData?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.keys(userMobileVecantData[0]).map(
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
                                row.MobileNumber
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

export default UserMobileVecantPage;
