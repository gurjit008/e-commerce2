import Products from "./products";


const intialProduct = {
    products:[
        {
            title:"Nike react phantom run flyknit 2",
            price:718.00,
            color:"black",
            image:"images/Kids_files/718-black.png",
            size:['M','L','XL','S'],
            color:['WHITE','BLACK','GREEN','BLUE']
        },{
            title:"Nike react phantom run flyknit 2",
            price:718.00,
            color:"pink",
            image:"images/Kids_files/718-pink.png",
            size:['M','L','S'],
            color:['WHITE','BLACK','GREEN','BLUE',"PURPLE",'GRAY','BROWN']

        },{
            title:"Nike react infinity run flyknit",
            price:543.00,
            color:"purple",
            image:"images/Kids_files/543-purple.png",
            size:['M','L','XL','XXL','ML','S','X','ML','SL'],
            color:['WHITE','BLACK','GREEN','BLUE']
        },{
            title:"Seasonal color chuck 70",
            price:819.00,
            color:"pink",
            image:"images/Kids_files/819-pink.png",
            size:['M','L'],
            color:['WHITE','BLACK','GREEN','BLUE']

        },{
            title:"Mix and match chuck taylor all star",
            price:798.00,
            color:"grey",
            image:"images/Kids_files/798-grey.png",
            size:['M','L'],
            color:['WHITE','BLACK','GREEN','BLUE']

        },{
            title:"Chuck taylor all star move",
            price:491.00,
            color:"pink",
            image:"images/Kids_files/491-pink.png",
            size:['M','L'],
            color:['WHITE','BLACK','GREEN','BLUE']

        },{
            title:"Canvas platform chuck taylor all star",
            price:691.00,
            color:"black",
            image:"images/Kids_files/691-black.png",
            size:['M','L'],
            color:['WHITE','BLACK','GREEN','BLUE']

        },
    ]

}


function KidsProductData (){
    return(
        <>
        {/* <Products Products={intialProduct}/> */}
        </>
    )
}
export default KidsProductData;