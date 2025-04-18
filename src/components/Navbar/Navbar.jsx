import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react'; // استيراد السهم

export default function Navbar() {
  const [open, setOpen] = useState(false); 

  return (
    <>
      <nav className='bg-blue-800 flex w-full justify-between items-center p-3'>
        <div>
          <ul dir='ltr' className='flex font-bold text-white gap-5'>
            <li>
              <Link to='/'>Invoice</Link>
            </li>
            <li>
              <Link to='DelayedShipments'>Delayed Shipments</Link>
            </li>
            <li>
              <Link to='stocklist'>Stock List</Link>
            </li>
          </ul>
        </div>
        <button
          onClick={() => setOpen(!open)}
          className='p-2 bg-black text-white rounded-full shadow-md hover:bg-gray-800 transition'
          title='فتح القائمة'
        >
          <Menu size={24} />
        </button>
      </nav>
      {open && <>
        <div className='absolute top-0 right-14 w-64 h-screen bg-white shadow-lg p-4 transition-all duration-300 z-50'>
          <h2 className='text-xl font-bold mb-2'>محتوى القائمة</h2>
          <Link onClick={() => setOpen(false)} className='  font-bold  bg-green-600 py-2 px-2 rounded-lg my-2 text-white block hover:bg-green-500' to='DailyInvoices'>Daily Invoices</Link>
          <Link onClick={() => setOpen(false)} className='  font-bold  bg-green-600 py-2 px-2 rounded-lg my-2 text-white block hover:bg-green-500' to='OrderTrackingCenter'>OrderTrackingCenter</Link>
         
          <button
            onClick={() => setOpen(false)}
            className='mt-4 block text-red-500 hover:underline'
          >
            إغلاق
          </button>
        </div>
      </>}
    </>
  );
}
