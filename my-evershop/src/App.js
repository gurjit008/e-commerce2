import "./App.css";
import Home from "./components/home";
// import KidsPage from "./components/kidsPages";
import KidsSingleProduct from "./components/singleProduct";


import Nav from "./components/nav";
import Footer from "./components/footer";
import ShoppingCart from "./components/shoppingCart";
import Login from "./components/login";
import NewAccount from "./components/newAccount";
import Checkout from "./components/checkout";
import AdminIndex from "./components/admin/AdminIndex";
import AnimatedMulti from "./components/multiselect/multiselect";
import MultiSelect from "./components/multiselect/multiselect";
import MultiSelectio from "./components/multiselect/multiselect";
import { Outlet } from "react-router-dom";
import UploadForm from "./components/cloudinary/ImageUploaderForm";
import ImageUploadForm from "./components/cloudinary/ImageUploaderForm";


function App() {


  return <>
  <Nav/>
  <Outlet/>
{/* <Home/> */}
{/* <KidsPage/> */}
{/* <KidsSingleProduct/> */}
{/* <ShoppingCart/> */}
{/* <Login/> */}
{/* <NewAccount/> */}
{/* <Checkout/> */}

<Footer/>

{/* <CounterContext/> */}
{/* <Counter/> */}
{/* <Index/> */}

{/* ---------------Admin panel---------- */}

{/* <AdminIndex/> */}


{/* ------------------cloudinary----------- */}

{/* <ImageUploadForm/> */}

  </>;
}

export default App;
