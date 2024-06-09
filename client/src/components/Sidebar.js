import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <>
 { location.pathname.includes('/mobitel/') && (

    <div className="flex flex-col justify-items-center min-w-[300px] bg-slate-100 min-h-[100vh] items-center align-middle fixed">
      <button className={`btn p-8`} onClick={() => navigate(`/mobitel/master-bill`)}>
        <p
          className={`text-xl ${
            location.pathname.includes('/mobitel/master-bill') ? 'border-b border-black' : ''
          }`}
        >
          Master Bill
        </p>
      </button>
      <button className="btn p-8" onClick={() => navigate(`/mobitel/d-summary`)}>
        <p
          className={`text-xl ${
            location.pathname.includes('/mobitel/d-summary') ? 'border-b border-black' : ''
          }`}
        >
          Division Summary
        </p>
      </button>
      <button className="btn p-8">
        <p
          className={`text-xl ${
            location.pathname === '/mobitel/deduction' ? 'border-b border-black' : ''
          }`}
        >
          Deduction
        </p>
      </button>

      <button className="btn p-8" onClick={() => navigate(`/mobitel/divisions`)}>
        <p
          className={`text-xl ${
            location.pathname === '/mobitel/divisions' ? 'border-b border-black' : ''
          }`}
        >
          Divisions
        </p>
      </button>
      <button className="btn p-8" onClick={() => navigate(`/mobitel/users`)}>
        <p
          className={`text-xl ${
            location.pathname === '/mobitel/users' ? 'border-b border-black' : ''
          }`}
        >
          Users
        </p>
      </button>
      <button className="btn p-8" onClick={() => navigate(`/mobitel/usermobile`)}>
        <p
          className={`text-xl ${
            location.pathname === '/mobitel/usermobile' ? 'border-b border-black' : ''
          }`}
        >
          Mobile Management
        </p>
      </button>
      <button className="btn p-8" onClick={() => navigate(`/mobitel/usermobile/vecant`)}>
        <p
          className={`text-xl ${
            location.pathname.includes('/mobitel/usermobile/vecant') ? 'border-b border-black' : ''
          }`}
        >
          Assign Vecant Numbers
        </p>
      </button>
    </div>)}

    {
      location.pathname.includes('/telecom/') && (
        <div className="flex flex-col justify-items-center min-w-[300px] bg-slate-100 min-h-[100vh] items-center align-middle fixed">
        <button className={`btn p-8`} onClick={() => navigate(`/telecom/bills`)}>
          <p
            className={`text-xl ${
              location.pathname.includes('/telecom/bills') ? 'border-b border-black' : ''
            }`}
          >
            Master Bill
          </p>
        </button>
        <button className="btn p-8" onClick={() => navigate(`/telecom/d-summary`)}>
          <p
            className={`text-xl ${
              location.pathname === '/telecom/d-summary' ? 'border-b border-black' : ''
            }`}
          >
            Division Summary
          </p>
        </button>

  
        <button className="btn p-8" onClick={() => navigate(`/telecom/numbers`)}>
          <p
            className={`text-xl ${
              location.pathname.includes('/telecom/numbers') ? 'border-b border-black' : ''
            }`}
          >
            Telecom Numbers
          </p>
        </button>
      </div>
      )
    }


    </>
  );
}

export default Sidebar;
