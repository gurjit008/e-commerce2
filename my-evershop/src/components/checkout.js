import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { clearCart } from "./redux/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const [userLogin, setUserLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [emailFromCookie, setEmailFromCookie] = useState("");
  const[cartItems,setCartItems]=useState([])
  const Items = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  useEffect(()=>{
  setCartItems(Items)
  
},[]);

console.log("cartItems",cartItems.length);
if(cartItems.length == 0){
    navigate("/shoppingCart")
}
  
  // console.log("cart items-----",JSON.stringify(cartItems));
  //shipping address state
  const[userId,setUserId]=useState(undefined);
  const [name, setName] = useState("");
  const [telephone, setTelephone] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [postCode, setPostCode] = useState("");
  const [error, setError] = useState({});
  const [continueToPayment, setContinueToPayment] = useState(false);
  const [showShippingMethod, setShowShippingMethod] = useState(false);
  const [deliveryCharges, setDeliveryCharges] = useState("");
  const [deliveryType, setDeliveryType] = useState("");
  const [paymentMethod,setPaymentMethod]=useState('');
  const[total,setTotal]=useState();
  const [placeOrder,setPlaceOrder]=useState(false);
  const [orderNumber,setOrderNumber]=useState();
  


  const dispatch = useDispatch();
  const countriesData = {
    USA: [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
    ],
    India: [
      "Delhi",
      "Maharashtra",
      "Karnataka",
      "Tamil Nadu",
      "Uttar Pradesh",
      "Gujarat",
      "Rajasthan",
      "Kerala",
      "Punjab",
      "Haryana",
    ],
    UAE: [
      "Dubai",
      "Abu Dhabi",
      "Sharjah",
      "Ajman",
      "Fujairah",
      "Ras Al Khaimah",
      "Umm Al Quwain",
      "Al Ain",
      "Khor Fakkan",
      "Dibba Al-Fujairah",
    ],
    China: [
      "Beijing",
      "Shanghai",
      "Guangdong",
      "Jiangsu",
      "Shandong",
      "Zhejiang",
      "Sichuan",
      "Hunan",
      "Hebei",
      "Anhui",
    ],
  };

  const proviance = countriesData[country];

  const location = useLocation();
  const Total = location.state;
  useEffect(()=>{
    setTotal(Total + +deliveryCharges)
  },[deliveryCharges,Total])
  // console.log("total", total);

  // const api = axios.create({
  //   baseURL: "https://e-commerce-backend-wpmd.onrender.com/users", // Replace with your server URL
  //   withCredentials: true, // Allow Axios to send cookies with requests
  // });
  const api = axios.create({
    baseURL: ['https://e-commerce-backend-wpmd.onrender.com/users', 'https://e-commerce2-backend.onrender.com/users']
    // You can also configure other options here
  });
  
  const api2 = axios.create({
    baseURL: ['https://e-commerce-backend-wpmd.onrender.com', 'https://e-commerce2-backend.onrender.com']
    // You can also configure other options here
  });
  async function protectedData() {
    try { 
      const response = await api.get("/protectedData");
      if (response.status == 200) {
        setUserLogin(true);
        setEmailFromCookie(response.data.user.email);
        setName(response.data.user.name);
        setUserId(response.data.user._id);
        setOrderNumber(orderNumber);       
         console.log(response.data);
         }
      // console.log(response.data);
      // console.log(response.status);
    } catch (error) {
      if (error.response.status == 401) {
        setUserLogin(false);
        return console.log(error.response.data.message);
      }
      console.log(error.response.data);
    }
  }
  useEffect(() => protectedData, []);

  useEffect(()=>console.log("userId-->",userId+"--useremail fookie-->",emailFromCookie,"useremail-->",email),[userId,email,emailFromCookie])

  // const handleLogout = async () => {
  //   try {
  //     // Make a request to the server to clear the session and logout the user
  //     const response = await api.get("/logout");
  //     console.log(response.data);
  //     // Clear any local storage or cookies related to authentication
  //     // (e.g., JWT token, user data, etc.)
  //     localStorage.removeItem("authToken");

  //     // Redirect the user to the login page or any other desired page
  //     // history.push("/login");
  //   } catch (error) {
  //     console.error("Logout error:", error);
  //   }
  // };
  useEffect(() => {
    if (name && telephone && address && city && country && state && postCode) {
      setShowShippingMethod(true);
      console.log("setShowShippingMethod--", showShippingMethod);
    } else {
      setShowShippingMethod(false);
    }
  }, [name, address, city, country, state, postCode]);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const isValidEmail = emailRegex.test(email);



  const continueToShipping = ()=>{
    if(!email){
      setError({email:'This field can not be empty'});
      console.log(error);
      return;
    }
    if(!isValidEmail){
      setError({email:'Invalid Email'});
      return
    }else{
      setUserLogin(true);
    }
  }

