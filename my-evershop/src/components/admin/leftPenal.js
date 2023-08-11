import { Link } from "react-router-dom";
function LeftPenal() {
  return (
    <>
    {/* bg-gray-100 sm:min-h-screen hidden h-[200vh] z-0  w-full borde border-red-500 fixed top-[70px] pt-5 */}
    <div className="col-span-2 h-screen md:w-[18vw] w-[27vw] pt-5 shadow-lg rounded-lg bg-white fixed">    
      <div className="grid grid-cols-12">
        <div className=" col-span-12  grid gap-3 ps-4  text-gray-800">
          <ul className="grid gap-4 text-sm">
            <li className="text-xs font-medium">QUICK LINKS</li>
          </ul>
          <ul className="grid gap-4 text-sm ps-3">
            <li className="flex items-center gap-2 font-semibold">
              <svg
                class="w-4 h-3 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="black"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Dashboard
            </li>

            <li className="flex items-center gap-2 font-semibold">
            <svg  className="h-4 w-4" fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  aria-hidden="true"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
           <Link to="/admin/">New Product</Link> 
            </li>
          </ul>

          <ul className="grid gap-4 text-sm">
            <li className="text-xs font-medium">CATALOG</li>
          </ul>
          <ul className="grid gap-4 text-sm ps-3">
            <li className="flex items-center gap-2 font-semibold">
            <svg  className="h-4 w-4" fill="black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"  aria-hidden="true"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z"></path><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>

              <Link to="/admin/productsControl">Products</Link>
            </li>
          </ul>


          <ul className="grid gap-4 text-sm">
            <li className="text-xs font-medium">SALE</li>
          </ul>
          <ul className="grid gap-4 text-sm ps-3">
            <li className="flex items-center gap-2 font-semibold">
            <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="black" aria-hidden="true"><path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z"></path></svg>
             <Link to={'/admin/orders'}>Orders </Link> 
            </li>
          </ul>

          <ul className="grid gap-4 text-sm">
            <li className="text-xs font-medium">CUSTOMER</li>
          </ul>
          <ul className="grid gap-4 text-sm ps-3">
            <li className="flex items-center gap-2 font-semibold">
            <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 20 18">
    <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
  </svg>
  <Link to={"/admin/usersControl"}>
              Customers
              </Link>
            </li>
          </ul>
<ul className="grid gap-4 text-xs ps-3 fixed bottom-4 ">
  <li className="flex items-center gap-2 font-semibold">
  <svg class="w-4 h-4 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 20 20">
    <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z"/>
  </svg>
    SETTING
  </li>
</ul>
        </div>
      </div>
      </div>
    </>
  );
}
export default LeftPenal;
