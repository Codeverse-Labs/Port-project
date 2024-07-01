import { React, useState, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import { MdEdit, MdDelete } from 'react-icons/md';
import { toast } from 'react-toastify';
import {
  useGetAllTelebillsQuery,
  useNewTelebillsMutation,
  useUpdateTelebillsMutation,
  useDeleteTelebillsMutation,
} from '../../../services/telebillService';
import { useGetAllDepartmentsQuery } from '../../../services/departmentService';
import { useGetAllTelecomQuery } from '../../../services/telecomService';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';

function TelecomBillPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const tableRef = useRef(null);
  const { data: telecomNumberData, isLoading: telecomNumberLoading } =
    useGetAllTelecomQuery();
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery();
  const { data: userMobileData, isLoading: userLoading } =
    useGetAllTelebillsQuery();

  const [newUserMobile] = useNewTelebillsMutation();
  const [updateUserMobile] = useUpdateTelebillsMutation();
  const [deleteTelecomBill] = useDeleteTelebillsMutation();

  const totalAmount = useMemo(() => {
    return userMobileData
      ?.reduce((total, item) => {
        return !isNaN(item.Total) ? total + item.Total : total;
      }, 0)
      .toFixed(2);
  }, [userMobileData]);

  const [isUpdate, setIsUpdate] = useState(false);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 10 }, (_, i) => selectedYear - i);

  const [formData, setFormData] = useState({
    id: '',
    mobile: '',
    rent: 950,
    other: null,
    voiceUsage: null,
    discount: null,
    callCharges: null,
    total: null,
    dpt: '',
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });

  const [searchFormData, setSearchFormData] = useState({
    searchMonth: '',
    searchYear: '',
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setSearchFormData({
      ...searchFormData,
      [name]: value,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    const selectedOptionData = telecomNumberData.find(
      (option) => option.MobileNumber.toString() === value
    );

    if (selectedOptionData) {
      setFormData({
        ...formData,
        dpt: selectedOptionData.Dpt,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    const userMobileCreateData = {
      mobile: formData.mobile,
      rent: parseFloat(formData.rent),
      other: parseFloat(formData.other),
      voiceUsage: parseFloat(formData.voiceUsage),
      discount: parseFloat(formData.discount),
      callCharges:
        parseFloat(formData.voiceUsage) - parseFloat(formData.discount),
      total:
        parseFloat(formData.rent) +
        parseFloat(formData.voiceUsage) -
        parseFloat(formData.discount),
      dpt: formData.dpt,
      month: formData.month,
      year: formData.year,
    };

    const userMobileUpdateData = {
      id: formData.id,
      mobile: formData.mobile,
      rent: parseFloat(formData.rent),
      other: parseFloat(formData.other),
      voiceUsage: parseFloat(formData.voiceUsage),
      discount: parseFloat(formData.discount),
      callCharges:
        parseFloat(formData.voiceUsage) - parseFloat(formData.discount),
      total:
        parseFloat(formData.rent) +
        parseFloat(formData.voiceUsage) -
        parseFloat(formData.discount),
      dpt: formData.dpt,
      month: formData.month,
      year: formData.year,
    };

    console.log(formData);

    if (isUpdate === true) {
      const UserMobileUpdateRes = await updateUserMobile(userMobileUpdateData);

      setFormData({
        mobile: '',
        rent: '',
        other: '',
        voiceUsage: '',
        discount: '',
        callCharges: '',
        total: '',
        dpt: '',
        month: '',
        year: '',
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

      if (UserMobileCreateRes.data) {
        toast.success('User Mobile created successfully');
        setFormData({
          mobile: '',
          rent: '',
          other: '',
          voiceUsage: '',
          discount: '',
          callCharges: '',
          total: '',
          dpt: '',
          month: '',
          year: '',
        });
      }

      if (UserMobileCreateRes.error) {
        toast.error('User Mobile create failed');
      }
    }
  };

  const handleDeleteTelecomBill = async (id) => {
    const deleteUserRes = await deleteTelecomBill(id);

    if (deleteUserRes.error) {
      toast.error('Telecom bill delete failed');
    } else {
      toast.success('Telecom bill deleted successfully');
    }
  };

  const handleFormSubmit = (e) => {
    console.log(searchFormData);
    e.preventDefault();
    const queryParams = new URLSearchParams(location.search);
    queryParams.set('month', searchFormData.searchMonth);
    queryParams.set('year', searchFormData.searchYear);
    navigate(`/telecom/master-bill-sheet?${queryParams.toString()}`);
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
          <form
            class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20"
            onSubmit={handleFormSubmit}
          >
            <div class="flex flex-wrap -mx-3 mb-2">
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Month
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    value={searchFormData.searchMonth}
                    onChange={handleFormChange}
                    name="searchMonth"
                  >
                    <option value="">Select Month</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
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
              <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <label
                  class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                  for="grid-state"
                >
                  Year
                </label>
                <div class="relative">
                  <select
                    class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="grid-state"
                    value={searchFormData.searchYear}
                    onChange={handleFormChange}
                    name="searchYear"
                  >
                    <option value="">Select Year</option>
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
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
              type="submit"
            >
              Get the Telecom Bill
            </button>
          </form>
          <div className=" mt-4">
            <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20 border border-gray-600">
              <div class="flex -mx-3 mb-2 justify-center justify-items-center">
                <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Telecom number
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="mobile"
                      value={formData.mobile}
                      type="text"
                      required
                      onChange={handleChange}
                      disabled={isUpdate ? true : false}
                    >
                      <option value="">Select Phone Number</option>
                      {!telecomNumberLoading &&
                        telecomNumberData?.map((item) => (
                          <option key={item.Id} value={item.MobileNumber}>
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

                <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Month
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      value={formData.month}
                      onChange={handleChange}
                      name="month"
                    >
                      <option value="">Select Month</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                      <option>7</option>
                      <option>8</option>
                      <option>9</option>
                      <option>10</option>
                      <option>11</option>
                      <option>12</option>
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
                <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Year
                  </label>
                  <div class="relative">
                    <select
                      class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      value={formData.year}
                      onChange={handleChange}
                      name="year"
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
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

                <div class="w-full md:w-1/4 px-3 mb-6 md:mb-0">
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
                      value={formData.dpt}
                      onChange={handleChange}
                      name="dpt"
                    >
                      <option value="">Select Department</option>
                      {!departmentLoading &&
                        departmentData?.map((departments) => (
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

              <div class="flex -mx-3 mb-2 justify-center justify-items-center mt-12">
                <div class={`w-3/12 px-3 mb-6 md:mb-0`}>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Rent
                  </label>
                  <div class="relative flex items-center gap-2">
                    <input
                      class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="rent"
                      value={formData.rent}
                      type="text"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div class={`w-3/12 px-3 mb-6 md:mb-0`}>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Other
                  </label>
                  <div class="relative flex items-center gap-2">
                    <input
                      class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="other"
                      value={formData.other}
                      type="text"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class={`w-3/12 px-3 mb-6 md:mb-0`}>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Voice Usage
                  </label>
                  <div class="relative flex items-center gap-2">
                    <input
                      class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="voiceUsage"
                      value={formData.voiceUsage}
                      type="text"
                      required
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class={`w-3/12 px-3 mb-6 md:mb-0`}>
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-state"
                  >
                    Discount
                  </label>
                  <div class="relative flex items-center gap-2">
                    <input
                      class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                      id="grid-state"
                      name="discount"
                      value={formData.discount}
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
                {isUpdate ? 'Edit Bill' : 'Add Bill'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default TelecomBillPage;
