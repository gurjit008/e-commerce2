import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import MultiRangeSlider from "./multiRangeSlider/MultiRangeSlider";
import { useLocation } from "react-router-dom";
import axios from "axios";
import SearchHeader from "./searchHeader";
import { useNavigate } from "react-router-dom";


function Search(){
    // props
    // const Products = props.Products.products;
    // console.log("Products : "+JSON.stringify(Products));

    //event listener for adjustment button for mobile user


const [prds, setPrds] = useState([]);
const [allPrds, setAllPrds] = useState([]);
const [filterPrds, setFilterPrds] = useState([]);
const [showAdjustment,setShowAdjustment]=useState(true);
const [arrow,setAerrow]=useState(true);

// state for filtring product 
const [range,setRange] = useState({min:0,max:1000});
const [brands,setBrands]=useState([]);
const [colors,setColors]=useState([]);
const [sizes,setSizes]=useState([]);

const [sortingType,setSortingtype] = useState('');
const [searchResult,setSearchResult]= useState([]);
const state=useLocation().state;
const navigate =useNavigate();

console.log("state-",state);
useEffect(()=>{
  if(state.searchResult){
    setSearchResult(state.searchResult)
    }else{
      navigate("/");
      return;
    }

},[state])




// const {searchResult,query}=state;
// const navigate =useNavigate();
if(!searchResult){
    navigate("/");

}else{
    // setPrds(state)

}


console.log("state---",state);
console.log("state---",searchResult);

// product pre page
const productPerpage = 12;
const [productOnPage,setProductOnPage] =useState({start:0,end:productPerpage});
const [pageCount,setPagecount]=useState(0)
console.log("product per page",productOnPage);


const changeArrow = ()=>{
setAerrow((preArrow)=> !preArrow);
}

const handleCLick=()=>{
    setShowAdjustment((preAdjustment)=>!preAdjustment );
    console.log("shi");
}




const getProducts = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/products/AllProduct`);
        // setting page count base on all products
        setAllPrds(response.data);
    setPagecount(()=>Math.ceil(prds.length / productPerpage));


    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    getProducts();
  }, []);

  console.log(!searchResult);

  useEffect(()=>{

  if(searchResult){
    setPrds(searchResult)

  }}

,[searchResult])


const filterProducts=()=>{

          // Filter by price range
          const filteredByPrice = prds.filter(
            (prd) => +prd.price >= range.min && +prd.price <= range.max
          );
      
          // Filter by selected brands
          let filteredByBrands = [];
          if (brands.length > 0) {
            filteredByBrands = filteredByPrice.filter((prd) => brands.includes(prd.brand));
          } else {
            filteredByBrands = filteredByPrice;
          }
    
             // Filter by selected colors
             let filteredByColors = [];
             if (colors.length > 0) {
               filteredByColors = filteredByBrands.filter((prd) => colors.includes(prd.color));
            console.log("Filter By colors Prd---",filteredByColors); 
            } else {
               filteredByColors = filteredByBrands;
             }
    
             // Filter by selected sizes
             let filteredBySizes = [];
             if (sizes.length > 0) {
               filteredBySizes = filteredByColors.filter((prd) =>
                 prd.sizes.some((sizeObj) => sizes.includes(sizeObj.size))
               );
               console.log("Filtered By sizes Prd---", filteredBySizes);
             } else {
               filteredBySizes = filteredByColors;
             }
      
          // Update the state with the filtered products
          setFilterPrds(filteredBySizes);
        //   console.log(prds);
    
    // handle sorting by name and size
        switch (sortingType) {
            case 'name':
                const prdsSortedByName = [...filteredBySizes].sort((a,b)=>
                arrow ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
                )
                setFilterPrds(prdsSortedByName) ;     
                break;
    
            case 'price':
                const prdsSortedByPrice = [...filteredBySizes].sort((a,b)=>
                arrow ? a.price - b.price : b.price - a.price
                )
                setFilterPrds(prdsSortedByPrice);    
                break;
        
            default:
                setFilterPrds(filteredBySizes);
                break;
        }
    
}


  useEffect(() => {
    filterProducts();
  }, [prds, range, brands,colors,sizes,arrow,sortingType]);

  useEffect(()=>{
    setPagecount(()=>Math.ceil(filterPrds.length / productPerpage));
  
  },[filterPrds])



// handling changing checkbox 
const handleChackboxChange = (event,type)=>{
    const value = event.target.value;
    const checked = event.target.checked;

    switch (type) {
        case 'brand':
            setBrands( brands => (checked ? [...brands,value]: brands.filter(items => items !== value)))
            // console.log("type");
            // console.log("value",value);
            break;

        case 'color':
            setColors( colors => (checked ? [...colors,value]: colors.filter(items => items !== value)))
            console.log("type",type);
            console.log("value",value);
            console.log("colors",colors);
        
            break;

         case 'size':
            setSizes( sizes => (checked ? [...sizes,value]: sizes.filter(items => items !== value)))
            // console.log("type",type);
            // console.log("value",value);
            // console.log("Sizes",sizes);
            break;
    
        default:
            break;
    }
    // console.log("brands--- ",brands);
    // console.log("checked--- ",checked);
}

// handle sorting
// const handleSorting = ()=>{
//     console.log("hi-------");
//     switch (sortingType) {
//         case 'name':
//             const prdsSortedByName = [...prds].sort((a,b)=>
//             arrow ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
//             )
//             setPrds(prdsSortedByName) ;
//             console.log("name--------");           
//             break;

//         case 'price':
//             const prdsSortedByPrice = [...prds].sort((a,b)=>
//             arrow ? a.price - b.price : b.price - a.price
//             )
//             setPrds(prdsSortedByPrice);    
            
//             break;
    
//         default:
//             break;
//     }

// }
// useEffect(()=>(handleSorting()),[arrow,sortingType])


console.log("page count",pageCount);


    return(
        <>
        <SearchHeader/>
        <aside>
        {/* <div className={` ${showAdjustment?'col-span-3 hidden':'col-span-12 '} border border-red-500  md:block  `} id="adjustments">      </div> */}
<div className="xl:container min-h-screen grid grid-cols-12  xl:mx-auto mx-6 md:mt-5 xl:px-16">
   
        <div className={` ${showAdjustment?'hidden':'block '} md:ps-0 ps-5 md:overflow-hidden overflow-scroll z-10 md:h-fit md:w-auto  md:col-span-3   text-sm bg-white md:block  text-gray-700 md:static top-0 fixed h-screen w-screen sm:pt-0 py-20 p-5 md:-ms-0 -ms-6`} >
       <div className="grid  gap-4">
        <h3 className="font-medium">SHOP BY</h3>
            <ul className="price grid gap-2">
            <li>PRICE</li>
            <MultiRangeSlider
            min={0}
      max={1000}
      onChange={({ min, max }) => { if (min !== range.min || max !== range.max) {
        setRange({ min, max });
      }} }
            />
            </ul>
            
            <ul className="brand grid gap-2">
                <li>CATEGORY</li>
                <hr className="border-t me-7 border-gray-300"></hr>
                <li className="flex gap-2  "> <Link className="hover:underline" to="/Kids">Kids</Link></li>
                <li className="flex gap-2 "><Link className="hover:underline" to="/Men">Men</Link></li>
                <li className="flex gap-2 "><Link className="hover:underline" to="/Women">Women</Link></li>
            
            </ul>
            <ul className="brand grid gap-2">
                <li>BRAND</li>
                <hr className="border-t me-7 border-gray-300"></hr>
                <li className="flex gap-2 "><input type="checkbox" value={"Converse"} onClick={e=>handleChackboxChange(e,'brand')} onChecked={e=>brands.includes(e.target.value)} className="converse w-4 h-4 rounded-md border-2 text-black focus:ring-transparent " /> Converse</li>
                <li className="flex gap-2"><input type="checkbox" value={"Nike"} onChange={e=>handleChackboxChange(e,'brand')} onChecked={e=>brands.includes(e.target.value)}  className="nike w-4 h-4 rounded-md border-2 text-black focus:ring-transparent "/> Nike</li>
                <li className="flex gap-2"><input type="checkbox" value={"Adidas"} onChange={e=>handleChackboxChange(e,'brand')} onChecked={e=>brands.includes(e.target.value)}  className="nike w-4 h-4 rounded-md border-2 text-black focus:ring-transparent "/> Adidas</li>
            
            </ul>

            <ul className="color grid gap-2">
                <li>COLOR</li>
                <hr className="border-t me-7 border-gray-300"></hr>
                <li className="flex gap-2"><input type="checkbox" className="white w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"White"} onClick={e=>handleChackboxChange(e,'color')} onChecked={e=>colors.includes(e.target.value)} /> White</li>
                <li className="flex gap-2"><input type="checkbox" className="black w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"Black"} onClick={e=>handleChackboxChange(e,'color')} onChecked={e=>colors.includes(e.target.value)} /> Black</li>
                <li className="flex gap-2"><input type="checkbox" className="brown w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"Brown"} onClick={e=>handleChackboxChange(e,'color')} onChecked={e=>colors.includes(e.target.value)} /> Brown</li>
                <li className="flex gap-2"><input type="checkbox" className="pink w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"Pink"} onClick={e=>handleChackboxChange(e,'color')} onChecked={e=>colors.includes(e.target.value)} /> Pink</li>
                <li className="flex gap-2"><input type="checkbox" className="grey w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"Grey"} onClick={e=>handleChackboxChange(e,'color')} onChecked={e=>colors.includes(e.target.value)} /> Grey</li>
                <li className="flex gap-2"><input type="checkbox" className="green w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"Green"} onClick={e=>handleChackboxChange(e,'color')} onChecked={e=>colors.includes(e.target.value)} /> Green</li>
                <li className="flex gap-2"><input type="checkbox" className="purple w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"Purple"} onClick={e=>handleChackboxChange(e,'color')} onChecked={e=>colors.includes(e.target.value)} /> Purple</li>
            </ul>

            <ul className="size grid gap-2">
                <li>SIZE</li>
                <hr className="border-t me-7 border-gray-300"></hr>
                <li className="flex gap-2"><input type="checkbox" className="s w-4 h-4 rounded-md text-black focus:ring-transparent border-2  " value={"S"} onClick={e=>handleChackboxChange(e,'size')} onChecked={e=>sizes.includes(e.target.value)}  /> S</li>
                <li className="flex gap-2"><input type="checkbox" className="xl w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"XL"} onClick={e=>handleChackboxChange(e,'size')} onChecked={e=>sizes.includes(e.target.value)} /> XL</li>
                <li className="flex gap-2"><input type="checkbox" className="l w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"L"} onClick={e=>handleChackboxChange(e,'size')} onChecked={e=>sizes.includes(e.target.value)} /> L</li>
                <li className="flex gap-2"><input type="checkbox" className="x w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"X"} onClick={e=>handleChackboxChange(e,'size')} onChecked={e=>sizes.includes(e.target.value)} /> X</li>
                <li className="flex gap-2"><input type="checkbox" className="m w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"XXL"} onClick={e=>handleChackboxChange(e,'size')} onChecked={e=>sizes.includes(e.target.value)} /> XXL</li>
                <li className="flex gap-2"><input type="checkbox" className="m w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"ML"} onClick={e=>handleChackboxChange(e,'size')} onChecked={e=>sizes.includes(e.target.value)} /> ML</li>
                <li className="flex gap-2"><input type="checkbox" className="m w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"SL"} onClick={e=>handleChackboxChange(e,'size')} onChecked={e=>sizes.includes(e.target.value)} /> SL</li>
                <li className="flex gap-2"><input type="checkbox" className="m w-4 h-4 rounded-md text-black focus:ring-transparent border-2 " value={"M"} onClick={e=>handleChackboxChange(e,'size')} onChecked={e=>sizes.includes(e.target.value)} /> M</li>


            </ul>
            </div>
        </div>

        <a className="fixed bottom-10 z-10 rounded-full shadow-lg right-5 md:hidden block" >
        <svg class="w-9 h-9 p-2 z-10 cursor-pointer text-gray-800  bg-white  rounded-2xl  dark:text-white" onClick={handleCLick}  aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="black" stroke-linecap="round"  stroke-linejoin="round" stroke-width="1" d="M7.75 4H19M7.75 4a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 4h2.25m13.5 6H19m-2.25 0a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 10h11.25m-4.5 6H19M7.75 16a2.25 2.25 0 0 1-4.5 0m4.5 0a2.25 2.25 0 0 0-4.5 0M1 16h2.25"/>
  </svg>
        </a>



        <div className="md:col-span-9  md:mt-0 mt-5 col-span-12 font-bold text-gray-700   ">
            <div className="flex gap-2 justify-end pb-4 font-normal items-center">
                <h4>Sort By: </h4>
<select onChange={(e)=>setSortingtype(e.target.value)} className="select border p-2 pe-9 border-gray-300  rounded">
<option selected disabled>Please Select</option>
    <option value={'name'}  >Name</option>
    <option value={'price'} >Price</option>
    <option value={'default'}>Default</option>



</select>

<div className={` ${arrow ? ' ' : 'rotate-180 origin-center '} mx-3 `} onClick={changeArrow}>
<svg class={`w-4 h-4 hover:cursor-pointer text-gray-800  dark:text-white`} id="adjsButton" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
    <path stroke="black"  stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 1v12m0 0 4-4m-4 4L1 9"/>
  </svg>
  </div>
            </div>


        <div className="grid grid-cols-12  gap-4">

            {filterPrds.slice(productOnPage.start,productOnPage.end).map(product=>(
                <div className="lg:col-span-3 md:col-span-4 col-span-6   ">
                <Link to="/SingleProduct" state={{product:product,variant:allPrds.filter((p)=>p.name === product.name )}}  >
                <img src={product.images[0]} className="object-contain bg-gray-100 "/>
                </Link>
               
                <h2>{product.name}</h2>
                <h2>${product.price}</h2>
                {/* <h3>Product varient {JSON.stringify(productWithVariant[0])}</h3> */}
                </div>

            ))}

        
</div> 

{/* Product Page number  */}
<div className="text-sm flex justify-center font-semibold gap-2 py-9"> 
            
    {Array.from({length:pageCount},(_,index)=>(
            <div onClick={()=>(setProductOnPage({start:index === 0 ? 0 : index * productPerpage, end:index === 0 ? productPerpage : productPerpage * (index+1) }) ,console.log("product on page",productOnPage,"index is ",index))} className="border border-gray-400 hover:cursor-pointer text-gray-500 rounded-full p-3 relative items-center justify-center flex"> <span className="absolute" >{index+1}</span></div>
    ))}
        
            
            </div>



        </div>
</div>



        </aside>




        </>
    )

}

export default Search;