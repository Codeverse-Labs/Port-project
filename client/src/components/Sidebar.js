import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-items-center min-w-[300px] bg-slate-100 min-h-[100vh] items-center align-middle">
      <button className={`btn p-8`} onClick ={() => navigate(`/master-bill`)}>
        <p className={`text-xl ${location.pathname === "/master-bill" ? 'border-b border-black' : ''}`}>Master Bill</p>
      </button>
      <button className="btn p-8" onClick ={() => navigate(`/d-summary`)}>
        <p className={`text-xl ${location.pathname === "/d-summary" ? 'border-b border-black' : ''}`}>Division Summary</p>
      </button>
      <button className="btn p-8">
        <p className={`text-xl ${location.pathname === "/deduction" ? 'border-b border-black' : ''}`}>Deduction</p>
      </button>
    </div>
  );
}

export default Sidebar;
