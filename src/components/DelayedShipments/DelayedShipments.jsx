import React, { useEffect, useState } from 'react';
import * as XLSX from 'xlsx';

export default function DelayedShipments() {

  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("Shipments")) || [];
    data.forEach((item=>item["حالة الشحنة"]="جاري التوصيل"))
    setAllData(data);
   
    
  }, []);
  
  
  const handleFileUpload=(e)=>{
    const file=e.target.files[0];
    const reader=new FileReader();
    reader.onload=(event)=>{
      const arrayBuffer=event.target.result;
      const workbook=XLSX.read(arrayBuffer,{type:'array'});
      const worksheetname=workbook.SheetNames[0];
      const worksheet=workbook.Sheets[worksheetname];
      const rowdata=XLSX.utils.sheet_to_json(worksheet);
      const date=new Date().toLocaleString('ar-EG'); 
      const mappedData=rowdata.map((row)=>({
        "رقم البوليصة": row["رقم البوليصة"],
        "المرسل اليه": row["المرسل اليه"],
        "موبايل 1": row["موبايل 1"],
        "موبايل 2": row["موبايل 2"],
       "مبلغ التحصيل": row["مبلغ التحصيل"],
        "العنوان": row["العنوان"],
        "اسم المنتج": row["اسم المنتج"],
        "العدد": row["العدد"],
        "وصف المنتج": row["وصف المنتج"],
        "حالة الشحنة": row["حالة الشحنة"],
        "تاريخ":date,
      }));
      setData(mappedData);
      console.log(mappedData);
      
     
      localStorage.setItem('Shipments',JSON.stringify([...alldata,...mappedData]));
    }
    reader.readAsArrayBuffer(file)
  };
  const handleStatusChange = (index, newStatus) => {
    const updatedData = [...data];
    updatedData[index]["حالة الشحنة"] = newStatus;
    setData(updatedData);
    console.log( updatedData[index]);
    
  };
  const getStatusColor = (status) => {
    switch (status) {

      case "جاري التوصيل":
        return "bg-green-500  text-white";
      
      case "تسليم ناجح":
        return "bg-yellow-300 text-white";
      case "تسليم جزائى":
        return "bg-orange-500 text-white";
      case "مرتجع":
        return "bg-red-500 text-white";
        default:
          return "bg-green-500  text-white"; 
    }
  };
  
  return<>
 


    <div className="p-4">
    
      <input type="file"   accept=".xlsx, .xls"  onChange={handleFileUpload}  className="mb-4"  />

      {data.length > 0 && (
        <table className=" table-auto border-collapse border border-gray-400 w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
            <th className="border p-2">#</th>
              <th className="border p-2">رقم البوليصة</th>
              <th className="border p-2">المرسل اليه</th>
              <th className="border p-2">موبايل 1</th>
              <th className="border p-2">موبايل 2</th>
              <th className="border p-2"> مبلغ التحصيل</th>
              <th className="border p-2">العنوان</th>
              <th className="border p-2">اسم المنتج</th>
              <th className="border p-2">العدد</th>
              <th className="border p-2">وصف المنتج</th>
              <th  className="border p-2">تاريخ</th>
              <th className="border p-2">حالة الشحنة</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
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
                <td className="border p-2 "> <select
                      value={row["حالة الشحنة"]}
                      onChange={(e) => handleStatusChange(index, e.target.value)}
                      className={`border border-gray-300 rounded px-2 py-1 ${getStatusColor(row["حالة الشحنة"])}`}                    >
                      <option value="جاري التوصيل">جاري التوصيل</option>
                      <option value="تسليم ناجح">تسليم ناجح</option>
                      <option value="تسليم جزائى"> تسليم جزائي </option>
                      <option value="مرتجع">مرتجع</option>
                    </select></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  </>
  
}