const handleChange=()=>{
  console.log('change');
  setUserLogin(false);
  setContinueToPayment(false);

  console.log("user Login or email found",userLogin);
}
const handleAddressChange = () =>{
  setContinueToPayment(false);

}

  const handleCountinueToPayment = () => {
    const errors = {};
    console.log("ji");
    if (!name) {
      errors.name = "This field can not be empty";
    }
    if (!telephone) {
      errors.telephone = "This field can not be empty";
    }
    if (!address) {
      errors.address = "This field can not be empty";
    }
    if (!city) {
      errors.city = "This field can not be empty";
    }
    if (!country) {
      errors.country = "This field can not be empty";
    }
    if (!state) {
      errors.state = "This field can not be empty";
    }
    if (!postCode) {
      errors.postCode = "This field can not be empty";
    }
    if (!deliveryCharges) {
      errors.deliveryCharges = "This field can not be empty";
    }

    setError(errors);
    if (Object.keys(errors).length > 0) {
      console.log(errors);
      return;
    } else {
      // setUserLogin(false);
      setContinueToPayment(true);
    }
  };
  const handlePlaceOrder=async ()=>{
    const errors={}
    if(!paymentMethod){
      errors.paymentMethod="Select a payment method";
      setError(errors);
      return;
    }else{
      setError({});

      const orderNumber =Math.floor(Math.random() * 10000);

      const order= {
        user_id:userId,
        user_email:(emailFromCookie||email),
        orderNumber:orderNumber,
        products:cartItems,
        paymentMethod,
        totalAmount:total
      }
      console.log(order);
      try {
        const response =await api2.post("/orders/saveOrder",order)
        console.log(response.data);
        
      } catch (error) {
        console.log(error);
        console.log(error.response);
        
      }

      dispatch(clearCart());
      setPlaceOrder(true);
    }
   
  }

  return (
    <>
      <header className="xl:container xl:ms-auto ms-6 mt-5  min-h-screen  ">
        <div className="list-none">
          <li className="text-sm">
            <Link to={"/home"} className="text-blue-600">
              {" "}
              Home{" "}
            </Link>{" "}
            / Checkout{" "}
          </li>
        </div>

        <div className=" flex text-xs py-5 list-none gap-1 text-blue-500">
          <li>Contact information &gt; </li>
          <li> Shipment &gt;</li>
          <li>Payment</li>
        </div>

        <div className="grid  grid-cols-12 ">
          {!continueToPayment?
                    <div className="md:col-span-5 col-span-12 pe-5 hidde">
                    {/* -------------------------Visible When user is not login or no email found---------------- */}
                    {!userLogin ? (
                      <div className="text-gray-700 grid hidde mt-5 gap-2   ">
                        <h1 className="text-2xl">Contact Information</h1>
        
                        <h3 className="text-sm">
                          Already have an account?
                          <Link to={"/login"}>
                            <span className="text-blue-500">
                              {/* <a href="./login" onClick={(e) => e.preventDefault()}> */}
                              Login
                              {/* </a> */}
                            </span>
                          </Link>
                        </h3>
                        <input
                          type="email"
                          value={email}
                          onChange={(e)=>setEmail(e.target.value)}
                          className="rounded-sm bor  border-gray-300"
                          placeholder="Email"
                        />
                                  {error.email ? (
                                    <span
                                      className={`text-red-500 text-sm text-start pt-1`}
                                    >
                                      {" "}
                                      <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                        !
                                      </span>{" "}
                                      {error.email}{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                        <input
                          type="button"
                          value={"Continue to shipping"}
                          onClick={continueToShipping}
                          className="justify-self-end cursor-pointer  hover:bg-custom-green bg-custom-gray text-sm text-gray-100 p-4 "
                        />
                      </div>
                    ) : (
                      // {/* Visible When user is login or email found or provided---------------- */}
        
                      <div className="text-gray-700 grid  text-md my-5 hdden gap-5">
                        <div className="rounded-sm border p-2 ps-6 border-gray-300">
                          <ul className="flex justify-between">
                            <li>Contact</li>
                            <li>{emailFromCookie}{email}</li>
                            <li className="text-blue-500 cursor-pointer">{!emailFromCookie ?<a onClick={handleChange}>Change</a>:'' } </li>
                          </ul>
                        </div>
                        <div className="grid gap-4">
                          <h1 className="text-xl">Shipping Address</h1>
        
                          <form className="">
                            <table className="w-full border-separate border-spacing-1">
                              <tr className="">
                                <td>Full name</td>
                                <td>Telephone</td>
                              </tr>
                              <tr>
                                <td>
                                  <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full rounded  border-gray-300"
                                    placeholder="Full name"
                                  />
                                  {error.name ? (
                                    <span
                                      className={`text-red-500 text-sm text-start pt-1`}
                                    >
                                      {" "}
                                      <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                        !
                                      </span>{" "}
                                      {error.name}{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    value={telephone}
                                    onChange={(e) => setTelephone(e.target.value)}
                                    className="w-full rounded  border-gray-300"
                                    placeholder="Telephone"
                                  />
                                  {error.telephone ? (
                                    <span
                                      className={`text-red-500 text-sm text-start pt-1`}
                                    >
                                      {" "}
                                      <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                        !
                                      </span>{" "}
                                      {error.telephone}{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td>Address</td>
                              </tr>
                              <tr className="col-span-2">
                                <td colSpan="2">
                                  <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full rounded   border-gray-300"
                                    placeholder="Address"
                                  />
                                  {error.address ? (
                                    <span
                                      className={`text-red-500 text-sm text-start pt-1`}
                                    >
                                      {" "}
                                      <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                        !
                                      </span>{" "}
                                      {error.address}{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
        
                              <tr>
                                <td>City</td>
                              </tr>
                              <tr className="col-span-2">
                                <td colSpan={"2"}>
                                  <input
                                    type="text"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full rounded   border-gray-300"
                                    placeholder="City"
                                  />
                                  {error.city ? (
                                    <span
                                      className={`text-red-500 text-sm text-start pt-1`}
                                    >
                                      {" "}
                                      <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                        !
                                      </span>{" "}
                                      {error.city}{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
        
                              <tr>
                                <td>Country</td>
                              </tr>
        
                              <tr>
                                <td colSpan={"2"}>
                                  <select
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    className=" w-full  border-gray-300 rounded"
                                  >
                                    <option className="w-full p-0" disabled selected>
                                      {" "}
                                      Country{" "}
                                    </option>
                                    <option value={"India"}> India </option>
                                    <option value={"USA"}> USA </option>
                                    <option value={"UAE"}> UAE </option>
                                    <option value={"China"}> China </option>
                                  </select>
                                  {error.country ? (
                                    <span
                                      className={`text-red-500 text-sm text-start pt-1`}
                                    >
                                      {" "}
                                      <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                        !
                                      </span>{" "}
                                      {error.country}{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
        
                              <tr>
                                <td>Province</td>
                                <td>Postcode</td>
                              </tr>
                              <tr>
                                <td>
                                  <select
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    className="overflow-scroll w-full border-gray-300 rounded"
                                  >
                                    <option className="w-full p-0" disabled selected>
                                      Province
                                    </option>
                                    {country
                                      ? proviance.map((state) => (
                                          <option value={state}> {state} </option>
                                        ))
                                      : ""}
                                  </select>
                                  {error.state ? (
                                    <span
                                      className={`text-red-500 text-sm text-start pt-1`}
                                    >
                                      {" "}
                                      <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                        !
                                      </span>{" "}
                                      {error.state}{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                                <td>
                                  <input
                                    type="text"
                                    value={postCode}
                                    onChange={(e) => setPostCode(e.target.value)}
                                    className="w-full rounded  border-gray-300"
                                    placeholder="Postcode"
                                  />
                                  {error.postCode ? (
                                    <span
                                      className={`text-red-500 text-sm text-start pt-1`}
                                    >
                                      {" "}
                                      <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                        !
                                      </span>{" "}
                                      {error.postCode}{" "}
                                    </span>
                                  ) : (
                                    ""
                                  )}
                                </td>
                              </tr>
                            </table>
                          </form>
        
                          <h1 className="text-2xl">Shipping Method</h1>
                          {!showShippingMethod ? (
                            // {/* ------------------visible when shipment address is not filled----------------------------- */}
        
                            <div className="border text-sm text-gray-500 border-gray-300 p-9">
                              <p>
                                Please enter a shipping address in order to see shipping
                                quotes
                              </p>
                            </div>
                          ) : (
                            // {/* visible when shipment addres is filled shipment charges------------------------ */}
                            <div className="border text-sm text-gray-500 grid gap-3 hidde border-gray-300 ps-3 p-9">
                              <label className="flex items-center">
                                {" "}
                                <input
                                  type="radio"
                                  name="delivery"
                                  className="rounded-full me-1"
                                  value={"9"}
                                  onChange={(e) => (setDeliveryCharges(e.target.value),setDeliveryType('Standard Delivery'))}
                                />{" "}
                                Standard Delivery - $9.00
                              </label>
                              <label className="flex items-center">
                                {" "}
                                <input
                                  type="radio"
                                  name="delivery"
                                  className="rounded-full me-1"
                                  value={"20"}
                                  onChange={(e) => (setDeliveryCharges(e.target.value),setDeliveryType('Express Delivery'))}
                                />{" "}
                                Express Delivery - $20.00
                              </label>
                              {error.deliveryCharges ? (
                                <span
                                  className={`text-red-500 text-sm text-start pt-1`}
                                >
                                  {" "}
                                  <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                    !
                                  </span>{" "}
                                  {error.deliveryCharges}{" "}
                                </span>
                              ) : (
                                ""
                              )}
                            </div>
                          )}
                        </div>
        
                        <input
                          type="button"
                          value={"Continue to payment"}
                          onClick={handleCountinueToPayment}
                          className="justify-self-end cursor-pointer hover:bg-custom-green bg-custom-gray text-sm text-gray-100 p-4 "
                        />
                      </div>
                    )}
                </div>:


                            // {/* ------------------visible when user click on shipment button ------------------------ */}
            <div className="md:col-span-5 col-span-12 pe-5 hidde">
{!placeOrder ? 
            <div className="text-gray-700 hidde grid sm:text-md text-sm  my-5  gap-5 hidde">
            <div className="rounded-sm border p-2 ps-6 border-gray-300">
              <ul className="flex justify-between">
                <li>Contact</li>
                <li>{emailFromCookie ? emailFromCookie : email}</li>
                <li className="text-blue-500 cursor-pointer">{email ?<a onClick={handleChange}>Change</a>:'' }</li>               
              </ul>
              <hr className="border-t border-gray-200 my-3  me-3" />
              <ul className="flex justify-between">
                <li className=" flex-none ">Ship to</li>
                <li>
                  {" "}
                  {address}, {city}, {country}
                  {/* New Janta Nagar st no 1 waheguru road, Ludhiana, India */}
                </li>
                <li className="text-blue-500 cursor-pointer"><a onClick={handleAddressChange}>Change</a></li>

              </ul>
            </div>

            <h1 className="sm:text-2xl text-xl ">Payment Method</h1>
            <div className="border text-sm text-gray-500 border-gray-300 p-4">
              <label className="flex gap-3 items-center">
                {" "}
                <input
                  type="radio"
                  name="radio"
                  className="rounded-full "
                  value={"Cash On Delivery"}
                  onChange={(e)=>setPaymentMethod(e.target.value)}
                />
                <img src="https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691764500/product_images/cash_pm0asr.png" className=" w-32" />
              </label>
              <hr className="border-t border-gray-200 my-3" />
              <label className="flex items-center gap-3">
                {" "}
                <input
                  type="radio"
                  name="radio"
                  className="rounded-full me-1"
                  value={"PayPal"}
                  onChange={(e)=>setPaymentMethod(e.target.value)}
                />{" "}
                <img src="https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691764622/product_images/paypal_et4lra.svg" className=" w-24" />{" "}
              </label>
            </div>
            {error.paymentMethod ? (
                                <span
                                  className={`text-red-500 text-sm text-start pt-1`}
                                >
                                  {" "}
                                  <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">
                                    !
                                  </span>{" "}
                                  {error.paymentMethod}{" "}
                                </span>
                              ) : (
                                ""
                              )}

            <input
              type="button"
              value={"Place Order"}
              onClick={handlePlaceOrder}
              className="justify-self-end rounded-sm cursor-pointer hover:bg-custom-green bg-custom-gray text-sm text-gray-100 p-4 "
            />
          </div>
:
           // {/* ------------------visible when user fullfill the payment method  ------------------------ */}

           <div className="text-gray-600 grid text-md my-5  gap-5">
           <div className="flex">
             <img src="https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691764726/product_images/done_qydh8j.svg" className=" w-14" />
             <span>
               <h3>Order #12233</h3>
               <h1 className="text-2xl">Thank you {name}! </h1>
             </span>
           </div>

           <div className="border rounded">
             <div className="grid gap-5 p-4">
               <div className="text-sm">
                 <div className="grid grid-cols-2">
                   <div className="py-4 text-gray-900 font-medium col-span-2">
                     Customer information
                   </div>

                   <div className="conatct-info">
                     <div className="">Contact information</div>
                     <div className="pb-4">{email}</div>
                   </div>

                   <div className="payment-method">
                     <div>Payment Method</div>
                     <div>{paymentMethod}</div>
                   </div>

                   <div className="shippind-address">
                     <div className="py-2 text-gray-900">
                       Shipping Address
                     </div>
                     <div>{name}</div>
                     <div>{address}</div>
                     <div>{postCode}, {city}</div>
                     <div>{state}, {country}</div>
                     <div>{telephone}</div>
                   </div>

                   <div className="billing-address">
                     <div className="py-2 text-gray-900">
                       Billing Address
                     </div>
                     <div>{name}</div>
                     <div>{address}</div>
                     <div>{postCode}, {city}</div>
                     <div>{state}, {country}</div>
                     <div>{telephone}</div>
                   </div>
                 </div>
               </div>
             </div>
           </div>
           <Link to={"/home"}>
             <input
               type="button"
               value={"CONTINUE SHOPPING"}
               className="justify-self-start rounded-sm cursor-pointer hover:bg-custom-green bg-custom-gray text-sm text-gray-100 p-4 "
             />
           </Link>
         </div>
}




          </div>
          
          }







          {/*------------------------checkout product details----------- */}

          <div className="checkout-product col-span-7 md:block hidden  ps-4 pb-28 lg:pe-20 pe-3 pt-10 list-none h-scree text-gray-700 text-sm bg-gray-100  border">
            {cartItems.map((product) => (
              <>
                <div className="flex  gap-6">
                  <div className="">
                    <img
                      className="w-20 mt-4 h-16 object-contain border"
                      src={product.img}
                    />
                    <span className="relative bottom-20 left-14 bg-gray-300  p-1 px-2 text-xs rounded-full">
                      {product.qty}
                    </span>
                  </div>

                  <div className=" w-full">
                    <h1 className="font-medium mb-2">{product.name}</h1>
                    <ul className="flex justify-between">
                      <li>Color: {product.color}</li>
                      <li>${product.price}.00</li>
                    </ul>
                    <li>Size: {product.size}</li>
                  </div>
                </div>
                <hr className="border-t my-2 " />
              </>
            ))}

            {/* <div className="flex  gap-4">
              <div className="">
                <img
                  className="w-20 mt-4 h-16 object-contain border"
                  src="images/kids_files/691-black2.png"
                />
                <span className="relative bottom-20 left-14 bg-gray-300  p-1 px-2 text-xs rounded-full">
                  1
                </span>
              </div>

              <div className=" w-full">
                <h1 className="font-medium mb-2">
                  Canvas platform chuck taylor all star
                </h1>
                <ul className="flex justify-between">
                  <li>Color: Black</li>
                  <li>$691.00</li>
                </ul>
                <li>Size: XL</li>
              </div>
            </div>
            <hr className="border-t my-2 " /> */}

            {/* <div className="flex  gap-4">
              <div className="">
                <img
                  className="w-20 mt-4 h-16 object-contain border"
                  src="images/kids_files/691-black2.png"
                />
                <span className="relative bottom-20 left-14 bg-gray-300  p-1 px-2 text-xs rounded-full">
                  1
                </span>
              </div>

              <div className=" w-full">
                <h1 className="font-medium mb-2">
                  Canvas platform chuck taylor all star
                </h1>
                <ul className="flex justify-between">
                  <li>Color: Black</li>
                  <li>$691.00</li>
                </ul>
                <li>Size: XL</li>
              </div>
            </div>
            <hr className="border-t my-2 " />

            <div className="flex  gap-4">
              <div className="">
                <img
                  className="w-20 mt-4 h-16 object-contain border"
                  src="images/kids_files/691-black2.png"
                />
                <span className="relative bottom-20 left-14 bg-gray-300  p-1 px-2 text-xs rounded-full">
                  1
                </span>
              </div>

              <div className=" w-full">
                <h1 className="font-medium mb-2">
                  Canvas platform chuck taylor all star
                </h1>
                <ul className="flex justify-between">
                  <li>Color: Black</li>
                  <li>$691.00</li>
                </ul>
                <li>Size: XL</li>
              </div>
            </div>
            <hr className="border-t my-2 " />

            <div className="flex  gap-4">
              <div className="">
                <img
                  className="w-20 mt-4 h-16 object-contain border"
                  src="images/kids_files/691-black2.png"
                />
                <span className="relative bottom-20 left-14 bg-gray-300  p-1 px-2 text-xs rounded-full">
                  1
                </span>
              </div>

              <div className=" w-full">
                <h1 className="font-medium mb-2">
                  Canvas platform chuck taylor all star
                </h1>
                <ul className="flex justify-between">
                  <li>Color: Black</li>
                  <li>$691.00</li>
                </ul>
                <li>Size: XL</li>
              </div>
            </div>
            <hr className="border-t my-2 " />
            <div className="flex  gap-4">
              <div className="">
                <img
                  className="w-20 mt-4 h-16 object-contain border"
                  src="images/kids_files/691-black2.png"
                />
                <span className="relative bottom-20 left-14 bg-gray-300  p-1 px-2 text-xs rounded-full">
                  1
                </span>
              </div>

              <div className=" w-full">
                <h1 className="font-medium mb-2">
                  Canvas platform chuck taylor all star
                </h1>
                <ul className="flex justify-between">
                  <li>Color: Black</li>
                  <li>$691.00</li>
                </ul>
                <li>Size: XL</li>
              </div>
            </div>
            <hr className="border-t my-2 " />
            <div className="flex  gap-4">
              <div className="">
                <img
                  className="w-20 mt-4 h-16 object-contain border"
                  src="images/kids_files/691-black2.png"
                />
                <span className="relative bottom-20 left-14 bg-gray-300  p-1 px-2 text-xs rounded-full">
                  1
                </span>
              </div>

              <div className=" w-full">
                <h1 className="font-medium mb-2">
                  Canvas platform chuck taylor all star
                </h1>
                <ul className="flex justify-between">
                  <li>Color: Black</li>
                  <li>$691.00</li>
                </ul>
                <li>Size: XL</li>
              </div>
            </div>
            <hr className="border-t my-2 " /> */}

            <div className="grid  gap-2 w-">
              <ul className="flex justify-between">
                <li>Sub total</li>
                <li>1 items</li>
                <li>$691.00</li>
              </ul>

              <ul className="flex justify-between">
                <li>Tax</li>
                <li>$0.00</li>
              </ul>

              {deliveryType ? <ul className="flex justify-between">
                <li>Shipping</li>
                <li>{deliveryType}</li>
                <li>${deliveryCharges}.00</li>
              </ul>: '' }

              <ul className="flex justify-between">
                <li>Discount</li>
                <li>$0.00</li>
              </ul>
              <hr className="border-t mt-2" />

              <ul className="flex text-lg font-medium justify-between">
                <li>Total</li>
                <li>${total}.00</li>
              </ul>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
export default Checkout;
