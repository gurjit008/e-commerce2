import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Foot from "./foot";
import {ColorRing} from"react-loader-spinner"
import axios from "axios";
import { useLocation } from "react-router-dom";

function NewProduct() {


 

  // -------------------must details-------------------
  const [name, setName] = useState("");
  const [price, setPrice] = useState(null);
  const [category, setCategory] = useState(null);
  const [description, setDescription] = useState("");
  const [sizes, setSizes] = useState([]);
  const [color, setColor] = useState(null);
  const [brand, setBrand] = useState(null);
  const [image, setImage] = useState(null);
  const [images,setImages]=useState(null);
  const [qty, setQty] = useState();

const[uploading,SetUploading]=useState(false);

  // ---------------------- not must details----------------
  const [visible, setVisible] = useState("");
  const [sku, setSku] = useState("");

  let [error, setError] = useState({});

  //   --------------------multi select---------------

  // ------------------multiple size----------------
  const [selected, setSelected] = useState([]);
  const sizeOptions = [
    { value: "X", label: "X" },
    { value: "M", label: "M" },
    { value: "L", label: "L" },
    { value: "S", label: "S" },
    { value: "XL", label: "XL" },
    { value: "XXL", label: "XXL" },
    { value: "SL", label: "SL" },
    { value: "ML", label: "ML" },
  ];


  const handleNameChange = (e) => {
    setName(e.target.value);
    console.log("name :" + name);
  };
  const handlePriceChange = (e) => {
    setPrice(e.target.value);
    console.log("price is :" + price);
  };
  const handleColorChange = (e) => {
    setColor(e.target.value);
    console.log("color is :" + color);
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    console.log("category is :" + category);
  };

  useEffect(handleSizeChange, [selected]);

  function handleSizeChange() {
    setSizes(selected.map((e) => e.value));
  }
  const handleDescription = (e) => {
    setDescription(e.target.value);
    console.log("description is: " + description);
  };
  const handleBrandChange = (e) => {
    setBrand(e.target.value);
    console.log("brand is: " + brand);
  };
  const handleImageChange = (e) => {
    // setImage(Array.from(e.target.files));
    setImages(Array.from(e.target.files));
    setImage(e.target.files);
    console.log("image is: " + JSON.stringify(image));
  };
  const handleQtyChange = (e) => {
    setQty(e.target.value);
    console.log("qty is: " + qty);
  };

  const size = [];

  sizes.map((s) => size.push({ size: s, quantity: qty }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    // form validation

    const errors = {};

    if (!name) {
      errors.name = "Name is required";
    } else {
      delete errors.name;
    }
    if (!price) {
      errors.price = "Price is required";
    } else {
      delete errors.price;
    }
    if (!category) {
      errors.category = "Category is required";
    } else {
      delete errors.category;
    }
    if (!description) {
      errors.description = "Description is required";
    } else {
      delete errors.description;
    }
    if (!image) {
      errors.image = "Image is required";
    } else {
     delete errors.image;
    } 
    if (Object.keys(size).length <= 0) {
      errors.size = "Size is required";
    } else {
      delete errors.size;
    }
    if (!color) {
      errors.color = "Color is required";
    } else {
     delete errors.color;
    }
    if (!brand) {
      errors.brand = "Brand is required";
    } else {
      delete errors.brand;
    }
    if (!qty) {
      errors.qty = "Quantity is required";
    } else {
      delete errors.qty;
    }

    // console.log("objects keys is"+ Object.keys(error) == 0 );
    setError({ ...errors });
    if (Object.values(errors).length > 0) {
      console.log("Input Error: " +Object.values(errors).length);
      console.log(JSON.stringify(errors));
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("description", description);
    // formData.append("image",JSON.stringify(image[0].name));
    formData.append("sizes", JSON.stringify(size) );
    formData.append("color", color);
    formData.append("brand", brand);

    // for (const imgFile of image) {
    //   formData.append("image", imgFile);
    // }
    for (let i = 0; i < image.length; i++) {
      formData.append("images",image[i]);

      console.log(image[i]);
    }
    

    const ProductData = {
      name: name,
      price: price,
      category: category,
      description: description,
      image: image,
      sizes: size,
      color: color,
      brand: brand,
    };

    try {
// alert("Data is being uploaded please wait");
SetUploading(true);

// sending data to backend
      const response = await axios.post('https://e-commerce2-backend.onrender.com/products/newProduct', formData);
      console.log('Product Data uploaded:', response.data);
    

      response.data
      ? SetUploading(false)
      // Show the success message
      : alert("Error uploading data. Please try again."); // Show the error message

      //function to convert formData to object
      function formDataToObject(formData) {
        const object = {};

        for (let [key, value] of formData.entries()) {
          object[key] = value;
        }

        return object;
      }

      console.log(JSON.stringify(ProductData.image));
      console.log(formDataToObject(formData));
      // setName("");
      // setBrand('');
      // setCategory('');
      setColor('');
      // setDescription("");
      setImage();
      setImages([])
      // setPrice("");
      // setQty('');
      setSelected([])
      setSizes([]);
  
  
    } catch (error) {
      console.log(error);
    }
  };

  const handleClear = ()=>{
         setName("");
      setBrand('');
      setCategory('');
      setColor('');
      setDescription("");
      setImage();
      setImages([])
      setPrice("");
      setQty('');
      setSelected([])
      setSizes([]);

  }

  // ------------------multiple color----------------
  //   const [coloSelected, setColorSelected] = useState([]);
  //   const colorOptions = [
  //     { value: 'red', label: 'Red' },
  //     { value: 'green', label: 'Green' },
  //     { value: 'blue', label: 'Blue' },
  //     { value: 'white', label: 'White' },
  //     { value: 'purple', label: 'Purple' },
  //     { value: 'brown', label: 'Brown' },
  //     { value: 'Grey', label: 'Grey' },
  //     { value: 'red', label: 'red' },
  //     { value: 'Black', label: 'Black' }
  //   ]

  return (
    <>

    {/* While loadind */}
{uploading ? 
    <div className="fixed z-50 bg-gray-600 h-screen top-0 bg-opacity-30 w-screen"></div>

:''
}

    {/* absolute  top-24 overflow-hidde lg:left-56 left-32 md:w-[73vw] w-[60vw]  borde border-red-500 */}
      <div className="col-span-12  px-6 sm:ps-[30vw]  md:ps-[20vw] pb-5 ">
        <div className="">
          <form onSubmit={handleSubmit}>
            <div className="grid  grid-cols-12 gap-5  text-sm">
              <ul className=" ps-2 col-span-12 text-xl font-semibold">
                <li>Create A New Product</li>
              </ul>

              <div className="lg:col-span-8  col-span-12 grid gap-5">
                <div className="general rounded-lg grid gap-2 shadow-lg bg-white p-3">
                  <ul className="grid gap-2">
                    <li className="text-base font-semibold">General</li>
                    <li className="grid gap-1">
                      <lable htmlFor="name" className="block">
                        {" "}
                        Name
                      </lable>
                      <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={handleNameChange}
                        className="text-sm w-full rounded border-gray-200"
                      />
                      <span
                        className={` ${
                          error.name ? "block" : "hidden"
                        } text-red-600 text-sm  text-start pt-1`}
                      >
                        {" "}
                        <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                          !
                        </span>{" "}
                        {error.name}{" "}
                      </span>

                      {/* <p>{name}</p> */}
                    </li>
                  </ul>

                  <ul className="flex gap-2">
                    <li className=" ">
                      <lable className="block">SKU</lable>
                      <input
                        type="text"
                        placeholder="SKU"
                        value={sku}
                        // onChange={}
                        className="w-full  mt-1 text-sm rounded border-gray-200"
                      />
                    </li>
                    <li className="">
                      <lable htmlFor="price" className="block">
                        Price
                      </lable>
                      <input
                        type="text"
                        value={price}
                        onChange={handlePriceChange}
                        placeholder="Price"
                        className="w-full text-sm mt-1 rounded border-gray-200"
                      />
                      <span
                        className={` ${
                          error.price ? "block" : "hidden"
                        } text-red-600 text-sm  text-start pt-1`}
                      >
                        {" "}
                        <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                          !
                        </span>{" "}
                        {error.price}{" "}
                      </span>
                    </li>
                  </ul>

                  <ul>
                    <li className="grid gap-2">
                      <lable htmlFor="category" className="block">
                        Category
                      </lable>
                      <select
                        value={category}
                        onChange={handleCategoryChange}
                        className="text-sm w-full border-gray-200 rounded"
                      >
                        <option value={""} disabled selected>
                          Select Category
                        </option>
                        <option value={"Men"}>Men</option>
                        <option value={"Women"}>Women</option>
                        <option value={"Kids"}>Kids</option>
                      </select>
                      <span
                        className={` ${
                          error.category ? "block" : "hidden"
                        } text-red-600 text-sm  text-start pt-1`}
                      >
                        {" "}
                        <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                          !
                        </span>{" "}
                        {error.category}{" "}
                      </span>

                      {/* <h1>{category}</h1> */}
                    </li>

                    <li className="grid gap-1">
                      <lable htmlFor="description" className="block">
                        {" "}
                        Description
                      </lable>
                      <input
                        type="text"
                        value={description}
                        onChange={handleDescription}
                        className="w-full border-gray-200 rounded"
                      />
                      <span
                        className={` ${
                          error.description ? "block" : "hidden"
                        } text-red-600 text-sm  text-start pt-1`}
                      >
                        {" "}
                        <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                          !
                        </span>{" "}
                        {error.description}{" "}
                      </span>

                      {/* <h1>{description}</h1> */}
                    </li>
                  </ul>
                </div>

                <div className="media grid gap-2  borde border-red-400  shadow-lg bg-white rounded-lg p-3">
                  <ul>
                    <li className="grid gap-3">
                    <h1 className="text-base font-semibold"> Media</h1>  

                      <label
                       className="text-base  rounded p-5 font-semibold border-blue-500 border-dashed  border-2"
                      >
                        <div className="flex justify-between cursor-pointer text-gray-500 text-xs ">
                                <p>Upload single or multiple file right here</p>{" "}
                                <p>PNG</p>
                              </div>
                        <input className="hidden" name="images" type="file"
                        multiple onChange={handleImageChange} />
                      </label>
                      <p>
                        { image
                          ? `File name : ${images.map((image)=> image.name+" ")} `
                          : "no files uploaded yet"}
                      </p>
                      <span
                        className={` ${
                          error.image ? "block" : "hidden"
                        } text-red-600 text-sm  text-start pt-1`}
                      >
                        {" "}
                        <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                          !
                        </span>{" "}
                        {error.image}{" "}
                      </span>
                    </li>
                  </ul>

                </div>
              </div>

              <div className="lg:col-span-4 col-span-12 order borde border-red-500 w-full grid gap-2  ">
                <div className="product-status shadow-lg bg-white p-5 rounded-lg">
                  <ul className="pb-3">
                    <li className="text-base font-semibold">Product Status</li>
                  </ul>
                  <ul className="grid gap-3">
                    <li>Visibility</li>
                    <li className="flex items-center gap-2">
                      <input name="radio" type="radio" />
                      <lable className="">Not visible</lable>
                    </li>
                    <li className="flex items-center gap-2">
                      <input name="radio" type="radio" />
                      <lable className="">Visible</lable>
                    </li>
                  </ul>
                </div>

                <div className="ATTRIBUTE-GROUP p-3 rounded-lg shadow-lg bg-white">
                  <ul className="pb-4">
                    <li className="text-base font-semibold">Attributes</li>
                  </ul>
                  <table className="w-full">
                    <tr>
                      <td>
                        <lable htmlFor="size">Size</lable>
                      </td>
                      <td>
                        <MultiSelect
                          className="w-full"
                          options={sizeOptions}
                          value={selected}
                          onChange={setSelected}
                          labelledBy={"Select"}
                          isCreatable={true}
                        />
                        {/* <p>{JSON.stringify(sizes)} </p> */}
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <span
                          className={` ${
                            error.size ? "block" : "hidden"
                          } text-red-600 text-sm  text-start pt-1`}
                        >
                          {" "}
                          <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                            !
                          </span>{" "}
                          {error.size}{" "}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        {" "}
                        <lable htmlFor="color">Color</lable>{" "}
                      </td>
                      <td>
                        <select
                          value={color}
                          onChange={handleColorChange}
                          className="border-gray-300 w-full rounded  text-sm"
                        >
                          <option value={""} selected disabled>
                            Please Select
                          </option>
                          <option value={"Red"}>Red</option>
                          <option value={"Green"}>Green</option>
                          <option value={"Blue"}>Blue</option>
                          <option value={"Grey"}>Grey</option>
                          <option value={"Purple"}>Purple</option>
                          <option value={"red"}>red</option>
                          <option value={"Black"}>Black</option>
                          <option value={"Brown"}>Brown</option>
                          <option value={"White"}>White</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <span
                          className={` ${
                            error.color ? "block" : "hidden"
                          } text-red-600 text-sm  text-start pt-1`}
                        >
                          {" "}
                          <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                            !
                          </span>{" "}
                          {error.color}{" "}
                        </span>
                      </td>
                    </tr>

                    <tr>
                      <td>
                        <lable htmlFor="brand"> Brand </lable>
                      </td>
                      <td>
                        <select
                          value={brand}
                          onChange={handleBrandChange}
                          className="border-gray-300 w-full rounded  text-sm"
                        >
                          <option value={""} selected disabled>
                            Please Select
                          </option>
                          <option value={"Nike"}>Nike</option>
                          <option value={"Converse"}>Converse</option>
                          <option value={"Adidas"}>Adidas</option>
                        </select>
                      </td>
                    </tr>
                    <tr>
                      <td colSpan={2}>
                        <span
                          className={` ${
                            error.brand ? "block" : "hidden"
                          } text-red-600 text-sm  text-start pt-1`}
                        >
                          {" "}
                          <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                            !
                          </span>{" "}
                          {error.brand}{" "}
                        </span>
                      </td>
                    </tr>
                  </table>
                </div>

                <div className="product-status shadow-lg bg-white p-5 rounded-lg">
                  <ul className="pb-3">
                    <li className="text-base font-semibold">Inventory</li>
                  </ul>
                  <ul className="grid gap-1">
                    <li>
                      <lable htmlFor="quantity">Quantity</lable>
                    </li>
                    <li className="flex items-center gap-2">
                      <input
                        name="qty"
                        type="text"
                        value={qty}
                        onChange={handleQtyChange}
                        className="border-gray-300 w-full rounded text-sm"
                        placeholder="Quantity"
                      />
                    </li>
                    <span
                      className={` ${
                        error.qty ? "block" : "hidden"
                      } text-red-600 text-sm  text-start pt-1`}
                    >
                      {" "}
                      <span className="text-white bg-red-600  px-[6.5px] text-xs rounded-full ">
                        !
                      </span>{" "}
                      {error.qty}{" "}
                    </span>
                  </ul>
                </div>
              </div>

              <div className="col-span-12 text- ">
                <ul className="grid gap-5">
                  <li>
                    {" "}
                    <hr className="border-t "></hr>
                  </li>
                  <li>
                
                  </li>
                  <li className="flex justify-between pe-5">

                  <input
                      type="button"
                      onClick={handleClear}
                      className="border-red-600 cursor-pointer font-semibold border-4 p-2 px-5 rounded-md text-red-700"
                      value="Clear"
                    />
                    {" "}

                    {!uploading?
                      <input
                      type="submit"
                      className="bg-custom-green cursor-pointer font-semibold p-2 px-5 rounded-md text-gray-50"
                      value="Save"
                    />:
                    <button type="button" 
                      className="bg-gray-400 px-4  rounded text-gray-50"
                    
                    disabled>
                    <ColorRing
  visible={true}
  height="37"
  width="37"
  ariaLabel="blocks-loading"
  wrapperStyle={{}}
  wrapperClass="blocks-wrapper"
  colors={['white', 'white', 'white', 'white', 'white', ]}
/>
  
</button>
                    }
                  
                  </li>
                </ul>
              </div>

              <div className="col-span-12">
                <Foot />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default NewProduct;
