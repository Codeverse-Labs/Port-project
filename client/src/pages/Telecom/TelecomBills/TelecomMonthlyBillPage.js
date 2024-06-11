import { React, useRef, useMemo, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  useGetMonthlyTelebillsQuery,
  useGetTelebillPayableQuery,
  useNewTelebillPayableMutation,
  useUpdateTelebillPayableMutation,
} from '../../../services/telebillService';
import { useGetAllDepartmentsQuery } from '../../../services/departmentService';
import { useGetAllTelecomQuery } from '../../../services/telecomService';
import { toast } from 'react-toastify';
import { MdEdit, MdDelete } from 'react-icons/md';
import {
  useUpdateTelebillsMutation,
  useDeleteTelebillsMutation,
} from '../../../services/telebillService';
import Sidebar from '../../../components/Sidebar';
import Navbar from '../../../components/Navbar';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function TelecomMonthlyBillPage() {
  const tableRef = useRef(null);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const month = searchParams.get('month');
  const year = searchParams.get('year');

  const [updateUserMobile] = useUpdateTelebillsMutation();
  const [deleteTeleBill] = useDeleteTelebillsMutation();

  const [updatePayable] = useUpdateTelebillPayableMutation();
  const [createPayable] = useNewTelebillPayableMutation();

  const [removeMobile, setRemoveMobile] = useState(false);
  const [editPayable, setEditPayable] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [password, setPassword] = useState('');
  const [data, setData] = useState([]);

  const [isUpdate, setIsUpdate] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    mobile: '',
    rent: null,
    other: null,
    voiceUsage: null,
    discount: null,
    callCharges: null,
    total: null,
    dpt: '',
    month: null,
    year: null,
  });

  const [payableFormData, setPayableFormData] = useState({
    payableId: '',
    discount: '',
    teleLev: '',
    cess: '',
    sscl: '',
    iddLevy: '',
  });

  const { data: monthlyData, isLoading } = useGetMonthlyTelebillsQuery({
    month,
    year,
  });

  const { data: payableData, isLoading: payableLoading } =
    useGetTelebillPayableQuery({
      month,
      year,
    });
  const { data: telecomNumberData, isLoading: telecomNumberLoading } =
    useGetAllTelecomQuery();
  const { data: departmentData, isLoading: departmentLoading } =
    useGetAllDepartmentsQuery();

  const totalAmount = useMemo(() => {
    return monthlyData
      ?.reduce((total, item) => {
        return !isNaN(item.Total) ? total + item.Total : total;
      }, 0)
      .toFixed(2);
  }, [monthlyData]);

  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 10 }, (_, i) => selectedYear - i);

  useEffect(() => {
    if (!payableLoading) {
      setData([
        { charge: 'Rental & Call Charges', amount: totalAmount },
        { charge: '(MIDC Discount)', amount: payableData[0].discount },
        { charge: 'Sub Total', amount: totalAmount },
        { charge: 'Tele Leve', amount: payableData[0].teleLev },
        { charge: 'CESS', amount: payableData[0].cess },
        { charge: 'SSCL', amount: payableData[0].sscl },
        { charge: 'IDD Levy', amount: payableData[0].iddLevy },
        {
          charge: 'VAT- 15%',
          amount: payableData[0].vat.toFixed(2),
        },
        {
          charge: 'Total   Payable',
          amount: payableData[0].Total.toFixed(2),
        },
      ]);
    }
  }, [payableData, totalAmount, payableLoading]);

  function getMonthName(monthNumber) {
    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const monthIndex = monthNumber - 1;
    if (monthIndex >= 0 && monthIndex < months.length) {
      return months[monthIndex];
    } else {
      return 'Invalid Month';
    }
  }

  const handleUserMobileEdit = (
    id,
    Mobile,
    Rent,
    Other,
    VoiceUsage,
    CallCharges,
    Dpt,
    Month,
    Year
  ) => {
    setIsUpdate(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });

    setFormData({
      id: id,
      mobile: Mobile,
      rent: Rent,
      other: Other,
      voiceUsage: VoiceUsage,
      callCharges: CallCharges,
      dpt: Dpt,
      month: Month,
      year: Year,
      discount: VoiceUsage - CallCharges,
    });
  };

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=500, width=800');
    printWindow.document.write('<html><head><title>Print Table</title>');
    // Add styles to the print window
    printWindow.document.write('<style>');
    printWindow.document.write(
      'table { width: 100%; border-collapse: collapse; }'
    );
    printWindow.document.write(
      'th, td { border: 1px solid black; padding: 8px; text-align: left; }'
    );
    printWindow.document.write('th { background-color: #f2f2f2; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<table>' + printContent + '</table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePayableChange = (event) => {
    const { name, value } = event.target;

    setPayableFormData({
      ...payableFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
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
  };

  const handlePayableSubmit = async (e) => {
    const userMobileUpdateData = {
      id: payableFormData.payableId,
      year: year,
      month: month,
      discount: parseFloat(payableFormData.discount),
      teleLev: parseFloat(payableFormData.teleLev),
      cess: parseFloat(payableFormData.cess),
      sscl: parseFloat(payableFormData.sscl),
      iddLevy: parseFloat(payableFormData.iddLevy),
      vat:
        (parseFloat(totalAmount) -
          parseFloat(payableFormData.discount) +
          parseFloat(payableFormData.teleLev) +
          parseFloat(payableFormData.cess) +
          parseFloat(payableFormData.sscl) +
          parseFloat(payableFormData.iddLevy)) *
        0.15,
      total:
        (parseFloat(totalAmount) -
          parseFloat(payableFormData.discount) +
          parseFloat(payableFormData.teleLev) +
          parseFloat(payableFormData.cess) +
          parseFloat(payableFormData.sscl) +
          parseFloat(payableFormData.iddLevy)) *
        1.15,
    };

    const userMobileCreateData = {
      year: year,
      month: month,
      discount: parseFloat(payableFormData.discount),
      teleLev: parseFloat(payableFormData.teleLev),
      cess: parseFloat(payableFormData.cess),
      sscl: parseFloat(payableFormData.sscl),
      iddLevy: parseFloat(payableFormData.iddLevy),
      vat:
        (parseFloat(totalAmount) -
          parseFloat(payableFormData.discount) +
          parseFloat(payableFormData.teleLev) +
          parseFloat(payableFormData.cess) +
          parseFloat(payableFormData.sscl) +
          parseFloat(payableFormData.iddLevy)) *
        0.15,
      total:
        (parseFloat(totalAmount) -
          parseFloat(payableFormData.discount) +
          parseFloat(payableFormData.teleLev) +
          parseFloat(payableFormData.cess) +
          parseFloat(payableFormData.sscl) +
          parseFloat(payableFormData.iddLevy)) *
        1.15,
    };

    if (payableData?.length === 0) {
      const UserMobileCreateRes = await createPayable(userMobileCreateData);

      setFormData({
        payableId: '',
        billYear: '',
        billMonth: '',
        discount: '',
        teleLev: '',
        cess: '',
        sscl: '',
        iddLevy: '',
        vat: '',
        total: '',
      });
      setEditPayable(false);
      document.body.style.overflow = 'auto';

      if (UserMobileCreateRes.data) {
        toast.success('Bill Payable created successfully');
      }

      if (UserMobileCreateRes.error) {
        toast.error('Bill Payable create failed');
      }
    } else {
      const UserMobileUpdateRes = await updatePayable(userMobileUpdateData);

      setFormData({
        payableId: '',
        billYear: '',
        billMonth: '',
        discount: '',
        teleLev: '',
        cess: '',
        sscl: '',
        iddLevy: '',
        vat: '',
        total: '',
      });
      setEditPayable(false);
      document.body.style.overflow = 'auto';

      if (UserMobileUpdateRes.data) {
        toast.success('Bill Payable updated successfully');
      }

      if (UserMobileUpdateRes.error) {
        toast.error('Bill Payable update failed');
      }
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;

    setPassword(value);
  };

  const handleDeleteTeleBillRequest = (id) => {
    document.body.style.overflow = 'hidden';
    setDeleteId(id);
    setRemoveMobile(true);
  };

  const handlePayableRequest = (id) => {
    document.body.style.overflow = 'hidden';
    setEditPayable(true);

    if (payableData?.length !== 0) {
        setPayableFormData({
        payableId: payableData[0].Id,
        discount: payableData[0].discount,
        teleLev: payableData[0].teleLev,
        cess: payableData[0].cess,
        sscl: payableData[0].sscl,
        iddLevy: payableData[0].iddLevy,
        vat: payableData[0].vat,
        total: payableData[0].total,
      });

    }

    console.log(formData)
  };

  const handleDeleteTeleBill = async () => {
    if (password === 'admin1234') {
      const deleteUserRes = await deleteTeleBill(deleteId);

      if (deleteUserRes.error) {
        toast.error('Telecom bill delete failed');
      } else {
        toast.success('Telecom bill deleted successfully');
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
        <div className="overflow-x-auto ms-4 flex-grow justify-center justify-items-center z-10">
          {isUpdate && (
            <div className={`mt-4 ${removeMobile  ? 'blur-sm' : 'blur-none'}`}>
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
          )}

          {!payableLoading && (
            <div className={`mt-4 ${removeMobile || editPayable ? 'blur-sm' : 'blur-none'}`}>
              <div class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20 border border-gray-600">
                <div className="mx-4 text-center font-bold flex justify-end justify-items-end">
                  <button
                    class="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    type="button"
                    onClick={handlePrint}
                  >
                    Print Payable Bill
                  </button>
                </div>
                <div className="">
                  <div className="mx-10 text-center font-bold">
                    <span className="text-blue-500">
                      {' '}
                      Total Payable &nbsp; -{' '}
                    </span>
                    &nbsp;
                    <span className="text-black">
                      {' '}
                      Rs.
                      {payableData[0].Total.toFixed(2)}
                    </span>
                  </div>
                  <div
                    className="flex justify-center justify-items-center"
                    ref={tableRef}
                  >
                    <table className="border-collapse mt-6 mx-auto">
                      <thead>
                        <tr></tr>
                      </thead>
                      <tbody>
                        {data?.map((row, rowIndex) => (
                          <tr key={rowIndex}>
                            {Object.keys(data[0])?.map((header, colIndex) => (
                              <td
                                key={colIndex}
                                className={`border border-gray-500 px-4 py-2 ${
                                  rowIndex === data.length - 1
                                    ? 'font-bold'
                                    : ''
                                }`}
                              >
                                {row[header]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="mt-6 flex justify-center justify-items-center">
                  <button
                    class="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    type="button"
                    onClick={handlePayableRequest}
                  >
                    {payableData.length !== 0 ? 'Edit Payable' : 'Add Payable'}
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isLoading && monthlyData?.length !== 0 && (
            <div
              className={` ${
                removeMobile || editPayable ? 'blur-sm' : 'blur-none'
              } mx-2 flex-grow justify-center justify-items-center mb-10`}
            >
              <div className="text-xl text-center mt-6">
                Mobitel Master Bill
              </div>
              <div className="text-xl text-center">
                {getMonthName(month)} {''} {year}
              </div>
              <table className="border-collapse mt-6 mx-auto">
                <thead>
                  <tr>
                    {Object.keys(monthlyData[0])?.map((header, index) => (
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
                  {monthlyData?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.keys(monthlyData[0])?.map((header, colIndex) => (
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
                              handleUserMobileEdit(
                                row.Id,
                                row.Mobile,
                                row.Rent,
                                row.Other,
                                row.VoiceUsage,
                                row.CallCharges,
                                row.Dpt,
                                row.Month,
                                row.Year
                              )
                            }
                          >
                            <MdEdit size={20} />
                          </button>
                          <button
                            className="text-red-500"
                            onClick={() => {
                              handleDeleteTeleBillRequest(row.Id);
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
          {!isLoading && monthlyData?.length === 0 && (
            <div
              className={`flex-grow justify-center justify-items-center ${
                removeMobile || editPayable ? 'blur-sm' : 'blur-none'
              }`}
            >
              <div className="mt-10 font-bold text-2xl text-center">
                No records available
              </div>
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
                  <p>Are you sure you want to Delete the Record</p>
                </div>

                <div className="mt-16 mx-6 flex justify-between px-10">
                  <button
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-8 border border-blue-500 hover:border-transparent rounded"
                    onClick={handleDeleteTeleBill}
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

          {editPayable && (
            <div className="w-12/12 fixed left-96 right-24 top-36 h-auto z-50 flex justify-center justify-items-center items-center">
              <div className="shadow-lg  h-[520px]  bg-white rounded-xl px-10">
                <div className="flex justify-end justify-items-end mt-6">
                  <button
                    onClick={() => {
                      setEditPayable(false);
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

                <form class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20 border border-gray-600">
                  <div class="flex -mx-3 mb-2 justify-center justify-items-center mt-12">
                    <div class={`w-4/12 px-3 mb-6 md:mb-0`}>
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-state"
                      >
                        MIDC Discount
                      </label>
                      <div class="relative flex items-center gap-2">
                        <input
                          class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state"
                          name="discount"
                          value={payableFormData.discount}
                          type="text"
                          required
                          onChange={handlePayableChange}
                        />
                      </div>
                    </div>

                    <div class={`w-4/12 px-3 mb-6 md:mb-0`}>
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-state"
                      >
                        Tele Lev
                      </label>
                      <div class="relative flex items-center gap-2">
                        <input
                          class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state"
                          name="teleLev"
                          value={payableFormData.teleLev}
                          type="text"
                          required
                          onChange={handlePayableChange}
                        />
                      </div>
                    </div>
                    <div class={`w-4/12 px-3 mb-6 md:mb-0`}>
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-state"
                      >
                        CESS
                      </label>
                      <div class="relative flex items-center gap-2">
                        <input
                          class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state"
                          name="cess"
                          value={payableFormData.cess}
                          type="text"
                          required
                          onChange={handlePayableChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div class="flex -mx-3 mb-2 justify-center justify-items-center mt-12">
                    <div class={`w-6/12 px-3 mb-6 md:mb-0`}>
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-state"
                      >
                        SSCL
                      </label>
                      <div class="relative flex items-center gap-2">
                        <input
                          class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state"
                          name="sscl"
                          value={payableFormData.sscl}
                          type="text"
                          required
                          onChange={handlePayableChange}
                        />
                      </div>
                    </div>
                    <div class={`w-6/12 px-3 mb-6 md:mb-0`}>
                      <label
                        class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                        for="grid-state"
                      >
                        IDD Levy
                      </label>
                      <div class="relative flex items-center gap-2">
                        <input
                          class=" w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                          id="grid-state"
                          name="iddLevy"
                          value={payableFormData.iddLevy}
                          type="text"
                          required
                          onChange={handlePayableChange}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    class="mt-10 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    type="button"
                    onClick={handlePayableSubmit}
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TelecomMonthlyBillPage;
