import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart } from "./redux/cartSlice";
import { useState,useEffect } from "react";

function ShoppingCart() {
const dispatch= useDispatch();
const [prdInCart,setPrdsInCart]=useState(false);
    const cartItems = useSelector(state => state.cart.items);
    console.log("cart items-----",JSON.stringify(cartItems));

const [subTotal,setSubTotal]=useState();
// const prices = [];
const totalPrices = cartItems.map((item)=> item.price*item.qty);
useEffect(()=>{
if(totalPrices.length > 0){
setSubTotal(totalPrices.reduce((total,num)=> total+num));
}else{
  setSubTotal(null)
}

},[totalPrices])


    const objKeys =Object.keys(cartItems).length;

    // useEffect
    useEffect(() => {
      if (objKeys === 0) {
        setPrdsInCart(false);
      } else {
        setPrdsInCart(true);
      }
    }, [objKeys]);
    console.log(prdInCart);


  return (
    <>
      <header className="xl:container xl:mx-auto mx-6 mt-5 xl:px-16  min-h-screen ">
        <div className="list-none">
          <li className="text-sm"><Link to={'/home'} className="text-blue-600" > Home </Link> / Shopping Cart </li>
        </div>


        <div className={` ${prdInCart ? 'block':'hidden' } my-10 grid grid-cols-12  gap-5 hidde text-gray-700 `}>

          <div className="Product md:col-span-9 col-span-12 text-sm  ">
            <div className="grid grid-cols-12  md:gap-9 ">
              <div className="md:col-span-6 col-span-10 ">PRODUCT</div>
              <div className="col-span-2 text-end ">PRICE</div>
              <div className="md:block hidden col-span-2">QUANTITY</div>
              <div className="md:block hidden col-span-2">TOTAL</div>
            </div>

            <hr className=" border-gray-300 border-t mt-3"></hr>

            {cartItems.map(item=>(
<>
<div className="grid grid-cols-12 items-center py-3 md:gap-9">

<div className="md:col-span-6 col-span-10 flex ">
  <div className="product-Image">
    <img className="h-28 sm:object-fit object-contain "  src={item.img} />
  </div>
  <div className="product-detail ">
    <h1 className="font-bold">
      {item.name}
    </h1>
    <h4 className="mt-2" >Color: {item.color}</h4>
    <h4 className="mb-2">Size: {item.size}</h4>
    <h4 className="underline cursor-pointer" onClick={()=>dispatch(removeFromCart(item._id))}>Remove</h4>
  </div>
</div>

<div className="col-span-2   text-right">${item.price}.00 <span className="md:hidden  block">Qty{item.qty}</span> </div>
<div className="md:block hidden col-span-2">{item.qty}</div>
<div className="md:block hidden col-span-2 total">${item.price * item.qty}.00</div>

</div>
<hr className=" border-gray-300 border-t mt-3"></hr>
</>

))

}

         


            {/* <hr className=" border-gray-300 border-t mt-3"></hr> */}

            {/* <div className="grid grid-cols-12 items-center py-3 md:gap-9">

              <div className="md:col-span-6 col-span-10 flex ">
                <div className="product-Image">
                  <img src="images/kids_files/691-white-thumb2.png" />
                </div>
                <div className="product-detail ">
                  <h1 className="font-bold">
                    Canvas platform chuck taylor all star
                  </h1>
                  <h4 className="mt-2" >Color: White</h4>
                  <h4 className="mb-2">Size: XL</h4>
                  <h4 className="underline cursor-pointer">Remove</h4>
                </div>
              </div>

              <div className="col-span-2   text-right">$691.00 <span className="md:hidden  block">Qty1</span> </div>
              <div className="md:block hidden col-span-2">1</div>
              <div className="md:block hidden col-span-2">$691.00</div>

            </div>



            <hr className=" border-gray-300 border-t mt-3"></hr> */}
{/* 
            <div className="grid grid-cols-12 items-center py-3 md:gap-9">

              <div className="md:col-span-6 col-span-10 flex ">
                <div className="product-Image">
                  <img src="images/kids_files/691-white-thumb2.png" />
                </div>
                <div className="product-detail ">
                  <h1 className="font-bold">
                    Canvas platform chuck taylor all star
                  </h1>
                  <h4 className="mt-2" >Color: White</h4>
                  <h4 className="mb-2">Size: XL</h4>
                  <h4 className="underline cursor-pointer">Remove</h4>
                </div>
              </div>

              <div className="col-span-2   text-right">$691.00 <span className="md:hidden  block">Qty1</span> </div>
              <div className="md:block hidden col-span-2">1</div>
              <div className="md:block hidden col-span-2">$691.00</div>

            </div>
            <hr className=" border-gray-300 border-t mt-3"></hr>

    

<div className="grid grid-cols-12 items-center py-3 md:gap-9">

  <div className="md:col-span-6 col-span-10 flex ">
    <div className="product-Image">
      <img src="images/kids_files/691-white-thumb2.png" />
    </div>
    <div className="product-detail ">
      <h1 className="font-bold">
        Canvas platform chuck taylor all star
      </h1>
      <h4 className="mt-2" >Color: White</h4>
      <h4 className="mb-2">Size: XL</h4>
      <h4 className="underline cursor-pointer">Remove</h4>
    </div>
  </div>

  <div className="col-span-2   text-right">$691.00 <span className="md:hidden  block">Qty1</span> </div>
  <div className="md:block hidden col-span-2">1</div>
  <div className="md:block hidden col-span-2">$691.00</div>

</div>
<hr className=" border-gray-300 border-t mt-3"></hr>

            <div className="grid grid-cols-12 items-center py-3 md:gap-9">

              <div className="md:col-span-6 col-span-10 flex ">
                <div className="product-Image">
                  <img src="images/kids_files/691-white-thumb2.png" />
                </div>
                <div className="product-detail ">
                  <h1 className="font-bold">
                    Canvas platform chuck taylor all star
                  </h1>
                  <h4 className="mt-2" >Color: White</h4>
                  <h4 className="mb-2">Size: XL</h4>
                  <h4 className="underline cursor-pointer">Remove</h4>
                </div>
              </div>

              <div className="col-span-2   text-right">$691.00 <span className="md:hidden  block">Qty1</span> </div>
              <div className="md:block hidden col-span-2">1</div>
              <div className="md:block hidden col-span-2">$691.00</div>

            </div>
            <hr className=" border-gray-300 border-t mt-3"></hr> */}



          </div>

          <div className="md:col-span-3 col-span-12 grid gap-4 h-48 text-sm">

            <h2 className="text-xl ">Order summary</h2>

            <div className="sub-total flex justify-between"> 
            <h4>Sub total</h4>
            <h4>${subTotal}.00</h4>
            </div>

            <h4 className="italic text-base">Taxes and shipping calculated at checkout</h4>

<Link to={"/checkout"} state={subTotal}> <input className="border hover:bg-custom-green bg-custom-gray cursor-pointer py-2.5 rounded-sm text-white w-28" type="button" value="CHECKOUT"/></Link>
          </div>


          
          
        </div>


        {/* -----------------------------Visible when Shopping cart is empty------------------ */}

<div className={` ${prdInCart? 'hidden':'block' } grid text-gray-800 text-center  justify-center items-center h-[50vh]`}>
<div className="grid gap-3  ">
  <h1 className="text-4xl">Shopping cart</h1>
  <h4>Your cart is empty!</h4>
  
  <Link to={'/home'}> <input type="button" value={"CONTINUE SHOPPING -->"} className=" p-3 text-gray-100 hover:bg-custom-green rounded-sm bg-custom-gray"/></Link>
  </div>

</div>



      </header>
    </>
  );
}
export default ShoppingCart;
