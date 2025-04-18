import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Invoice from './components/Invoice/Invoice';
import DelayedShipments from './components/DelayedShipments/DelayedShipments';
import StockList from './components/StockList/StockList';
import { Toaster } from 'react-hot-toast';
import DailyInvoices from './components/DailyInvoices/DailyInvoices';
import OrderTrackingCenter from './components/OrderTrackingCenter/OrderTrackingCenter';

export default function App() {
  const routes = createBrowserRouter([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Invoice /> },
        { path: 'DelayedShipments', element: <DelayedShipments /> },
        { path: 'stocklist', element: <StockList /> },
        { path: 'DailyInvoices', element: <DailyInvoices /> },
        { path: 'OrderTrackingCenter', element: <OrderTrackingCenter /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster position="bottom-center" reverseOrder={false} />
      <RouterProvider router={routes} />
    </>
  );
}
