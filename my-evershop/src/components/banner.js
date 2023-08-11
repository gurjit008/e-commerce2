function Banner() {
  return (
    <>
      <div className="grid grid-cols-12 ">
        <div className="col-span-12  ">
    <div className="bg-banner bg-cover  bg-left bg-no-repeat" style={{height:"70vh"}}> 
    <div style={{height:"70vh"}} className=" banner-text grid  items-center grid-cols-12 md:pe-20 px-5 md:text-start text-center  ">
        <div className="col-span-7 md:block hidden "></div>
        <div className="md:col-span-5 col-span-12 text-gray-700 flex-wrap w-50 "> 
        <h1 className="md:text-6xl text-3xl">Discount 20% For All Orders Over $2000</h1>    
        <h5 className="text-xs">Use coupon DISCOUNT20</h5>    
        </div>

    </div>
    </div>
        </div>
      </div>
    </>
  );
}
export default Banner;
