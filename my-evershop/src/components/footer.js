function Footer(){
    return(

        <footer className="bg-gray-100" >
        <div className="contain p-[20px]  border-t border-gray-200  text-sm sticky ">  
        <div className="grid  grid-cols-12  pt-2 text-gray-500 px-10 md:px-52">
            <div className="col-span-6 list-none">
        <li className="pb-3 font-medium">FOLLOW US</li>
        <li><a className="hover:underline" href="https://github.com/LADDi008">Github</a></li>
        <li><a className="hover:underline" href="https://www.linkedin.com/in/gurjit-singh-27958924a/">LinkedIn</a></li>
        <li><Link to="/admin">Admin</Link></li>
       
            </div>

            <div className="col-span-6  list-none">
            <li className="pb-3 font-medium">CONTACT</li>
        <li>New York, NY 10012,US</li>
        <li>gurjit758.232@gmail.com</li>
        <li>88720088</li>
            </div>



        </div>

    
        </div>
        <hr className="border-t border-gray-300  mx-3"></hr>

<div className="flex justify-center   text-gray-500 py-3">

© 2023. All Rights Reserved 
</div>
  




        </footer>
    )
}

export default Footer;