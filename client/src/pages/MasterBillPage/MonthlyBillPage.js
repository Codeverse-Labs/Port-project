import React from 'react';
import { useGetMonthlyBillsQuery } from '../../services/billService';

function MonthlyBillPage({ month, year }) {
  const { data: monthlyData, isLoading } = useGetMonthlyBillsQuery({
    month,
    year
  });

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
  
 console.log(monthlyData)
  return (
    <>
      {!isLoading && monthlyData?.length !== 0 && (
        <div className="overflow-x-auto mx-2 flex-grow justify-center justify-items-center">
          <div className="text-xl text-center mt-6">Mobitel Master Bill</div>
          <div className="text-xl text-center">
            {getMonthName(month)} {''} {year}
          </div>
          <table className="table-auto border-collapse w-full mx-10 mt-6">
            <thead>
              <tr>
                {Object.keys(monthlyData[0])?.map((header, index) => (
                  <th key={index} className="border border-gray-500 px-4 py-2">
                    {header}
                  </th>
                ))}
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {!isLoading && monthlyData?.length === 0 && <div className="flex-grow justify-center justify-items-center">
        <div className="mt-10 font-bold text-2xl text-center">
          No records available
        </div>
      </div>
}
    </>
  );
}

export default MonthlyBillPage;
