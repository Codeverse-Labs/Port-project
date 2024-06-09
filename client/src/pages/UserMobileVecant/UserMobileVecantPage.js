import { React, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  useDeleteUserMobileMutation,
  useGetAllVecantUserMobileQuery,
  useUpdateUserMobileMutation,
  useGetAllVecantUsersQuery,
} from '../../services/userMobileService';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function UserMobileVecantPage() {
  const { data: userMobileVecantData, isLoading: userVecantMobileLoading } =
    useGetAllVecantUserMobileQuery();
  const {
    data: userMobileVecantUserData,
    isLoading: userMobileVecantUserLoading,
  } = useGetAllVecantUsersQuery();

  const [updateUserMobile] = useUpdateUserMobileMutation();
  const [deleteUserMobile] = useDeleteUserMobileMutation();

  const [isUpdate, setIsUpdate] = useState(false);
  const [removeMobile, setRemoveMobile] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [password, setPassword] = useState('');

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

  const handlePasswordChange = (event) => {
    const { value } = event.target;

    setPassword(value);
  };

  const handleDeleteMobileRequest = (id) => {
    document.body.style.overflow = 'hidden';
    setDeleteId(id);
    setRemoveMobile(true);
  };

  const handleSubmit = async (e) => {
    const userMobileUpdateData = {
      id: formData.mobileId,
      UserId: formData.userId,
      GivenFrom: convertToISO(formData.GivenFrom),
      GivenUntill: null,
    };

    console.log(formData);

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

  const handleDeleteUserMobile = async () => {
    if (password === 'admin1234') {
      const deleteUserRes = await deleteUserMobile(deleteId);

      if (deleteUserRes.error) {
        toast.error('User Mobile delete failed');
      } else {
        toast.success('User Mobile deleted successfully');
      }
      setRemoveMobile(false);
      document.body.style.overflow = 'auto';
      setDeleteId(null);
    } else {
      toast.error('Password is wrong');
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
        <div className="overflow-x-auto flex-grow justify-center justify-items-center z-10">
          <div className={`${removeMobile ? 'blur-sm': 'blur-none'} mt-4`}>
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
                        userMobileVecantUserData?.map((item) => (
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
            <div className={`mx-2 flex-grow justify-center justify-items-center ${removeMobile ? 'blur-sm': 'blur-none'}`}>
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
                      {Object.keys(userMobileVecantData[0])?.map(
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
                              handleUserMobileEdit(row.Id, row.MobileNumber)
                            }
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => {
                              handleDeleteMobileRequest(row.Id);
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

          {removeMobile && (
            <div className="w-12/12 fixed left-96 right-24 top-52 h-auto z-50 flex justify-center justify-items-center items-center">
              <div className="shadow-lg  h-[400px]  bg-white rounded-xl px-10">
                <div className="flex justify-end justify-items-end mt-6">
                  <button
                    onClick={() => {
                      setRemoveMobile(false);
                      document.body.style.overflow = 'auto';
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faX}
                      style={{ color: '#2e4057' }}
                      className="fa-x"
                    />
                  </button>
                </div>

                <div class="w-full px-3 mt-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Enter Password
                  </label>
                  <div class="relative">
                    <input
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="password"
                      value={password}
                      type="password"
                      required
                      onChange={handlePasswordChange}
                    />
                  </div>
                </div>
                <div className="mt-10 text-center px-10">
                  <p>Are you sure you want to Delete the User</p>
                </div>

                <div className="mt-16 mx-6 flex justify-between px-10">
                  <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleDeleteUserMobile}
                  >
                    Yes
                  </button>

                  <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded"
                    onClick={() => {
                      setRemoveMobile(false);
                      document.body.style.overflow = 'auto';
                    }}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserMobileVecantPage;
