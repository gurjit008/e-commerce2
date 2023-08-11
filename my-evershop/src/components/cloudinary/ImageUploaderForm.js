import React, { useState } from 'react';
import axios from 'axios';

const ImageUploadForm = () => {
  const [image, setImages] = useState(null);

  const handleImageChange = (e)=>{
    const i= e.target.files
    console.log("image : "+i.file);
    // console.log("image name : "+i.name);
    // setImages(Array.from(e.target.files))
    setImages(e.target.files)
  }

  const handleImagesUpload = async () => {
const formData = new FormData();
for (let i = 0; i < image.length; i++) {
  formData.append("image", image[i]);
// console.log(image[i].name);

}
// formData.append("image", image);
// console.log(image[0].name);
console.log( formData.image[0].name); 

    try {

      const response = await axios.post('http://localhost:8000/image', formData);
      console.log('Images uploaded:', response.data);
      
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };


  return (
    <div className='border border-red-400'>
      <div className=' border border-dashed h-64 w-64'>
        <label>   
        <p class="mt-2 text-sm text-gray-600">
      Drag and drop an image or click here to select a file
    </p>
        <input type='file' className='hidden' multiple onChange={handleImageChange} />


        </label>

         </div>
      <input type="button" onClick={handleImagesUpload} value={'Upload Images'}/>
    
    
     

    </div>
  );
};

export default ImageUploadForm;
