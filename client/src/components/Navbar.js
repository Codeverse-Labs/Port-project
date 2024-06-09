import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/images/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <div className="top-0 fixed w-full bg-white z-50 h-[75px]">
      <div className="flex justify-between border-b border-gray-600 items-center py-3 align-items-center">
        <div className=" mx-5">
          <button onClick={() => navigate(`/dashboard`)}>
            <img src={logo} width="200rem" alt="logo" className="" />
          </button>
        </div>

        <div className="mx-5">
          <div className="grid grid-cols-2 gap-5">
            <button className="btn" onClick={() => navigate(`/telecom/numbers`)}>
              <p
                className={`text-xl text-gray-700 hover:text-gray-500 ${
                  location.pathname.includes('telecom/')
                    ? 'border-b border-black'
                    : ''
                }`}
              >
                Telecom Bill
              </p>
            </button>
            <button className="btn " onClick={() => navigate(`/mobitel/master-bill`)}>
              <p
                className={`text-xl text-gray-700 hover:text-gray-500 ${
                  location.pathname.includes('mobitel/')
                    ? 'border-b border-black'
                    : ''
                }`}
              >
                Mobitel Bill
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
