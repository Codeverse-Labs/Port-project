import { React, useState } from 'react';
import Sidebar from '../../components/Sidebar';
import Navbar from '../../components/Navbar';
import { departments } from '../MasterBillPage/utils/departments';

function DashboardPage() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = Array.from({ length: 10 }, (_, i) => selectedYear - i);
  return (
    <>
      <Navbar />
      <div className=" flex flex-row">
        <Sidebar />
      </div>
    </>
  );
}

export default DashboardPage;
