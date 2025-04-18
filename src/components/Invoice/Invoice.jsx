import React, { useEffect, useState } from 'react'
import { useFormik } from 'formik'
import toast from 'react-hot-toast';
import *as yup from 'yup'
export default function Invoice() {
 let getDataStock=JSON.parse(localStorage.getItem('dataStock'))||[];
 function updateStock(values){
  values.forEach(item=>{
    const stockItem=getDataStock.find(i=>i.name===item.name);
    if(stockItem){
      stockItem.quantity -= parseInt(item.quantity);
      localStorage.setItem('dataStock',JSON.stringify(getDataStock))
    }
  })
 }
  const validateSchema=yup.object().shape({
    name:yup.string().required('Name is required'),
    phone:yup.string().required('Phone is required').matches(/^01[1250][0-9]{8}$/, 'Phone number must be valid'),
    items:yup.array().of(
      yup.object().shape({
        name:yup.string().test(
          'is-in-stock',
          'المنتج غير موجود في المخزن',
          function (value) {
            if (!value) return true;
            return getDataStock.some(item => item.name === value);
          }
        ),
        price:yup.number().test('check price','السعر غير مقبول',function(value){
          if (!value) return true;
          const name=this.parent.name;
          let product=getDataStock.find(item=>item.name==name)
        
          
          if(!product)return;
          return parseFloat( product.price)<=parseFloat(value)

        }),

        quantity:yup.number().test('check quantity',"الكميه اكتر من المتاح",function(value){
          if (!value) return true;
          const name=this.parent.name;
          let product=getDataStock.find(item=>item.name==name)
          if(!product)return;
          return value>0 && parseFloat(product.quantity)>=parseFloat(value)

        })
   
      })
    ),

  })

  const formik=useFormik({
    initialValues:{
     items: Array(20).fill().map(()=>({
      name:'',
      price:'',
      quantity:'',
      total:"0.00",
    })),
    name:'',
    phone:'',
    },
    validationSchema:validateSchema,
    onSubmit: function(values, { resetForm }){
      let data={...values}
     data.items= values.items.filter(item=>item.name!==''&&item.price!==''&&item.quantity !=='');
     if (data.items.length === 0) {
      toast.error("لا يوجد منتجات  للحفظ!");
      return; 
    }
     let cash=data.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2);
     let date=new Date().toLocaleDateString('en-CA')
     data={...data,cash,date}
     let getdata=JSON.parse(localStorage.getItem('dataInvoice'))||[];
     updateStock(data.items)
    console.log(data);
    
   
     getdata.push(data);
     localStorage.setItem('dataInvoice',JSON.stringify(getdata))
     
     resetForm();
     toast.success("Invoice saved successfully ✅")
    },
  })
  const handleItemChange = (index, field, value) => {
    const newItems = [...formik.values.items];
    newItems[index] = { ...newItems[index], [field]: value };
  
    if (field === "price" || field === "quantity") {
      const price = parseFloat(newItems[index].price) || 0;
      const quantity = parseInt(newItems[index].quantity) || 0;
      newItems[index].total = (price * quantity).toFixed(2);
    }
    formik.setFieldValue("items", newItems);
  };
 
  return <>
  <form onSubmit={formik.handleSubmit}>
  <div className="p-4 w-full  mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-xl text-center font-bold mb-4">فاتورة المشتريات</h2>
      <div className="flex flex-col w-full gap-2">
        {formik.values.items.map((item, index) => (
          <div key={index}  className="flex justify-between gap-2 sart   w-full bg-white p-2 rounded-md shadow-sm"  dir="rtl">
            <input
              type="text"
              className="border p-1 w-1/3"
              name='name'
              value={item.name}
              onChange={(e)=>handleItemChange(index,'name',e.target.value)}
              placeholder="اسم المنتج"
            />
               <div className="text-red-500 text-sm">
            {formik.errors.items && formik.touched.items && formik.touched.items[index] && formik.errors.items[index]?.name && <div>{formik.errors.items[index].name}</div>}

              </div>
            <input
              type="number"
              className="border p-1 w-1/4"
              name='price'
              value={item.price}          
              onChange={(e)=>handleItemChange(index,'price',e.target.value)}
              placeholder="السعر"
            />
               <div className="text-red-500 text-sm">
            {formik.errors.items && formik.touched.items && formik.touched.items[index] && formik.errors.items[index]?.price && <div>{formik.errors.items[index].price}</div>}
              </div>
            <input
              type="number"
              className="border p-1 w-1/4"
              name='quantity'
              value={item.quantity}
              onChange={(e)=>handleItemChange(index,'quantity',e.target.value)}
              placeholder="الكمية"
            />
               <div className="text-red-500 text-sm">
            {formik.errors.items && formik.touched.items && formik.touched.items[index] && formik.errors.items[index]?.quantity && <div>{formik.errors.items[index].quantity}</div>}
                
              </div>
            <span className="w-1/4 text-right font-semibold">{item.total}ج.م</span>
         
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 right-0 left-0 h-24 px-3 bg-[#F3F4F6]">
      <div className="mt-4  text-right font-bold text-lg">
        الإجمالي: {formik.values.items.reduce((sum, item) => sum + (parseFloat(item.total) || 0), 0).toFixed(2)} ج.م
      </div>
      <div className="flex justify-between items-center">
      <button type='submit' className='transition ease-in-out delay-150  bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 py-3 px-5 rounded-2xl text-white'> Save Invoice</button>

      <div dir="rtl" className=' w-[70%] gap-3'>
      <input
              type="text"
              className="border p-1 w-1/2 "
              name='name'
              value={formik.values.name}
              
              onChange={formik.handleChange}
              placeholder="اسم العميل"
            />
            <input
              type="phone"
              className="border p-1 w-1/2 "
              name='phone'
              value={formik.values.phone}
              onChange={formik.handleChange }
              placeholder="رقم الموبايل"
            />
      </div>

      </div>
     
    </div>
      </div>
      
  </form>
  </>
  
} 