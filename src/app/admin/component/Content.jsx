import React from 'react';
import { FaUsers, FaRegNewspaper } from 'react-icons/fa6';
import SideNav from './SideNav'; // นำเข้า SideNav component

function Dashboard() {
  return (
    <div className='flex'>
      <div className='w-[250px]'>
        <SideNav />
      </div>
      <div className='flex-grow px-10 py-5'>
        <div className='flex'>
          <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
            <h3 className='flex items-center'>
              <FaUsers className='mr-2' /> Total Users
            </h3>
            <p className='text-5xl mt-10'>29</p>
          </div>

          <div className='shadow-lg w-[300px] m-3 p-10 rounded-lg'>
            <h3 className='flex items-center'>
              <FaRegNewspaper className='mr-2' /> Total Posts
            </h3>
            <p className='text-5xl mt-10'>15</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
