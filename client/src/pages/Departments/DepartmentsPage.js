import { React, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import {
  useDeleteDepartmentMutation,
  useGetAllDepartmentsQuery,
  useNewDepartmentMutation,
  useUpdateDepartmentMutation,
} from '../../services/departmentService';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';

function DepartmentsPage() {
  const { data: departmentData, isLoading } = useGetAllDepartmentsQuery();

  const [newDepartment] = useNewDepartmentMutation();
  const [updateDepartment] = useUpdateDepartmentMutation();
  const [deleteDepartment] = useDeleteDepartmentMutation();

  const [isUpdate, setIsUpdate] = useState(false);

  const [formData, setFormData] = useState({
    id: null,
    name: '',
    shortName: '',
  });

  const handleDepartmentEdit = (id, name, shortName) => {
    setIsUpdate(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setFormData({
      id: id,
      name: name,
      shortName: shortName,
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
    const dptCreateData = {
      name: formData.name,
      shortName: formData.shortName,
    };
    const dptUpdateData = {
      id: formData.id,
      name: formData.name,
      shortName: formData.shortName,
    };

    if (isUpdate === true) {
      const departmentUpdateRes = await updateDepartment(dptUpdateData);

      setFormData({
        id: null,
        name: '',
        shortName: '',
      });

      setIsUpdate(false);

      if (departmentUpdateRes.data) {
        toast.success('Department updated successfully');
      }

      if (departmentUpdateRes.error) {
        toast.error('Department update failed');
      }
    } else {
      const departmentCreateRes = await newDepartment(dptCreateData);

      setFormData({
        id: null,
        name: '',
        shortName: '',
      });

      console.log(departmentCreateRes);

      if (!departmentCreateRes.error) {
        toast.success('Department created successfully');
      } else {
        toast.error('Department create failed');
      }
    }
  };

  const handleDeleteDepartment = async (id) => {
    const deleteDepartmentRes = await deleteDepartment(id);

    if (deleteDepartmentRes.error) {
      toast.error('Department delete failed');
    } else {
      toast.success('Department deleted successfully');
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
        <div className="flex-grow justify-center justify-items-center">
          <div className="">
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20">
              <div class="flex flex-wrap -mx-3 mb-2">
                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
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

                <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                  <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    Short Name
                  </label>
                  <div class="relative">
                    <input
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="shortName"
                      value={formData.shortName}
                      type="text"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>
              <button
                class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                type="button"
                onClick={handleSubmit}
              >
                {isUpdate ? 'Edit Department' : 'Add Department'}
              </button>
            </form>
          </div>

          {!isLoading && departmentData?.length !== 0 && (
            <div className="mx-2 flex-grow justify-center justify-items-center">
              <div className="text-xl text-center mt-6">All Departments</div>
              <table className="border-collapse mt-6 mx-auto">
                <thead>
                  <tr>
                    {Object.keys(departmentData[0])?.map((header, index) => (
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
                  {departmentData?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.keys(departmentData[0]).map(
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
                              handleDepartmentEdit(
                                row.Id,
                                row.Name,
                                row.ShortName
                              )
                            }
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => {
                              handleDeleteDepartment(row.Id);
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

export default DepartmentsPage;
