import { useEffect, useState ,useRef } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { addToCart } from "./redux/cartSlice";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

function SingleProduct(props) {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  //pop up initial state 
  const [popupProduct,setPopupProduct] = useState([]);

  const location = useLocation();
  // console.log(location, " useLocation Hook");
  const items = useSelector(state => state.cart.items)

  const { product, variant } = location.state;
  console.log("product--",product);

  const [selectedVariant, setSelectedVariant] = useState(product);
  const [category,setCategory]=useState(product.category)
  const [img,setImg]=useState(product.images[0])
  const [imgThumb,setImgThumb]=useState(product.images.slice(1))
  const [sizes,setSizes]=useState(product.sizes)
  const [size,setSize]=useState();
  const [sizeId,setSizeId]=useState('');
  const [color,setColor]=useState(product.color)
  const [qtyOfSize,setQtyOfSize]=useState(product.sizes.quantity)

  // console.log("Size: "+size);
  // console.log("Quantity: "+qtyOfSize);

  // console.log("Selected variant",selectedVariant._id);
  // const productToAddRef = useRef(null);

  const [errors,setErrors]=useState();

  const handleAddToCart = ()=>{
 console.log(size);
    if(!size){
      console.log("hi");
      // errors.variant="Please select variant options";
      setErrors("Please select variant options")
      return
    }else{
      setErrors(null)
    }

    const productToAdd = {
      _id:sizeId,
      img,
      name:selectedVariant.name,
      price:selectedVariant.price,
      qty,
      size,
      color
    }
    dispatch(addToCart(productToAdd))
    // productToAddRef.current = productToAdd;

    setPopupProduct([...popupProduct, productToAdd]);
    
    console.log("Product to add---------",productToAdd);
    console.log("Items in cart---------",JSON.stringify(items));

  }

    useEffect(()=>(console.log("Pop up ------", popupProduct)),[popupProduct])

  const handlePopupCrossBtn =(id)=>{
    const filteProducts = popupProduct.filter(p=>p._id !== id)
    setPopupProduct(filteProducts);

  }
  const handleContinueShopping = ()=>{
    setPopupProduct([]);
  }

//   console.log("Product---: " + JSON.stringify(product));
//   console.log("Product Variant ---:", variant);




  // try {

  //     const { product } = props.location.state;
  //     console.log(product);
  // } catch (error) {
  //     console.log(error);
  // }

  return (
    <>
      <div className="xl:container min-h-screen xl:mx-auto mx-6 mt-5 text-sm xl:px-16 pb-5">
        <div className="list-none py-2">
          <li className="text-sm">
            <Link to={"/home"} className="text-blue-600 ">
              {" "}
              Home
            </Link>{" "}
            /{" "}
            <Link to={`/${category}`} className="text-blue-600 ">
              {" "}
              {category}{" "}
            </Link>{" "}
            / {product.name}{" "}

            <div className=" fixed max-w-[350px] z-40 top-4  right-0    ">
            {
              popupProduct.map(product=>(

                <ul className="text-sm animate-fadeInRight border mb-3 bg-white p-4 shadow-md">
              <li className="flex items-center justify-between"><p>JUST ADDED TO YOUR CART</p> <input type="button" onClick={()=>handlePopupCrossBtn(product._id)} className="text-2xl me-2" value={'X'}></input> </li>
  <li className="flex">
  <img className="object-fit w-20" src={product.img}/>
  <p className="font-bold text-base">{product.name}</p>
  </li>
  <li>
    <Link to="/shoppingCart">
    <input type="button" className="border hover:cursor-pointer border-black w-full py-2 " value={'VIEW CART'}/>
      </Link>
  </li>
  <li className="underline mt-1.5 flex justify-center">
    <p onClick={handleContinueShopping} className=" hover:cursor-pointer" >Continue Shopping</p>
  </li>
                </ul>

              ))


            }
              


              

              
              
              </div>


          </li>
        </div>
        <div className="grid md:grid-cols-2 mt-5 grid-cols-1 gap-5">
          <div className="image ">
            <img
              className="bg-gray-100 w-full   object-cover"
              src={img}
            />
            {/* images/kids_files/691-black2.png */}

            <div className="thumbnails grid grid-cols-4 gap-3">
              {imgThumb.map((img) => (
                <img className="hover:cursor-pointer" onClick={()=>setImg(img)} src={img} />
              ))}

              {/* <img className="" src={product.images[2]}/> */}
              {/* <img className="" src="images/kids_files/691-white-thumb2.png"/> */}
            </div>
          </div>

          <div className="productDetails gap-3 h-max   grid text-gray-700 ">
            <h1 className="text-3xl">{product.name}</h1>
            <h4 className="text-xl ">${product.price}.00</h4>
            <h4 className="text-sm">
              Sku: NJC75206-{color}-{size}
            </h4>

            <input
              type="text"
              className="w-20 p-2.5 px-4 border border-grey-200 rounded-md"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              placeholder="Qty"
            />

            <span to="/shoppingCart">
              {" "}
              <input
                type="button"
                className={` w-full h-10 hover:bg-black hover:text-white rounded-sm hover:cursor-pointer border border-black`}
                value="ADD TO CART"
                onClick={handleAddToCart}
              />
            </span>

            {/* here arise a question down there we wont write difrerent sizes or color
 we will get every thing from data base how color size will be selected. 
 with id ? or something else

 want to know props
 */}
 
            <div className="sizes text-xs">
              {sizes.map((sizeObj) => (
                <input
                  className={`${
                    size == sizeObj.size ? "bg-teal-600 text-white" : ""
                  }   border hover:cursor-pointer me-2  p-2 px-3.5 rounded-sm`}
                  onClick={(e)=>(setSizeId(sizeObj._id),setSize(e.target.value),setQtyOfSize(sizeObj.quantity))}
                  type="button"
                  value={sizeObj.size}
                />
              ))}

              {/* <input className={`${btnClr ? 'bg-teal-600 text-white':''}   border selec me-2  p-2 px-3.5 rounded-sm`} onClick={BtnClr} type="button" value="S" />
<input className="border me-2 border-grey-700 p-2 px-3.5 rounded-sm" type="button" value="XL" /> */}
            </div>

            <div className="colors text-xs">
              {/* {product.map((prd)=>{
    <input className="border  me-2 border-grey-700 p-2 px-3.5 rounded-sm " type="button" value={prd.color} />


})} */}

{variant.map(v=>(
    <input
                className={`${v.color === selectedVariant.color ?'bg-teal-600 text-white' :''} hover:cursor-pointer border  me-2 border-grey-700 p-2 px-3.5 rounded-sm`}
                type="button"
                value={v.color}
                onClick={()=>(setColor(v.color),setSize(''),setImg(v.images[0]),setImgThumb(v.images.slice(1),setSelectedVariant(v)),setSizes(v.sizes) )}
              />

))}
              {/* <input
                className="border  me-2 border-grey-700 p-2 px-3.5 rounded-sm "
                type="button"
                value={product.color}
              /> */}
              {/* <input  className="border  me-2 border-grey-700 p-2 px-3.5 rounded-sm"  type="button" value="WHITE" /> */}
            </div>

            <p className={`text-pink-600`}>{errors} </p>

            <div className="discription">
              <p>{product.description}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;
