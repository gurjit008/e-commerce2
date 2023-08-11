import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes,useParams } from 'react-router-dom';
import Home from './components/home';
import NewAccount from './components/newAccount';
import ShoppingCart from './components/shoppingCart';
import Login from './components/login';
import Checkout from './components/checkout';
import AdminIndex from './components/admin/AdminIndex';
import SingleProduct from './components/singleProduct';
import ImageUploadForm from './components/cloudinary/ImageUploaderForm';
import CategoryPage from './components/categoryPage';
import store from './components/redux/store';

import AdminApp from './components/admin/adminApp';
import ProductsControl from './components/admin/productsControl';
import NewProduct from './components/admin/newProduct';
import UserControl from './components/admin/userControl';
import AdminLogin from './components/admin/login';
import OrdersDetails from './components/admin/ordersDetails';
import Search from './components/search';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  
  <React.StrictMode>

<Provider store={store}>
<BrowserRouter>

<Routes>

<Route path='/' element={<App/>}> 
<Route index element={<Home/>}/> 
<Route path='/home' element={<Home/>}/> 
<Route path='/:category' element={<CategoryPage/>}/>
<Route path='/login' element={<Login/>}/>
<Route path='/newAccount' element={<NewAccount/>}/> 
<Route path='/shoppingCart' element={<ShoppingCart/>}/> 
<Route path='/checkout' element={<Checkout/>}/>
<Route path='/SingleProduct' element={<SingleProduct/>}/>

<Route path='/search' element={<Search/>}/>

<Route path='/user/*' element={<></>}/>

</Route>

<Route path="/admin" element={<AdminApp/>}>
 <Route  index element={<NewProduct/> } ></Route>
<Route path="/admin/productsControl" element={<ProductsControl/>}></Route>
<Route path="/admin/usersControl" element={<UserControl/>}></Route>
<Route path='/admin/orders' element={<OrdersDetails/>}/>
<Route path='/admin/*' element={<div className='text-4xl col-span-9'>This route does not exist</div>}/>
</Route>
<Route path="/admin/login" element={ <AdminLogin/> }/>


</Routes>



</BrowserRouter>
</Provider>


  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
