import axios from "axios";
import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";

function NewAccount(){
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [password,setPassword]=useState('');
  const [error,setError]=useState({});
const navigate = useNavigate();
useEffect(()=>{
  if(email.length == 1){
    delete error.email
    }  if(name.length == 1){
      delete error.name
      }  if(password.length == 1){
          delete error.password
        }
},[email,name,password])

const api = axios.create({
  baseURL: 'https://e-commerce-backend-wpmd.onrender.com/users', // Replace with your server URL
  withCredentials: true, // Allow Axios to send cookies with requests
});


  const handleSubmit = async(e) =>{
    e.preventDefault();
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValidPassword = /^(.{6,})$/.test(password);
    const isValidEmail = emailRegex.test(email);
  const errors ={};
    if(!name){
      errors.name="This field canot be empty"
    }if(!isValidEmail){
      errors.email="Email is invalid"
    }if(!email){
      errors.email="This field canot be empty"
    }if(!isValidPassword){
      errors.password="At least 6 characters are required"
    }if(!password){
      errors.password="This field canot be empty"
    }

    if(Object.keys(errors).length > 0){
      setError(errors);
      return;
    }else{
      setError({})
    }

    try {

      const data = {name,email,password};
      
      const response = await api.post('/createUser',data);
if (response.status === 201) {
console.log(response.data);
console.log("New user created");
 setTimeout(()=>{
 navigate(-2);
},1500 ) 
 return;
}
    } catch (error) {
      if(error.response.status == 409){
        setTimeout(()=>{
          setError({invalid:"Email already existed"})
        },1200)
        console.log(error);
        return;
      }
    }
  }

  

    return(
        <>
         <header className="xl:container xl:mx-auto mx-6  mt-5 h-screen xl:px-16">
        <div className="list-none">
          <li className="text-sm"><Link to={'/home'} className="text-blue-600" >Home /</Link> Create an account </li>
        </div>


        <div className=" sm:flex text-gray-700  mt-10 justify-center items-center">
<form >
        <div className="grid gap-6 py-9  px-10 text-cente rounded shadow-3xl ">
<h1 className="md:text-4xl text-center text-3xl mb-5">Create A New Account</h1>

<lable className="w-full">
{error.invalid ?<span className="text-red-500 block text-sm text-start mb-2">{error.invalid} </span>:'' }  
<input type="text" value={name} onChange={(e)=>{setName(e.target.value)}} className="w-full rounded-md border md:w-96 border-gray-300 " placeholder="Full Name" /><br></br>
{error.name ?<span className={`text-red-500 text-sm text-start pt-1`}> <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">!</span> {error.name} </span>:''}
</lable>

<lable className="w-full">
<input type="email" value={email} onChange={(e)=>{setEmail(e.target.value)}}  className="rounded-md w-full border md:w-96 border-gray-300 " placeholder="Email" /><br></br>
{error.email?
  <span className={` text-red-500 text-sm text-start pt-1`}> <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">!</span> {error.email} </span>:''}
</lable>

<lable className="w-full">
<input type="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} className="rounded-md w-full border md:w-96 border-gray-300 " placeholder="Password" />
{error.password ? <span className={`text-red-500 block text-sm text-start pt-1`}> <span className="text-white text-xs bg-red-500 px-[6px] rounded-full ">!</span> {error.password} </span>:''}
</lable>

<label className="w-full text-center">
<hr className="border-t my-2"></hr>
<input type="submit" onClick={handleSubmit} className="cursor-pointer w-full bg-custom-gray py-2 text-white rounded-sm border border-gray-300 " value="SIGN IN" />
<h4 className="cursor-pointer mt-2 ">Already have an account?  <Link className="text-blue-600" to={'/login'}> Login</Link></h4>
</label>    
        </div>
        </form>

        </div>
        </header>
        </>
    )
}

export default NewAccount;