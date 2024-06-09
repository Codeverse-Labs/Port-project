


import { React, useState } from 'react';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import { MdEdit , MdDelete} from 'react-icons/md';
import { toast } from 'react-toastify';
import { useGetAllTelecomQuery, useNewTelecomMutation, useUpdateTelecomMutation, useDeleteTelecomMutation } from '../../../services/telecomService';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function TeleNumberPage() {
  const { data: userMobileData, isLoading: userLoading } =
    useGetAllTelecomQuery();

  const [newUserMobile] = useNewTelecomMutation();
  const [updateUserMobile] = useUpdateTelecomMutation();
  const [deleteUserMobile] = useDeleteTelecomMutation();

  const [isUpdate, setIsUpdate] = useState(false);

  const [removeMobile, setRemoveMobile] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [password, setPassword] = useState('');

  const [formData, setFormData] = useState({
    id: '',
    number: '',
  });


  const handleUserMobileEdit = (id, MobileNumber) => {
    setIsUpdate(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setFormData({
      id: id,
      number: MobileNumber,

    });
  };

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

  const handleDeleteUserMobile = async () => {
    if (password === 'admin1234') {
      const deleteUserRes = await deleteUserMobile(deleteId);

      if (deleteUserRes.error) {
        toast.error('Telecom number delete failed');
      } else {
        toast.success('Telecom number deleted successfully');
      }
      setRemoveMobile(false);
      document.body.style.overflow = 'auto';
      setDeleteId(null);
    } else {
      toast.error('Password is wrong');
    }
  };

  const handleSubmit = async (e) => {
    const userMobileCreateData = {
      mobileNumber: formData.number,
    };

    const userMobileUpdateData = {
      id: formData.id,
      mobileNumber: formData.number
    };

    console.log(formData)

    if (isUpdate === true) {
      const UserMobileUpdateRes = await updateUserMobile(userMobileUpdateData);

      setFormData({
        id: '',
        number: '',
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

  return (
    <>
      <div className="h-[75px]">
        <Navbar />
      </div>
      <div className=" flex justify-items-center">
        <div className="w-[300px]">
          <Sidebar />
        </div>
        <div className="overflow-x-auto ms-16 flex-grow justify-center justify-items-center z-10">

          <div className={`${removeMobile ? 'blur-sm': 'blur-none'} mt-4`}>
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
                      Telecom Number
                    </label>
                    <div class="relative flex items-center gap-2">
                      (+0)
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
            <div className={`${removeMobile ? 'blur-sm': 'blur-none'} mx-2 flex-grow justify-center justify-items-center`}>
              <div className="text-xl text-center mt-6">Telecom Numbers</div>
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
                      {Object.keys(userMobileData[0])?.map(
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
                              )
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
                  <p>Are you sure you want to Delete the Telecom number</p>
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

export default TeleNumberPage;

