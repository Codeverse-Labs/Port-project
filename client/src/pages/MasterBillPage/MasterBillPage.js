import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useGetDepartmentBillsQuery } from '../../services/billService';
import MonthlyBillPage from './MonthlyBillPage';

function MasterBillPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const department = searchParams.get('department');

  const { data: departmentData, isLoading } = useGetDepartmentBillsQuery({
    month,
    year,
    department,
  });

  if (department !== ('All' | '')) {
    console.log('hiiii');
  }

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
  return (
    <>
      <div className="h-[75px]">
        <Navbar />
      </div>
      <div className="flex justify-items-center">
        <div className="w-[300px]">
          <Sidebar />
        </div>
        <div className="flex-grow w-1/2">
          {department !== 'All' &&
            department !== '' &&
            !isLoading &&
            departmentData?.length !== 0 && (
              <div className="mx-2 justify-center justify-items-center">
                <div className="text-xl text-center mt-6">
                  Mobitel Master Bill
                </div>
                <div className="text-xl text-center">
                  {getMonthName(month)} {''} {year}
                </div>
                <table className="table-auto border-collapse w-full mx-10 mt-6">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          {!isLoading &&
            departmentData?.length === 0 &&
            department !== 'All' &&
            department !== '' && (
              <div className=" justify-center justify-items-center">
                <div className="mt-10 font-bold text-2xl text-center">
                  No records available
                </div>
              </div>
            )}
          {(department === 'All' || department === '') && (
            <MonthlyBillPage month={month} year={year} />
          )}
          </div>
        </div>
    </>
  );
}

export default MasterBillPage;
