import { useEffect, useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
function Header(){
const [showLogout,setShowLogout]=useState(false);
const navigate = useNavigate();
const [login,setLogin]=useState(false)

const handleLogout=()=>{
  localStorage.removeItem('adminLogin')
  setLogin(false)
  console.log("logout");
}

useEffect(()=>{
  const isLogin =localStorage.getItem("adminLogin")
  if(!isLogin){
    navigate("/admin/login");
    setLogin(false)
  }else{
    setLogin(true)

  }
},[login])



if (!login) {
  // You can render a loading state or spinner while the data is being fetched
  return (<div className="h-screen  border border-red-500  z-70 w-screen text-4xl">Loading...</div>)
}

const handleClick=()=>{
  setShowLogout(showLogout=>!showLogout);
  localStorage.removeItem('adminLogin');

}








    return(
        <>
              <nav className="w-full fixed top-0 bg-white z-30 ">
        <div className="grid grid-cols-12 shadow-lg    items-center py-4 md:px-9 px-2 ">
          <div className="logo flex gap-1 items-center md:col-span-4 col-span-5  ">
           <Link to="/user/home">
            <img
              class="object-contain filter brightness-0 grayscale  h-8"
              src={"https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691444780/product_images/logo_s7wdrl.png"} alt="logo"
            />
            </Link>

            <p className="mt-2  text-base font-bold  ">NOWSHOPE</p>
          </div>

          <div className="logo col-span-5 gap-5 justify-center fle  ">
        
        <div className=" flex bg-gray-100 focus-within:outline outline-1 items-center">

<svg class="w-7 h-4 flex-shrink-0  text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="black" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
  </svg>

<input
  type="text"
  className="focus:border-transparent bg-transparent peer border-none focus:ring-0"
  placeholder="Search"
/>

</div>

        
          </div>

          <div className="relative  flex gap-3 md:col-span-3 col-span-2 justify-self-end " id="Log">
          <div className="relative cursor-pointer borde p-[17px] bg-gray-500 ring-4  flex justify-center items-center rounded-full" onClick={handleClick}>
<span className="absolute  text-white font-medium">G</span>
          </div>

          <span className={`${ showLogout ?`visible`:'hidden'} bg-white  absolute right-0 p-3 top-12 shadow-md w-[20vw]  `}> 
<ul className="text-sm grid gap-2">
  <li>Hello Gurjit!</li>
  <li className="text-red-500"><a className="cursor-pointer" onClick={handleLogout}>Logout</a></li>
</ul>
          </span>

          </div>
        </div>
      </nav>
        </>
    )

}

export default Header;