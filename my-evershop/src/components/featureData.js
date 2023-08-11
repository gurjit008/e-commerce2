import React from "react";
import FeatureProduct from "./featureProduct"

function InitialFeaturePoduct(){
const initialFeaturePoduct ={

    products:[
        {
            title:"Nike air zoom pegasus 35",
            price:"$411.00",
            image:"https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691412868/product_images/r4alesndfr8kjsxzw12e.png"
        },        {
            title:"NGeography class chuck taylor all star",
            price:"$250.00",
            image:"https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691414790/product_images/u1iqwlczdh3bzobmpec5.png"

        },        {
            title:"Lite racer adapt 3.0 shoes",
            price:"$895.00",
            image:"https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691412907/product_images/sibpulmp0aif3gdrntoh.png"

        },        {
            title:"Chuck taylor all star",
            price:"$504.00",
            image:"https://res.cloudinary.com/dkkqzmr4l/image/upload/v1691413820/product_images/qvwrkspamsrt51ctv6y7.png"

        }
    ]
}

const name='react';
return(
    <FeatureProduct Products={initialFeaturePoduct} />
)
}

export default InitialFeaturePoduct;