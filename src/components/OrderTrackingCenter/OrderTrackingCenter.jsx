import React, { useEffect, useState } from 'react'

export default function OrderTrackingCenter() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Shipments")) || [];
    setOrders(data);
    console.log(data);
    
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "تسليم ناجح":
        return "bg-yellow-300 text-white";
      case "تسليم جزائى":
      case "تسليم جزائي":
        return "bg-orange-500 text-white";
      case "مرتجع":
        return "bg-red-500 text-white";
      default:
        return "bg-green-500 text-white"; 
    }
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedOrders = [...orders];
    updatedOrders[index]["حالة الشحنة"] = newStatus;
    setOrders(updatedOrders);
    localStorage.setItem("Shipments", JSON.stringify(updatedOrders));
    console.log( updatedOrders[index]);    
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">متابعة الطلبات</h2>
      <div className="overflow-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">#</th>
              <th className="border p-2">رقم البوليصة</th>
              <th className="border p-2">المرسل اليه</th>
              <th className="border p-2">موبايل 1</th>
              <th className="border p-2">موبايل 2</th>
              <th className="border p-2">مبلغ التحصيل</th>
              <th className="border p-2">العنوان</th>
              <th className="border p-2">اسم المنتج</th>
              <th className="border p-2">العدد</th>
              <th className="border p-2">وصف المنتج</th>
              <th className="border p-2">تاريخ</th>
              <th className="border p-2">حالة الشحنة</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((row, index) => (
              <tr key={index} className="text-right">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{row["رقم البوليصة"]}</td>
                <td className="border p-2">{row["المرسل اليه"]}</td>
                <td className="border p-2">{row["موبايل 1"]}</td>
                <td className="border p-2">{row["موبايل 2"]}</td>
                <td className="border p-2">{row["مبلغ التحصيل"]}</td>
                <td className="border p-2">{row["العنوان"]}</td>
                <td className="border p-2">{row["اسم المنتج"]}</td>
                <td className="border p-2">{row["العدد"]}</td>
                <td className="border p-2">{row["وصف المنتج"]}</td>
                <td className="border p-2">{row["تاريخ"]}</td>
                <td className="border p-2">
                  <select
                    value={row["حالة الشحنة"]}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                    className={`border border-gray-300 rounded px-2 py-1 ${getStatusColor(row["حالة الشحنة"])}`}
                  >
                    <option value="جاري التوصيل">جاري التوصيل</option>
                    <option value="تسليم ناجح">تسليم ناجح</option>
                    <option value="تسليم جزائى">تسليم جزائي</option>
                    <option value="مرتجع">مرتجع</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
