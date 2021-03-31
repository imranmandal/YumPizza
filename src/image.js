import axios from "axios";
import React, { useState } from "react";

function Image() {
  const [image, setImage] = useState({
    imageName: "",
    imageData: "",
  });
  const handleChange = (e) => {
    setImage({
      imageName: Date.now(),
      imageData: URL.createObjectURL(e.target.files[0]),
    });
  };

  const upload = () => {
    axios
      .post("http://localhost:4000/test", image)
      .then((res) => console.log(res.data.success));
  };
  return (
    <div className="imageupload">
      <h1>Upload image</h1>
      <input type="file" onChange={handleChange} />
      <img className="w-50" src={image.imageData} alt="img" />
      <button onClick={upload}>Submit</button>
    </div>
  );
}

export default Image;
