import React, { useState } from "react";

const MyForm = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [error,setError]=useState({})

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};

    if (!name) {
      errors.name = "Name is ";
    }else{errors.name ="";}
  
    if (!price) {
      errors.price = "Price is ";
    }else{errors.price = "";}
  
    if (!category) {
      errors.category = "Category is ";
    }else{errors.category = "";}
  
    if (!description) {
      errors.description = "Description is ";
    }else{errors.description = "";}

    setError({ ...errors });
    if (Object.keys(errors).length > 0) {
      console.log("Input Error");
      console.log(JSON.stringify(errors));
      return;
    }

    // Perform form submission logic here
    // ...
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        name="name"
        type="text"
        
      />
      <p>{error.name}</p>

      <label htmlFor="email">Email:</label>
      <input
        id="email"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        name="email"
        type="text"
        
      />
      <p>{error.price}</p>


<label htmlFor="email">Category:</label>
      <input
        id="email"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        name="email"
        type="text"
        
      />
      <p>{error.category}</p>

          <label htmlFor="email">Email:</label>
      <input
        id="email"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        name="email"
        type="text"
        
      />
      <p>{error.description}</p>


      <button type="submit">Submit</button>
    </form>
  );
};

export default MyForm;
