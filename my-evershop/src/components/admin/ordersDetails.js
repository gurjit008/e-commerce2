import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

import { Link } from "react-router-dom";
function OrdersDetails() {
  const [orderIds, setOrderIds] = useState([]);
  const [userIds, setUserIds] = useState([]);
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedOrders,setSelectedOrders] =useState(null);
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [maxDate, setMaxDate] = useState(null);
  const [minDate, setMinDate] = useState(null);
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [orderStatus, setOrderStatus] = useState(null);
  const [shipmentStatus, setShipmentStatus] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState(null);

  const [checkes,setCheckes]=useState(null);
 
  const[showFullfill,setShowFullfill]=useState(false);



  // const api = axios.create({
  //   baseURL: "https://e-commerce-backend-wpmd.onrender.com/orders",
  //   // withCredentials:true
  // });

  const api = axios.create({
    baseURL: 'https://e-commerce2-backend.onrender.com/orders'
    // You can also configure other options here
  });

  const getOrders = async () => {
    try {
      console.log("feching orders data");
      const response = await api.get("/getOrderData");
      
      console.log(response.data);
      const allOrders = response.data;
      

      if (response.status == 200) {
        const allOrder = await allOrders.map((order) => ({
            order_id:order._id,
            user_id: order.user_id,
            email:order.user_email,
            order_no:order.orderNumber,
           order_status:order.orderStatus,
           total_amount:order.totalAmount,
           payment_method:order.paymentMethod,
          created_at:order.createdAt.slice(0,10)
             }))
        console.log("allOrderss----", allOrder);
        setOrders(allOrder);
;
      }
    } catch (error) {
      console.log(error.response);
      console.log(error);
    }
  };
  // useEffect(() => getOrders, []);
  useEffect(getOrders, []);


  const filteringOrders =()=>{

    let filterByOrderNumber=[];
    if(orderNumber){
        filterByOrderNumber =orders.filter(order=> String(order.order_no).startsWith(String(orderNumber)))
    }else{
        filterByOrderNumber=orders;
    }

    let filterByEmail=[];
    const lowerCaseEmail = email.toLowerCase();
    if(email){
        filterByEmail = filterByOrderNumber.filter(order=> order.email.toLowerCase().startsWith(lowerCaseEmail))
    }else{
        filterByEmail=filterByOrderNumber;
    }

    let filterByDate= [];
    if (minDate && maxDate) {
        const minDateTime = new Date(minDate).getTime();
        const maxDateTime = new Date(maxDate).getTime();
    
        filterByDate = filterByEmail.filter(order => {
            const orderDateTime = new Date(order.createdAt).getTime();
            return orderDateTime >= minDateTime && orderDateTime <= maxDateTime;
        });
    } else {
        filterByDate = filterByEmail;
    }

    let filterByShipmentStatus =[];
    if(shipmentStatus){
        filterByShipmentStatus = filterByDate.filter(order=> order.order_status == shipmentStatus);
    }else{
        filterByShipmentStatus=filterByDate;
    }

    let filterByPaymentStatus =[];
    if(paymentStatus){
        if(paymentStatus == "paid"){
        filterByPaymentStatus = filterByShipmentStatus.filter(order=> order.payment_method == "PayPal" )
        }else{
        filterByPaymentStatus = filterByShipmentStatus.filter(order=> order.payment_method !== "PayPal" )

        }
    }else{
        filterByPaymentStatus =filterByShipmentStatus;
    }

    let filterByPrice=[];
    if(minPrice && maxPrice){
        console.log("min:"+minPrice +" max :"+maxPrice);
        filterByPrice = filterByPaymentStatus.filter(order=> (+order.total_amount >= +minPrice && +order.total_amount <= +maxPrice))
    }else{
        filterByPrice = filterByPaymentStatus;
    }


    setFilteredOrders(filterByPrice);
    setCheckes(false);
    setCheckes(null);
    setSelectedOrders(null)

  }

  console.log("filtere Products",filteredOrders);
  useEffect(filteringOrders,[orders,orderNumber,email,minDate,maxDate,shipmentStatus,paymentStatus,maxPrice,minPrice])



  const handleFullfillOrder=async()=>{

    try {

        const response = await api.patch('/fullfillOrder',orderIds);
        console.log(response);

        setTimeout(()=>(
          getOrders(),setShowFullfill(false)
        )
        ,1000

        )
        setCheckes(false);
        setSelectedOrders(null);
        setOrderIds([]);
  
        
    } catch (error) {
        console.log(error.response);
        
    }

  }
  


  const handleCheckBox = (event,order)=>{
    
    const checked = event.target.checked;
    // console.log(order.user_id);

    checked ?  setUserIds([...userIds,order.user_id]) :  setUserIds(()=>userIds.filter(user_Id=> user_Id !==order.user_id)); 

    checked ?  setOrderIds([...orderIds,order.order_id])  : setOrderIds(()=>orderIds.filter(order_Id=> order_Id !==order.order_id));  
    checked ?  setSelectedOrders(selectedOrders+1) :  setSelectedOrders(selectedOrders-1); 
console.log("orderIDs--",orderIds);
console.log("userIDs--",userIds);
  }

  return (
    <>


{showFullfill ?
  <div className="z-40 backdrop-blur-s bg-gray-500 bg-opacity-50   top-0 flex items-center justify-center fixed h-full w-full">
<div className="bg-white rounded-md w-[50vw] grid p-5 h-[30vh]">
  <ul className="flex justify-between ">
    <li className="font-semibold">Fullfill  {selectedOrders} orders</li>
    <li className="text-xl cursor-pointer"><a onClick={()=>setShowFullfill(false)}>X</a></li>
  </ul>
  <ul>
    <li className="text-sm pt-5 flex items-center gap-2"  ><input type="checkbox" className="border-2 border-gray-300 rounded focus:ring-transparent" />
Send notification to the customer</li>
  </ul>
  <ul>
    <li>
      <hr className="border-t"/>
    </li>
  </ul>
  <ul className="flex justify-end pt-5 ">
    <li className="flex gap-2  ">
      <input type="button" onClick={()=>setShowFullfill(false)} className=" cursor-pointer px-2 border border-gray-300  rounded " value={'Cancle'}/>
      <input type="button" onClick={handleFullfillOrder} className="bg-custom-green rounded px-2 cursor-pointer text-white" value={'Mark as fullfilled'}/>
    </li>
  </ul>

</div>
  </div>:''

}


      <div className="gap-3 p-4 col-span-12   px-6 sm:ps-[30vw]  md:ps-[20vw]">
        <div className="flex justify-between pb-4 items-center font-semibold">
          <h1 className="text-xl">Order </h1>
        </div>
      

        <div className="grid grid-cols-12 py-3 shadow-lg rounded-lg bg-white">
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-3 items-end p-2  px-3">

              <ul className="col-span-2 flex items-end gap-3">
                <li>
                  <input
                    type="checkbox"
                    className="border-2 border-gray-300 rounded focus:ring-transparent"
                  />
                </li>

              <ul>
                <li>
                  <label className="font-semibold">Order Number</label>
                </li>
                <li>
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={e=>setOrderNumber(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="Order Number"
                  />
                </li>
              </ul>
              </ul>


              <ul className="col-span-2">
                <li>
                  <label className="font-semibold">Date</label>
                </li>
                <li className="flex gap-2">
                  <input
                    type="text"
                    value={minPrice}
                    onChange={e=>setMinDate(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="From"
                  />
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={e=>setMaxDate(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="To"
                  />
                </li>
              </ul>

              <ul className="col-span-2">
                <li>
                  <lable className="font-semibold">Email</lable>
                </li>
                <li>
                  <input
                    type="text"
                    value={email}
                    onChange={e=>setEmail(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="Email"
                  />
                </li>
              </ul>


              <ul className="col-span-2">
                <li>
                  <lable className="font-semibold">Shipment Status</lable>
                </li>
                <li>
                  <select onChange={e=>setShipmentStatus(e.target.value)} className="text-sm border rounded w-full border-gray-300">
                    <option value={''} selected disabled>
                      {" "}
                      Please Select{" "}
                    </option>
                    <option value={''}> All</option>
                    <option value={'Fullfilled'}> Fullfilled </option>
                    <option value={'Pending'}> Unfullfilled </option>
                  </select>
                </li>
              </ul>

              <ul className="col-span-2">
                <li>
                  <lable className="font-semibold">Payment Status</lable>
                </li>
                <li>
                  <select onChange={e=>setPaymentStatus(e.target.value)} className="text-sm border rounded w-full border-gray-300">
                    <option value={''} selected disabled>
                      {" "}
                      Please Select{" "}
                    </option>
                    <option value={''}> All</option>
                    <option value={'pending'}> Pending </option>
                    <option value={'paid'}> Paid </option>
                  </select>
                </li>
              </ul>

              <ul className="col-span-2">
                <li>
                  <label className="font-semibold">Price</label>
                </li>
                <li className="flex gap-2">
                  <input
                    type="text"
                    value={minPrice}
                    onChange={e=>setMinPrice(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="From"
                  />
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={e=>setMaxPrice(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="To"
                  />
                </li>
              </ul>

          


            </div>

            {/* visible when any product selected */}
{selectedOrders ? 
  <div className="grid grid-cols-12">
  <ul className="flex text-sm col-span-12 py-5 font-semibold px-3 text-gray-800">
    <li className="border border-gray-300 rounded-s p-2 ">
      {selectedOrders} selected
    </li>
    <li className="border border-gray-300  rounded-e p-2  cursor-pointer" onClick={()=>setShowFullfill(true)}>Mark as fullfilled</li>
  </ul>
</div>:''
}
          

            {/*------------------- all orders  */}
            {filteredOrders.map((order) => (
              <>
                <hr className="border-t my-4" />

                <div className="grid grid-cols-12  items-center gap-2 px-3">
                 
                  <ul className="col-span-2  flex items-center gap-4">
                        <li>
                    <input
                      type="checkbox"
                      checked={checkes}
                      onClick={(e)=>handleCheckBox(e,order) }
                      className="border-2 border-gray-300 rounded focus:ring-transparent"
                    />
                    </li>
                   
                    <li>
                     #{order.order_no}
                    </li>
                  </ul>

                  <ul className="col-span-2 text-sm ps-1">
                    <li className=" font-semibold">{moment(order.created_at).format("MMM D, YYYY")}</li>
                  </ul>

                  <ul className="col-span-2 text-sm ps-1">
                    <li>{order.email}</li>
                  </ul>
                  {order.order_status === 'Pending' ? 
                                     <ul className="col-span-2 text-sm rounded-2xl flex py-1 ps-2 w-28 bg-orange-300 items-center gap-2">
                                     <span className="bg-orange-400 rounded-full border border-orange-200 absolute  p-1 "></span>
                                       <li className="ps-3">Unfillfilled</li>
                                     </ul> :
                                     <ul className="col-span-2 text-sm rounded-2xl flex py-1 ps-3 w-28 bg-green-300 items-center gap-2">
                                     <span className="bg-green-700 rounded-full absolute  p-1 "></span>
                                       <li className="ps-3">Fullfilled</li>
                                     </ul>
                
                }
                
                {order.payment_method == "Cash On Delivery"?
                
                <ul className="col-span-2 text-sm rounded-2xl flex py-1 ps-3 w-20 bg-gray-300 items-center gap-2">
                  <span className="bg-gray-500 rounded-full absolute  p-1 "></span>
                    <li className="ps-3">Unpaid</li>
                  </ul>:
                                    <ul className="col-span-2 text-sm rounded-2xl flex py-1 ps-3 w-20 bg-green-300 items-center gap-2">
                                    <span className="bg-green-700 rounded-full absolute  p-1 "></span>
                                      <li className="ps-3">Paid</li>
                                    </ul>
            }
                  

                  

 

                  <ul className="col-span-2 text-sm ps-2">
                    <li>${order.total_amount}.00</li>
                  </ul>

                  {/* <ul className="col-span-2 flex justify-center">
                    <li className={ `${order.status ? 'bg-green-400':'bg-green-200' }  rounded-full p-1.5`}></li>
                  </ul> */}
                </div>
              </>
            ))}
          </div>
        </div>

      </div>

      {/* </div> */}
    </>
  );
}


export default OrdersDetails