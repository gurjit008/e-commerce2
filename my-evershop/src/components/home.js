import Banner from "./banner";
import Collections from "./collections";
import InitialFeaturePoduct from "./featureData";
import Footer from "./footer";
import Nav from "./nav";

function Home(){
    return(<>
    {/* <Nav/> */}
    <Banner/>
    <Collections/>
    <InitialFeaturePoduct/>
    {/* <Footer/> */}
    </>)
}

export default Home