import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function ProductsControl() {
  const [sizesIds, setSizesIds] = useState([]);
  const [productIds, setProductIds] = useState([]);
  const [variantProducts, setVariantProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProducts,setSelectedProducts] =useState(null);
  const [productName, setProductName] = useState('');
  const [maxPrice, setMaxPrice] = useState(null);
  const [minPrice, setMinPrice] = useState(null);
  const [productSku, setProductSku] = useState('');
  const [productQty, setProductQty] = useState('');
  const [productStatus, setProductStatus] = useState(null);

  const [checkes,setCheckes]=useState(null);

  const[showDisable,setShowDisable]=useState(false);
  const[showEnable,setShowEnable]=useState(false);
  const[showDelete,setShowDelete]=useState(false);



  const api = axios.create({
    baseURL: "https://e-commerce2-backend.onrender.com/products",
    // withCredentials:true
  });

  const getProducts = async () => {
    try {
      const response = await api.get("/AllProduct");
      console.log(response.data);
      const allProducts = response.data;
      const allVariants = allProducts.flatMap((product) =>
        product.sizes.map((size) => ({
          id: product._id,
          _size_id: size._id,
          name: product.name,
          image: product.images[1],
          quantity: size.quantity,
          color: product.color,
          price: product.price,
          size: size.size,
          status:product.enable,
          sku:`NJC44203-${product.color}-${size.size}`
        }))
      );
      console.log("allVariants----", allVariants);
      if (response.status == 200) {
        console.log("allVariants----", allVariants);



        setVariantProducts(allVariants);
        // setProducts(response.data);
        console.log(response.data);
        console.log(response.status);
      }
    } catch (error) {
      console.log(error.response);
      console.log(error);
    }
  };
  useEffect(() => {getProducts()}, []);


  const filteringProducts =()=>{

    let productFilterByName =[];
    if(productName){
      const lowerCaseProductName = productName.toLowerCase(); // Convert to lowercase for case-insensitive search

      productFilterByName = variantProducts.filter((prd) =>
        prd.name.toLowerCase().startsWith(lowerCaseProductName)
      );

    }else{
        productFilterByName=variantProducts;
    }
    console.log("productFilterByName",productFilterByName);

    let productFilterByPrice =[];
    if(minPrice || maxPrice){
        productFilterByPrice = productFilterByName.filter(prd=> (prd.price <= maxPrice && prd.price >= minPrice));

    }else{
        productFilterByPrice=productFilterByName;
    }
console.log("productFilterByPrice",productFilterByPrice);
    let productFilterBySku =[];
    if(productSku){
        productFilterBySku = productFilterByPrice.filter(prd=> prd.sku == productSku);

    }else{
        productFilterBySku=productFilterByPrice;
    }
    console.log('productFilterBySku',productFilterBySku);

    let productFilterByQty =[];
    if(productQty){
        productFilterByQty = productFilterBySku.filter(prd=> String(prd.quantity).startsWith(String(productQty))  );

    }else{
        productFilterByQty=productFilterBySku;
    }
    console.log("productFilterByQty",productFilterByQty);

    let productFilterByStatus =[];
    if(productStatus){
        productFilterByStatus = productFilterByQty.filter(prd=> String(prd.status) == productStatus);
        // productFilterByStatus = productFilterByQty.map(prd=>  prd.status == Boolean(productStatus));
console.log("productFilterByStatus",productFilterByStatus);
    }else{
        productFilterByStatus=productFilterByQty;
    }
    

    setFilteredProducts(productFilterByStatus);
    setCheckes(null);
    setSelectedProducts(null)

  }

  console.log("filtere Products",filteredProducts);
  useEffect(filteringProducts,[variantProducts,productName,maxPrice,minPrice,productSku,productQty,productStatus])

//   console.log("productStatus----",productStatus);

  const handleDeleteProducts = async()=>{

    try {
        // const data = JSON.stringify(sizesId);
        // console.log("data--",data);
        console.log(sizesIds);
        console.log(productIds);
        const data ={
            SizeIds:sizesIds,
            ProductIds:productIds
        }
        console.log(data);
        // return;
    const response =await api.patch('/deleteProducts',data);
    console.log(response.data);
    setTimeout(()=>
        (getProducts(),setShowDelete(false)),1000

        )
        setCheckes(false);
        setSelectedProducts(null);
        setProductIds([]);
        setSizesIds([]);
        
    } catch (error) {
        console.log(error.response);
        
    }
  }

  const handleEnable=async()=>{

    try {

        const response = await api.patch('/enableProducts',productIds);
        console.log(response);

        setTimeout(()=>(
          getProducts(),setShowEnable(false)
        )
        ,1000

        )
        setCheckes(false);
        setSelectedProducts(null);
        setProductIds([]);
        setSizesIds([]);
        
    } catch (error) {
        console.log(error.response);
        
    }

  }

  const handleDisable=async()=>{

    try {

        const response = await api.patch('/disableProducts',productIds);
        console.log(response);
        setTimeout(()=>
            (getProducts(),setShowDisable(false)),2000
    
            )
          setCheckes(false);
          setSelectedProducts(null)
          setProductIds([]);
          setSizesIds([]);
        
    } catch (error) {
        console.log(error.response);
        
    }

  }

  const handleCheckBox = (event,prd)=>{
    
    const checked = event.target.checked;
    // console.log(prd.id);

    checked ?  setSizesIds([...sizesIds,prd._size_id])  : setSizesIds(()=>sizesIds.filter(Id=> Id !==prd._size_id));  
    checked ?  setProductIds([...productIds,prd.id]) :  setProductIds(()=>productIds.filter(Id=> Id !==prd.id)); 

    const productsCount = productIds.length;
    // checked ?  setSizesIds([...sizesIds,prd._size_id])  : setSizesIds(()=>sizesIds.filter(Id=> Id !==prd._size_id));  
    checked ?  setSelectedProducts(selectedProducts+1) :  setSelectedProducts(selectedProducts-1); 

  }

//   useEffect(productIds,)
//   console.log(sizesId);

//   useEffect(()=>console.log(sizesIds),[sizesIds])
  return (
    <>
{showDisable ?
  <div className="z-40 backdrop-blur-s bg-gray-500 bg-opacity-50   top-0 flex items-center justify-center fixed h-full w-full">
<div className="bg-white rounded-md w-[50vw] grid p-5 h-[30vh]">
  <ul className="flex justify-between ">
    <li className="font-semibold">Disable {selectedProducts} products</li>
    <li className="text-xl cursor-pointer"><a onClick={()=>setShowDisable(false)}>X</a></li>
  </ul>
  <ul>
    <li className="text-sm pt-5" >Are you sure?<br/>It will disable its other size too</li>
  </ul>
  <ul>
    <li>
      <hr className="border-t"/>
    </li>
  </ul>
  <ul className="flex justify-end pt-5 ">
    <li className="flex gap-2  ">
      <input type="button" onClick={()=>setShowDisable(false)} className="bg-custom-green cursor-pointer px-2  rounded text-white" value={'Cancle'}/>
      <input type="button" onClick={handleDisable} className="bg-red-600 rounded px-2 cursor-pointer text-white" value={'Disable'}/>
    </li>
  </ul>

</div>
  </div>:''

}

{showEnable ?
  <div className="z-40 backdrop-blur-s bg-gray-500 bg-opacity-50   top-0 flex items-center justify-center fixed h-full w-full">
<div className="bg-white rounded-md w-[50vw] grid p-5 h-[30vh]">
  <ul className="flex justify-between ">
    <li className="font-semibold">Enable {selectedProducts} products</li>
    <li className="text-xl cursor-pointer"><a onClick={()=>setShowEnable(false)}>X</a></li>
  </ul>
  <ul>
    <li className="text-sm pt-5" >Are you sure?<br/>It will enable its other size too</li>
  </ul>
  <ul>
    <li>
      <hr className="border-t"/>
    </li>
  </ul>
  <ul className="flex justify-end pt-5 ">
    <li className="flex gap-2  ">
      <input type="button" onClick={()=>setShowEnable(false)} className="bg-custom-green cursor-pointer px-2  rounded text-white" value={'Cancle'}/>
      <input type="button" onClick={handleEnable} className="bg-red-600 rounded px-2 cursor-pointer text-white" value={'Enable'}/>
    </li>
  </ul>

</div>
  </div>:''

}

{showDelete ?
  <div className="z-40 backdrop-blur-s bg-gray-500 bg-opacity-50   top-0 flex items-center justify-center fixed h-full w-full">
<div className="bg-white rounded-md w-[50vw] grid p-5 h-[30vh]">
  <ul className="flex justify-between ">
    <li className="font-semibold">Delete {selectedProducts} products</li>
    <li className="text-xl cursor-pointer"><a onClick={()=>setShowDelete(false)}>X</a></li>
  </ul>
  <ul>
    <li className="text-sm pt-5" >Are you sure?<br/>It will only delete its selected size </li>
  </ul>
  <ul>
    <li>
      <hr className="border-t"/>
    </li>
  </ul>
  <ul className="flex justify-end pt-5 ">
    <li className="flex gap-2  ">
      <input type="button" onClick={()=>setShowDelete(false)} className="bg-custom-green cursor-pointer px-2  rounded text-white" value={'Cancle'}/>
      <input type="button" onClick={handleDeleteProducts} className="bg-red-600 rounded px-2 cursor-pointer text-white" value={'Delete'}/>
    </li>
  </ul>

</div>
  </div>:''

}


      <div className="gap-3 p-4 col-span-12   px-6 sm:ps-[30vw]  md:ps-[20vw]">
        <div className="flex justify-between pb-4 items-center font-semibold">
          <h1 className="text-xl">Products</h1>
          <Link to="/admin"> 
          <input
            type="button"
            className="bg-custom-green p-2 cursor-pointer text-sm text-white rounded"
            value={"New Product"}
          /></Link>
        </div>
      

        <div className="grid grid-cols-12 py-3 bg-white shadow-lg rounded-lg">
          <div className="col-span-12">
            <div className="grid grid-cols-12 gap-3 items-end p-2  px-3">
              <ul className="col-span-1">
                <li>
                  <input
                    type="checkbox"
                    className="border-2 border-gray-300 rounded focus:ring-transparent"
                  />
                </li>
              </ul>

              <ul className="col-span-2">
                <li>
                  <label className="font-semibold">Product Name</label>
                </li>
                <li>
                  <input
                    type="text"
                    value={productName}
                    onChange={e=>setProductName(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="Product Name"
                  />
                </li>
              </ul>

              <ul className="col-span-2">
                <li>
                  <label className="font-semibold">Price</label>
                </li>
                <li className="flex gap-2">
                  <input
                    type="text"
                    value={minPrice}
                    onChange={e=>setMinPrice(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="From"
                  />
                  <input
                    type="text"
                    value={maxPrice}
                    onChange={e=>setMaxPrice(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="To"
                  />
                </li>
              </ul>

              <ul className="col-span-2">
                <li>
                  <lable className="font-semibold">SKU</lable>
                </li>
                <li>
                  <input
                    type="text"
                    value={productSku}
                    onChange={e=>setProductSku(e.target.value)}
                    className="rounded w-full text-sm border border-gray-300"
                    placeholder="SKU"
                  />
                </li>
              </ul>

              <ul className="col-span-2">
                <label className="font-semibold">Qty</label>
                <input
                  type="text"
                  value={productQty}
                  onChange={e=>setProductQty(e.target.value)}
                  className="rounded w-full text-sm border border-gray-300"
                  placeholder="Qty"
                />
              </ul>

              <ul className="col-span-2">
                <li>
                  <lable className="font-semibold">Status</lable>
                </li>
                <li>
                  <select onChange={e=>setProductStatus(e.target.value)} className="text-sm border rounded w-full border-gray-300">
                    <option value={''} selected disabled>
                      {" "}
                      Please Select{" "}
                    </option>
                    <option value={''}> All</option>
                    <option value={'true'}> Enabled </option>
                    <option value={'false'}> Disabled </option>
                  </select>
                </li>
              </ul>
            </div>

            {/* visible when any product selected */}
{selectedProducts ? 
  <div className="grid grid-cols-12">
  <ul className="flex text-sm col-span-12 py-5 font-semibold px-3 text-gray-800">
    <li className="border border-gray-300 rounded-s p-1.5 ">
      {selectedProducts} selected
    </li>
    <li className="border border-gray-300  p-2 cursor-pointer" onClick={()=>setShowDisable(true)}>Disable</li>
    <li className="border border-gray-300  p-2 cursor-pointer" onClick={()=>setShowEnable(true)}>Enable</li>
    <li className="border border-gray-300 rounded-e p-2 cursor-pointer" onClick={()=>setShowDelete(true)}> Delete</li>
  </ul>
</div>:''
}
          

            {/*------------------- all products  */}
            {filteredProducts.map((prd) => (
              <>
                <hr className="border-t my-4  pt-" />

                <div className="grid grid-cols-12  items-center gap-2 px-3">
                  <ul className="col-span-1  flex items-center justify-between">
                    <input
                      type="checkbox"
                      checked={checkes}
                      onClick={(e)=>handleCheckBox(e,prd) }
                      className="border-2 border-gray-300 rounded focus:ring-transparent"
                    />

                    <li>
                      <img
                      loading="lazy"
                      
                        src={prd.image}
                        className="border rounded object-contain p-1 pt-2.5 h-[56px] w-[56px] "
                      />
                    </li>
                  </ul>

                  <ul className="col-span-2 text-sm">
                    <li className=" font-semibold">{prd.name}</li>
                  </ul>

                  <ul className="col-span-2 text-sm">
                    <li>${prd.price}.00</li>
                  </ul>

                  <ul className="col-span-2 ps-1 text-sm">
                    <li>
                      {prd.sku}
                    </li>
                  </ul>

                  <ul className="col-span-2 text-sm ps-2">
                    <li>{prd.quantity}</li>
                  </ul>

                  <ul className="col-span-2 flex justify-center">
                    <li className={ `${prd.status ? 'bg-green-400':'bg-green-200' }  rounded-full p-1.5`}></li>
                  </ul>
                </div>
              </>
            ))}
          </div>
        </div>

      </div>

      {/* </div> */}
    </>
  );
}

export default ProductsControl;
