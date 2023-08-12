import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


function AdminLogin() {


  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
const [error,setError]=useState({});
const [invalidId,setInvalId]=useState('');

const navigate =useNavigate();


  const handleSubmit = async(e) =>{
    e.preventDefault();
    // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // const isValidPassword = /^(.{6,})$/.test(password);
    // const isValidEmail = emailRegex.test(email);


  const errors={};
  setInvalId();

    if(!email){
      errors.email="This field canot be empty";
    }
    if(!password){
      errors.password="This field canot be empty";
    }
    if(Object.keys(errors).length > 0 ){
      setError(errors);
      console.log(errors);
      return;
    }
    const adminEmail ='admin@gmail.com';
    const adminPassword = '123456';

    if(email == adminEmail && password == adminPassword){
      localStorage.setItem('adminLogin',email);
        // getlocalStorage()
        navigate("/admin")
    }else{
        setInvalId("Invalid Email or Password")

    }

   
    

  }


 


   


  return (
    <>
 
    
    <div className="xl:container xl:mx-auto mx-6   xl:px-16 min-h-screen">
    {/* <div className="list-none">
      <li className="text-sm">
        <Link to={"/home"} className="text-blue-600">
          Home {''}
        </Link>
        / {location}
      </li>
    </div> */}

    <div className=" md:flex  md:p-0 pt-40 text-gray-700   justify-center items-center min-h-screen ">
      <form>
      <div className="grid pb-10  px-10 text-center rounded-sm shadow-3xl ">
        <span className="flex justify-center py-7">
       <Link to={"/admin"}> <img
              class="object-contain  brightness-[1] grayscale  h-12"
              src="https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691444780/product_images/logo_s7wdrl.png" alt=""
            /></Link>
        </span>
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

      </div>
      </form>
    </div>


  </div>


 
    </>
  );
}

export default AdminLogin;
