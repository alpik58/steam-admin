import React, { useState } from "react";
import Navbar from "./Navbar";
import { Footer } from "./Footer";
import "../Css/Addgame.css";
import { useNavigate } from "react-router";
import axios from "axios";

const Addgame = () => {
  const [input, setdata] = useState({
    category: "",
    title: "",
    price: "",
    description: "",
    image: "",
    allimages: "",
  });

  const navigate = useNavigate();

  const hsubmit = (event) => {
    event.preventDefault();

    axios
      .post("http://localhost:3000/games", input)
      .then((res) => {
        alert("Game added successfully");
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar />
      <form onSubmit={hsubmit}>
        <div className="container">
          <h3>Add Game</h3>

          <div className="input-group">
            <p>Category</p>
            <select
              name="category"
              onChange={(e) => setdata({ ...input, category: e.target.value })}
            >
              <option value="">Select Category</option>
              <option value="Action">Action</option>
              <option value="Anime">Anime</option>
            </select>
          </div>

          <div className="input-group">
            <p>Game Poster</p>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => {
                  setdata({ ...input, image: reader.result });
                };
                if (file) {
                  reader.readAsDataURL(file);
                }
              }}
            />
          </div>

          <div className="input-group">
            <p>Title</p>
            <input
              type="text"
              name="title"
              placeholder="Enter game Title"
              onChange={(e) => setdata({ ...input, title: e.target.value })}
            />
          </div>

          <div className="input-group">
            <p>Price</p>
            <input
              type="text"
              name="price"
              placeholder="Enter game Price"
              onChange={(e) => setdata({ ...input, price: e.target.value })}
            />
          </div>

          <div className="input-group">
            <p>Description</p>
            <textarea
              name="description"
              placeholder="Enter game Description"
              onChange={(e) =>
                setdata({ ...input, description: e.target.value })
              }
              style={{ height: "150px", width: "400px" }} 
            />
          </div>

          <div className="input-group">
            <p>Images</p>
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
                      setdata({ ...input, allimages: imageUrls });
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
            <button type="submit">Add</button>
          </div>
        </div>
      </form>
      <Footer />
    </>
  );
};

export default Addgame;
