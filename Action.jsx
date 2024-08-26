import { useEffect, useState } from "react";
import "../Css/Action.css";
import Navbar from "./Navbar";
import axios from "axios";
import { Link } from "react-router-dom";
import { Footer } from "./Footer";

const Action = () => {
  const [userdata, setdata] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/games")
      .then((res) => {
        const actiongame = res.data.filter(
          (game) => game.category === "Action"
        );
        setdata(actiongame);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handledelete = (id) => {
    const confirm = window.confirm("Do you want to delete?");

    if (confirm) {
      axios.delete(`http://localhost:3000/games/${id}`).then((res) => {
        alert("data deleted successfully");
        window.location.reload();
        navigate("/");
      });
    }
  };
  return (
    <>
      <Navbar />
      <div className="allgamesimg">
        {userdata.map((data) => (
          <div className="allgames" key={data.id}>
            <Link to={`/gamedetails/${data.id}`}>
              <img src={data.image} alt={data.title}  style={{ width: "310px", height: "400px"}}  />
            </Link>
            <p>{data.title}</p>
            <button>
            <Link to={`/editgame/${data.id}`}>
           Edit
            </Link>
            </button>
            <button onClick={() => handledelete(data.id)}>Delete</button>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Action;
