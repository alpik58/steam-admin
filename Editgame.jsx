import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import "../Css/Editgame.css";

const Editgame = () => {
  const { id } = useParams();
  const [inputdata, setdata] = useState({
    category: "",
    title: "",
    price: "",
    description: "",
    image: "",
    allimages: [],
  });

  const { allimages } = inputdata;

  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get(`http://localhost:3000/games/${id}`)
      .then((res) => setdata(res.data))
      .catch((error) => console.log(error));
  }, [id]);

  const handlesub = (event) =>{
    event.preventDefault();

    axios
    .put(`http://localhost:3000/games/${id}`,inputdata)
    .then((res) => {
        alert("Data updated successfully")
        navigate("/")
    })
    .catch((error)=>{
      console.log(error);
      alert("something went wrong")
    })
  }



  return (
    <>
      <Navbar />
      <form onSubmit={handlesub}>
        <div className="container">
          <h3>Edit Game</h3>

          <div className="input-groupp">
            <p>Category</p>
            <select
              name="category"
              value={inputdata.category}
              onChange={(e) =>
                setdata({ ...inputdata, category: e.target.value })
              }
            >
              <option value="">Select Category</option>
              <option value="Action">Action</option>
              <option value="Anime">Anime</option>
            </select>
          </div>

          <div className="input-groupp">
            <p>Game Poster</p>
            <div className="poster">
              <img
                src={inputdata.image}
                style={{ height: "200px", width: "200px" }}
              />
            </div>

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setdata({ ...inputdata, image: reader.result });
                };
                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div className="input-groupp">
            <p>Title</p>
            <input
              type="text"
              name="title"
              value={inputdata.title}
              placeholder="Enter game Title"
              onChange={(e) => setdata({ ...inputdata, title: e.target.value })}
            />
          </div>

          <div className="input-groupp">
            <p>Price</p>
            <input
              type="text"
              name="price"
              value={inputdata.price}
              placeholder="Enter game Price"
              onChange={(e) => setdata({ ...inputdata, price: e.target.value })}
            />
          </div>

          <div className="input-groupp">
            <p>Description</p>
            <textarea
              name="description"
              placeholder="Enter game Description"
              value={inputdata.description}
              onChange={(e) =>
                setdata({ ...inputdata, description: e.target.value })
              }
              style={{ height: "150px", width: "400px" }}
            />
          </div>

          <div className="input-groupp">
            <p>Images</p>
            <div className="allimages">
              
              {allimages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`} // Added alt attribute for accessibility
                />
                
              ))}
            </div>
            <input
              type="file"
              name="images"
              accept="image/*"
              multiple
              onChange={(e) => {
                const files = Array.from(e.target.files);
                const imageUrls = [];
                let filesLoaded = 0;

                files.forEach((file, index) => {
                  const reader = new FileReader();

                  reader.onloadend = () => {
                    imageUrls[index] = reader.result;
                    filesLoaded += 1;

                    // Check if all files have been read
                    if (filesLoaded === files.length) {
                      setdata({ ...inputdata, allimages: imageUrls });
                    }
                  };

                  if (file) {
                    reader.readAsDataURL(file);
                  }
                });
              }}
            />
          </div>

          <div className="input-group">
            <button type="submit">Update</button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
  
};

export default Editgame;
