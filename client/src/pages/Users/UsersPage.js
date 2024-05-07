import { React, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
  useGetAllUsersQuery,
  useNewUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../services/userService';
import { useGetAllDepartmentsQuery } from '../../services/departmentService';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

function UsersPage() {
  const { data: userData, isLoading: userLoading } = useGetAllUsersQuery();
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery();

  const [newUser] = useNewUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    id: '',
    name: '',
    position: '',
    department: '',
  });

  const handleUserEdit = (id, name, position, department) => {
    setIsUpdate(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setFormData({
      id: id,
      name: name,
      position: position,
      department: department,
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
    const userCreateData = {
      name: formData.name,
      position: formData.position,
      department: formData.department,
    };

    const userUpdateData = {
      id: formData.id,
      name: formData.name,
      position: formData.position,
      department: formData.department,
    };

    if (isUpdate === true) {
      const UserUpdateRes = await updateUser(userUpdateData);

      setFormData({
        id: '',
        name: '',
        position: '',
        department: '',
      });
      setIsUpdate(false);

      if (UserUpdateRes.data) {
        toast.success('User updated successfully');
      }

      if (UserUpdateRes.error) {
        toast.error('User update failed');
      }
    } else {
      const UserCreateRes = await newUser(userCreateData);
      setFormData({
        id: '',
        name: '',
        position: '',
        department: '',
      });

      if (UserCreateRes.data) {
        toast.success('User created successfully');
      }

      if (UserCreateRes.error) {
        toast.error('User create failed');
      }
    }
  };

  const handleDeleteUser = async (id) => {
    const deleteUserRes = await deleteUser(id);

    if (deleteUserRes.error) {
      toast.error('Department delete failed');
    } else {
      toast.success('Department deleted successfully');
    }
  };
  return (
    <>
      <Navbar />
      <div className=" flex flex-row justify-items-center">
        <Sidebar />
        <div className="flex-grow justify-center justify-items-center">
          <div className="">
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20">
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Name
                  </label>
                  <div class="relative">
                    <input
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="name"
                      value={formData.name}
                      type="text"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Position
                  </label>
                  <div class="relative">
                    <input
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="position"
                      value={formData.position}
                      type="text"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Department
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
                          <option key={departments.Id} value={departments.Name}>
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
              </div>
              <button
                class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="button"
                onClick={handleSubmit}
              >
                {isUpdate ? 'Edit User' : 'Add User'}
              </button>
            </form>
          </div>

          {!userLoading && userData?.length !== 0 && (
            <div className="mx-2 flex-grow justify-center justify-items-center">
              <div className="text-xl text-center mt-6">All Users</div>
              <table className="border-collapse mt-6 mx-auto">
                <thead>
                  <tr>
                    {Object.keys(userData[0])?.map((header, index) => (
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
                  {userData?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.keys(userData[0]).map((header, colIndex) => (
                        <td
                          key={colIndex}
                          className="border border-gray-500 px-4 py-2"
                        >
                          {row[header]}
                        </td>
                      ))}
                      <td className="border border-gray-500 px-4 py-2">
                        <div className="flex justify-between gap-2">
                          <button
                            className="text-gray-600"
                            onClick={() =>
                              handleUserEdit(
                                row.Id,
                                row.Name,
                                row.Position,
                                row.Dpt
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

export default UsersPage;
