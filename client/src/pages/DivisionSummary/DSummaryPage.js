import React from 'react';
import { data } from '../MasterBillPage/utils/data';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';

const DSummaryPage = () => {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  // Extract the headers from the first item in the data array
  const headers = Object.keys(data[0]);

  return (
    <>
    <Navbar />
    <div className=" flex flex-row">
        <Sidebar />
    <div className="overflow-x-auto mx-2 flex-grow justify-center justify-items-center">

        <div className="text-xl text-center mt-6">Division Summary</div>
        <div className="text-xl text-center">January 2022</div>
      <table className="table-auto border-collapse w-full mx-10 mt-6">
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index} className="border border-gray-500 px-4 py-2">{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="border border-gray-500 px-4 py-2">{row[header]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
    </>
  );
};

export default DSummaryPage;