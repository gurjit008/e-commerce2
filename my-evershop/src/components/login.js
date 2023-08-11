import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "./redux/cartSlice";
import moment from "moment";
import axios from "axios";


function Login() {

  const api = axios.create({
    baseURL: 'https://e-commerce-backend-wpmd.onrender.com/users', // Replace with your server URL
    withCredentials: true, // Allow Axios to send cookies with requests
  });

  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
const [error,setError]=useState({});
const [invalidId,setInvalId]=useState('');
const [userLogin,setUserLogin]=useState();
const [user,setUser]=useState('');
const [userId,setUserId]=useState('');
const [orderHistory,setOrderHistory]=useState([]);
const [location,setLocation]=useState('Login');

const navigate =useNavigate();
const dispatch =useDispatch();


  const handleSubmit = async(e) =>{
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidPassword = /^(.{6,})$/.test(password);
    const isValidEmail = emailRegex.test(email);


  const errors={};
  setInvalId();
  if(!isValidEmail){
    errors.email="Email is invalid"
  }
    if(!email){
      errors.email="This field canot be empty";
    }
    if(!isValidPassword){
      errors.password="At least 6 characters are required"
    }
    if(!password){
      errors.password="This field canot be empty";
    }
    if(Object.keys(errors).length > 0 ){
      setError(errors);
      console.log(errors);
      return;
    }
    try {
      const data ={email,password};
      const response = await api.post('/loginUser',data);
      console.log(response.data);
      if(response.data.status == false){
        setInvalId("User is disable");
        return;
      }

      if(response.status == 200 ){
        console.log("succesfully login");
        setUserLogin(true);
        setLocation('Account details');
        navigate(-1);
      }
      // const token = response.data.token;
      // localStorage.setItem('token',token)
      // localStorage.setItem('email',email)
      
    } catch (error) {
      if(error.response.status == 400){
        setTimeout(()=>
        setInvalId("Invalid email or password"),
        1500
        )
        setError({})
        return;
      }
      console.log(error);
    }
    

  }

//if user is login fetch user data
  // if(userLogin){
  //   protectedData();
  //    }
 
     async function protectedData(){
       try {
         const response = await api.get('/protectedData');
         console.log("protected data",response.data);
         if(response.status == 200){
            setEmail(response.data.user.email)
            setUser(response.data.user.name)
            setUserId(response.data.user._id)
            console.log(response.data.user._id);
            setUserLogin(true);
           console.log(response.data);
   
         }
         // console.log(response.data);
         // console.log(response.status);
       } catch (error) {
         if(error.response.status == 401 ){
           setUserLogin(false); 
           return console.log(error.response.data.message);
         }
         console.log(error.response.data);
       }
     }
    // protectedData();
    
    useEffect(()=>{protectedData()},[])

  const getUserOrderHistory = async ()=>{
try {

if(userId){
  console.log("is user login ",userLogin);
  console.log("userId ",userId);
  const response = await axios.post("http://localhost:8000/orders/getOrderDataByUserId",{userId})
  console.log(response.data);
    setOrderHistory(response.data) ;


}
} catch (error) {
  console.log(error);
  
}
  }
  // getUserOrderHistory()
  useEffect(()=>{getUserOrderHistory()},[userId])

   
    const handleLogout = async () => {
     try {
       // Make a request to the server to clear the session and logout the user
     const response =  await api.get("/logout");
     dispatch(clearCart());
   console.log(response.data);
   setUserLogin(false);
       // Clear any local storage or cookies related to authentication
       // (e.g., JWT token, user data, etc.)
       localStorage.removeItem("authToken");
   
       // Redirect the user to the login page or any other desired page
       // history.push("/login");
     } catch (error) {
       console.error("Logout error:", error);
     }
   };

  return (
    <>
    {!userLogin?
    
    <div className="xl:container xl:mx-auto mx-6  mt-5 xl:px-16 min-h-screen">
    <div className="list-none">
      <li className="text-sm">
        <Link to={"/home"} className="text-blue-600">
          Home {''}
        </Link>
        / {location}
      </li>
    </div>

    <div className=" md:flex  text-gray-700  mt-10 justify-center items-center ">
      <form>
      <div className="grid py-10  px-10 text-center rounded-sm shadow-3xl ">
        <h1 className="text-4xl mb-5">Login</h1>
      {invalidId ?<span className="text-red-500 text-sm text-start mb-2">{invalidId} </span>:'' }  
       
        <input
          type="email"
          className="rounded-md border  md:w-96  border-gray-300 "
          placeholder="Email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <span className={`${!error.email ? "hidden":'block'} text-red-500 text-sm text-start pt-1`}> <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">!</span> {error.email} </span>
        <br></br>
        <input
          type="password"
          className="rounded-md border peer md:w-96 border-gray-300 "
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}

        />
        <span className={`${!error.password ? "hidden":' block'} text-red-500 text-sm text-start pt-1`}> <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">!</span> {error.password} </span>

        <hr className="border-t my-2"></hr>
        <input
          type="submit"
          onClick={handleSubmit}
          className="cursor-pointer bg-custom-gray py-2 text-white rounded-sm border border-gray-300 "
          value="SIGN IN"
        />
          <h4 className=" mt-2 text-blue-600">

        <Link className="cursor-pointer" to={"/newAccount"}>
            Create an account
        </Link>
        </h4>

      </div>
      </form>
    </div>


  </div>:

      // {/* visible when user is login */}
      <div className="xl:container hidde pb-20 xl:mx-auto mx-6  mt-5 xl:px-10 min-h-screen" > 

      <div className="grid grid-cols-12  md:gap-12 gap-5 text-gray-700 ">
       <h1 className="col-span-12 text-center text-3xl" >My Account</h1>
        <div className="md:col-span-8 col-span-12">
          <h1 className=" text-3xl">Order History </h1>
          <hr className="border-t border-gray-600" />
       
         {/* history */}


         {orderHistory.map((order) => {
  let isOrderDetailsDisplayed = false; // Flag to check if order details have been displayed

  return (
    <>
    <div className="md:flex justify-between  py-2 text-sm">
    <div className=" "> 
      {order.products.map((product) => (
        <div className=" py-2 text-sm ">
          <ul className="flex gap-2">
            <li>
              <img src={product.img} className="object-contain h-20 p-2 border rounded" />
            </li>
            <ul>
              <li className="font-semibold">{product.name}</li>
              <li className="italic">Sku: #NJC90842-{product.color}-{product.size} </li>
              <li>{product.qty} x ${product.price}.00</li>
            </ul>
          </ul>

        </div>
      ))}
</div> 
<ul className="md:pt-0 pt-3">
              <li className="font-semibold">Order: #{order.orderNumber} <span className="italic font-normal">{moment(order.createdAt).format("MMM D, YYYY")}</span></li>
              <li className="font-semibold">Total:${order.totalAmount}.00</li>
            </ul>
            </div>

      <hr className="border-t my-3"></hr>
    </>
  );
})}


          {/* <div className="md:flex justify-between py-4 text-sm">
<ul className="flex gap-2">
  <li>
    <img src="images/Kids_files/718-black.png" className="object-contain h-20 p-2 border rounded" />
  </li>
  <ul>
    <li className="font-semibold">Lite racer adapt 3.0 shoes</li>
    <li className="italic">Sku: #NJC90842-Blue-X </li>
    <li>1 x $823.00</li>
  </ul>
</ul>

<ul className="md:pt-0 pt-3">
  <li className="font-semibold">Order: #10194 <span className="italic font-normal">Dec 9, 2022</span></li>
  <li className="font-semibold">Total:$823.00</li>
</ul>
          </div>
          <hr className="border-t my-3"></hr> */}
          

           </div>
      
           <div className="md:col-span-4 col-span-12">
            <div className="flex items-end justify-between"> 
            <h1 className=" text-3xl ">Account Details</h1>
            <a className="text-blue-600 hover:cursor-pointer" onClick={handleLogout}>Logout</a>
            </div>

          <hr className="border-t border-gray-600" />
          
          <ul className="text-[15px]">

            <li className="flex gap-3">
            <svg class="w-3.5 h-6 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
  </svg>
  {user}
            </li>

            <li className="flex gap-2.5">
            <svg class="w-4 h-6 text-gray-700 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2"/>
  </svg>
  <h3>{email}</h3>
  

            </li>
          </ul>
          
         

  
           </div>
      
      
      </div>
      
      </div>

    
    }


 
    </>
  );
}

export default Login;
