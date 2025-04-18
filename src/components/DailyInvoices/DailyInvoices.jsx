import React, { useEffect, useState } from 'react';

export default function DailyInvoices() {
  const [groupedInvoices, setGroupedInvoices] = useState({});

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('dataInvoice')) || [];

    const grouped = data.reduce((acc, invoice) => {
      const date = invoice.date;
      if (!acc[date]) acc[date] = [];
      acc[date].push(invoice);
      return acc;
    }, {});

    setGroupedInvoices(grouped);
  }, []);

  
  return <>
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">فواتير الأيام</h2>

      {Object.entries(groupedInvoices).slice().reverse().map(([date, invoices]) => {
        
        const totalCash = invoices.reduce((sum, invoice) => sum + parseFloat(invoice.cash), 0).toFixed(2);

        return (
          <div key={date} className="mb-6 bg-white shadow-md rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4 border-b pb-2 flex justify-between items-center">
              <span>📅 {new Date(date).toLocaleDateString('ar-EG')}</span>
              <span className="text-lg font-bold text-green-600">إجمالي الكاش: {totalCash} ج.م</span>
            </h3>

            {invoices.slice().reverse().map((invoice, idx) => (
              <div key={idx} className="mb-4 p-3 border rounded-lg bg-gray-50">
                <div className="flex justify-between items-center text-sm font-medium text-gray-800 mb-2">
                  <span>👤 {invoice.name}</span>
                  <span>📞 {invoice.phone}</span>
                  <span>💵 {invoice.cash} ج.م</span>
                </div>

                <ul className="text-sm text-gray-700 list-disc pr-5">
                  {invoice.items.map((item, i) => (
                    <li key={i}>
                      {item.name} × {item.quantity} = {item.total} ج.م
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        );
      })}
    </div>
    </>
}