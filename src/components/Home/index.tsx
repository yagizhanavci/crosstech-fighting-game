import React, { useState } from "react";
import "./Home.css";
import { RouteComponentProps } from "react-router-dom";

interface Props extends RouteComponentProps {}

const Home: React.FC<Props> = ({ history }) => {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(false);

  const inputStyle = error
    ? { borderColor: "red" }
    : { borderColor: "light-gray" };

  return (
    <div className="home">
      <h1 className="home-header">Welcome to Street Fighter</h1>
      <div className="name-field">
        <h4 className="name-field-header">Enter Your Name*</h4>
        <input
          style={inputStyle}
          name="playerName"
          value={playerName}
          onChange={e => setPlayerName(e.target.value)}
          type="text"
          placeholder="Your Name..."
          required={true}
        />
        <button
          type="submit"
          onClick={e => {
            // Insert name logic here
            e.preventDefault();
            if (playerName === "") {
              setError(true);
              return;
            }
            history.push("/fighting-screen");
          }}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default Home;
