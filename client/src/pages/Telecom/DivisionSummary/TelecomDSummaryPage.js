import {React, useEffect, useState, useMemo, useRef } from 'react';
import Navbar from '../../../components/Navbar';
import Sidebar from '../../../components/Sidebar';
import { useLocation } from 'react-router-dom';
import { useGetMonthlyTelebillsQuery } from '../../../services/telebillService';

const TelecomDSummaryPage = () => {

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const month = searchParams.get('month');
  const year = searchParams.get('year');
  const tableRef = useRef(null);

  const [data, setData] = useState([]);

  const { data: monthlyData, isLoading } = useGetMonthlyTelebillsQuery({
    month,
    year
  });

  useEffect (() => {

    if(!isLoading){
      const departmentTotals = monthlyData?.reduce((acc, item) => {
        if (!acc[item.Dpt]) {
          acc[item.Dpt] = 0;
        }
        acc[item.Dpt] += item.Total;
        return acc;
      }, {});
    
      const transformedData = Object.keys(departmentTotals)?.map((department, index) => ({
        Department: department,
        Amount: departmentTotals[department],
      }));

      setData(transformedData)
      
    }



  }, [isLoading, monthlyData, data] );


  const totalAmount = useMemo(() => {
    return data?.reduce((total, item) => {
      return !isNaN(item.Amount) ? total + item.Amount : total;
    }, 0).toFixed(2);
  }, [data]);



  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }





  // Extract the headers from the first item in the data array
  const headers = Object.keys(data[0]);

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

  const calculationData = [
    { charge: 'Grand Total', amount: totalAmount },
    { charge: 'VAT- 15%', amount: ((parseFloat(totalAmount))*0.15).toFixed(2) },
    { charge: 'Sub Total', amount: ((parseFloat(totalAmount))*1.15).toFixed(2) },
    { charge: '(Discount)', amount: 0.00 },
    { charge: 'Total   Payable', amount: ((parseFloat(totalAmount))*1.15).toFixed(2) },
  ];

  const handlePrint = () => {
    const printContent = tableRef.current.innerHTML;
    const printWindow = window.open('', '', 'height=500, width=800');
    printWindow.document.write('<html><head><title>Print Table</title>');
    // Add styles to the print window
    printWindow.document.write('<style>');
    printWindow.document.write('table { width: 100%; border-collapse: collapse; }');
    printWindow.document.write('th, td { border: 1px solid black; padding: 8px; text-align: left; }');
    printWindow.document.write('th { background-color: #f2f2f2; }');
    printWindow.document.write('</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<table>' + printContent + '</table>');
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.print();
  };

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
        {!isLoading &&
          <div className="mx-2 overflow-x-auto justify-center justify-items-center">
            <div className="text-xl text-center mt-6">Mobitel Master Bill</div>
            <div className="text-xl text-center mt-2">Division Summary</div>
            <div className="text-xl text-center mt-2">{getMonthName(month)} {''} {year}</div>

            <div className=" mt-4">
            <div class="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4  mt-10 mx-20 border border-gray-600" >
            <div className="mx-4 text-center font-bold flex justify-end justify-items-end">
            <button
              class="mt-2 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="button"
            onClick={handlePrint}>
              Print Payable Bill
            </button>
              </div>
              <div className="" >
              <div className="mx-10 text-center font-bold">
                <span className="text-blue-500"> Total Payable &nbsp; - </span>
                &nbsp;
                <span className="text-black"> Rs.{((parseFloat(totalAmount))*1.15).toFixed(2)}</span>
              </div>
              <div className="flex justify-center justify-items-center" ref={tableRef}>
              <table className="border-collapse mt-6 mx-auto">
                <thead>
                  <tr>
                  </tr>
                </thead>
                <tbody>
                  {calculationData?.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                      {Object.keys(calculationData[0])?.map(
                        (header, colIndex) => (
                          <td
                            key={colIndex}
                            className={`border border-gray-500 px-4 py-2 ${rowIndex === calculationData.length-1 ? 'font-bold' : ''}`}
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
              </div>
            </div>
          </div>
            <table className="border-collapse mt-6 mx-auto w-3/4 mb-8">
              <thead>
              <tr>
                {Object.keys(data[0])?.map((header, index) => (
                  <th key={index} className="border border-gray-500 px-4 py-2">
                    {header}
                  </th>
                ))}
              </tr>
              </thead>
              <tbody>
                {data?.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    {headers.map((header, colIndex) => (
                      <td
                        key={colIndex}
                        className="border border-gray-500 px-4 py-2"
                      >
                        {colIndex === 1 ?  row.Amount.toFixed(2) : row[header]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
}
        </div>
      </div>
    </>
  );
};

export default TelecomDSummaryPage;
