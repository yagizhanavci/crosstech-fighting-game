import React, { useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { PlayerActionTypes } from "../../store/Player/actions/types";
import { playerLogin } from "../../store/Player/actions/playerLogin";
import "./Home.css";

interface Props extends RouteComponentProps {
  login: (username: string) => PlayerActionTypes;
}

const Home: React.FC<Props> = ({ history, login }) => {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(false);

  const inputStyle = error
    ? { borderColor: "red" }
    : { borderColor: "light-gray" };

  return (
    <main className="home container-fluid">
      <h1 className="home-header mb-5">Welcome to Street Fighter</h1>
      <section className="name-field">
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
        {error ? "This field is required please provide a name!" : null}
        <button
          className="btn btn-success btn-md"
          type="submit"
          onClick={e => {
            // Insert name logic here
            e.preventDefault();
            if (playerName === "") {
              setError(true);
              return;
            }
            login(playerName);
            history.push("/fight-screen");
          }}
        >
          Start
        </button>
      </section>
    </main>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    login: (username: string) =>
      dispatch<PlayerActionTypes>(playerLogin(username)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
