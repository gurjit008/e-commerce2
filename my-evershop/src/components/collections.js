import { Link } from "react-router-dom"

function Collections(){
    return(
        <>
        <div className="collections  text-gray-700 lg:px-20 px-6 p-5 gap-4 grid grid-cols-4 md:grid-cols-12"> 
<div className="col-span-4 ">
    <img className="object-contain mb-3 border " src="https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691478633/product_images/kids_t7pefj.jpg"/>
    <div className="img-dis ">
<h1 className="text-2xl pb-3">Kids SHOES COLLECTION</h1>
<h5 className="text-sm pb-3">Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.</h5>
<Link to={"/Kids"}><button className="bg-gray-900 hover:bg-gray-500 rounded-sm text-white text-sm p-2 px-5"  >SHOP KIDS</button></Link>
    </div>
</div>

<div className="col-span-4 ">
    <img className="object-contain mb-3 border " src="https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691478676/product_images/women_euxr1w.jpg"/>
    <div className="img-dis ">
<h1 className="text-2xl pb-3">WOMEN SHOES COLLECTION</h1>
<h5 className="text-sm pb-3">Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.</h5>
<Link to={"/Women"}>  <button className="bg-gray-900 hover:bg-gray-500 rounded-sm text-white text-sm p-2 px-5"  >SHOP WOMEN</button></Link>
    </div>
</div>

<div className="col-span-4  ">
    <img className="object-contain mb-3 border " src="https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691478677/product_images/men3_kn1dvr.webp"/>
    <div className="img-dis ">
<h1 className="text-2xl pb-3">MEN SHOES COLLECTION</h1>
<h5 className="text-sm pb-3">Constructed from luxury nylons, leathers, and custom hardware, featuring sport details such as hidden breathing vents, waterproof + antimicrobial linings, and more.</h5>
<Link to="/Men">   <button className="bg-gray-900 hover:bg-gray-500 rounded-sm text-white text-sm p-2 px-5"  >SHOP MEN</button></Link>
    </div>
</div>






</div>
        </>
    )
}

export default Collections