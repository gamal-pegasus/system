import {  useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import *as yup from 'yup'


export default function StockList() {
  const [dataStock, setDataStock] = useState([]);
  useEffect(()=>{
    const storedStock = localStorage.getItem('dataStock');
    if (storedStock) {
      setDataStock(JSON.parse(storedStock));
      
    } else {
      setDataStock([]); 
    }
  },[])
  const validateSchema=yup.object().shape({
    name:yup.string().test('check name','هذا المنتج متاح في المخزن ',function(value){
      const srch=JSON.parse(localStorage.getItem('dataStock'));
     return !srch.some(item=>item.name === value)

    }),
   
  price: yup.string().when('name', {
    is: (name) => name && name.trim() !== '',
    then: (schema) => schema.required('يجب إدخال السعر'),
    otherwise: (schema) => schema.test('price-blocked', 'ادخل الاسم أولاً', () => false),
  }),

  quantity: yup.string().when('name', {
    is: (name) => name && name.trim() !== '',
    then: (schema) => schema.required('يجب إدخال الكمية'),
    otherwise: (schema) => schema.test('qty-blocked', 'ادخل الاسم أولاً', () => false),
  })


  })
  
  const formik=useFormik({
    initialValues:{
      name:'',
      price:'',
      quantity:'',

    },
    onSubmit :(values,{resetForm})=>{
      const newStock = [...dataStock, values];
      localStorage.setItem('dataStock', JSON.stringify(newStock));
      setDataStock(newStock);
      resetForm();

    },
    validationSchema:validateSchema,


  })
  return <>
  <form onSubmit={formik.handleSubmit} className="flex  justify-between gap-2 w-full shadow-sm rounded-md  bg-white p-2" dir='rtl'>
    <input type="text" name='name' value={formik.values.name}   onChange={formik.handleChange}  placeholder='اسم المنتج'  />
    {formik.errors.name && formik.touched.name && (
            <div className="text-red-500 text-sm">{formik.errors.name}</div>
          )}
    <input type="text" name='quantity' value={formik.values.quantity} onChange={formik.handleChange}  placeholder='الكميه' />
    {formik.errors.quantity && formik.touched.quantity && (
            <div className="text-red-500 text-sm">{formik.errors.quantity}</div>
          )}
    <input type="text"  name='price' value={formik.values.price} onChange={formik.handleChange}  placeholder='سعر المنتج'/>
    {formik.errors.price && formik.touched.price && (
            <div className="text-red-500 text-sm">{formik.errors.price}</div>
          )}
    <button type='submit' className='transition ease-in-out w-auto delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 py-1 px-3 mx-3 rounded-2xl text-white'> add product</button>

  </form>
 <div className="p-4">
 <table className='table-auto border-collapse border border-gray-400 w-full text-sm'  dir='rtl'>
    <thead className='bg-gray-100'>
      <tr>
      <th className="border p-2">المنتج</th>       
      <th className="border p-2">الكميه</th>
      <th className="border p-2">السعر</th>
      </tr>
    </thead>
    <tbody >
    {dataStock && dataStock.length > 0 ? (
            dataStock?.map((item, index) => (
              <tr key={index}>
                <td className="border p-2">{item.name}</td>
                <td className="border p-2">{parseFloat(item.quantity)}</td>
                <td className="border p-2">{parseFloat(item.price)}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3">لا توجد منتجات لعرضها</td>
            </tr>
          )}
    </tbody>
  </table>
 </div>
  </>
}
