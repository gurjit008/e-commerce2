
function FeatureProduct(props){

    const featureProduct = props.Products.products;
    console.log("feature333"+featureProduct);
    return(
        <>
         <div className="featureProduct  text-gray-700 lg:px-20 px-6 p-5 gap-4 grid grid-cols-6 md:grid-cols-12"> 
        {featureProduct.map((product)=>(
            <>
            <div className="col-span-3"> 
    <img className="object-contain mb-3 border bg-gray-300 " src={product.image}/>
            <h1 className="font-bold">{product.title}</h1>
            <h1>{product.price}</h1>
            
            </div>

            </>
        ))}
        {/* <div className="featureProduct  text-gray-700 lg:px-20 px-6 p-5 gap-4 grid grid-cols-4 md:grid-cols-12"> 
        
        <div className="col-span-12">
        </div>

        </div> */}

</div>
        </>
    )
}

export default FeatureProduct