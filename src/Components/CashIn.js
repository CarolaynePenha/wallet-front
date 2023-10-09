import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

import { Form } from "./SignIn";
import Loading from "./Loading";
import TokenContext from "../Context/TokenContext";

export default function CashIn() {
  const { token } = useContext(TokenContext);

  const [cashin, setCashIn] = useState({
    value: "",
    description: "",
  });
  const [buttonState, setButtonState] = useState(false);
  const { value, description } = cashin;
  const [buttonLoading, setButtonLoading] = useState("Salvar Entrada");

  async function post(event) {
    event.preventDefault();
    setButtonState(true);
    setButtonLoading(<Loading />);
    const URL = process.env.REACT_APP_API_URL + "/cash-in";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(URL, cashin, config);
      const { data } = response;
      setCashIn({
        value: "",
        description: "",
      });
      setButtonLoading("Salvar Entrada");
      setButtonState(false);
      alert("Entrada salva com sucesso");
    } catch (err) {
      console.log(err);
      setButtonState(false);
      setButtonLoading("Salvar Entrada");
      alert("algo deu errado,tente novamente!");
    }
  }
  return (
    <Conteiner>
      <p className="title">Nova entrada</p>
      <Form onSubmit={post}>
        <input
          disabled={buttonState}
          type="number"
          required
          placeholder="valor da entrada"
          value={value}
          onChange={(e) => setCashIn({ ...cashin, value: e.target.value })}
        />
        <input
          disabled={buttonState}
          type="text"
          required
          placeholder="Descrição"
          value={description}
          maxlength={30}
          onChange={(e) =>
            setCashIn({ ...cashin, description: e.target.value })
          }
        />
        <button disabled={buttonState} type="submit" className="save-button">
          {buttonLoading}
        </button>
      </Form>
      <Link to={"/wallet"}>
        <ion-icon name="wallet-outline"></ion-icon>
      </Link>
    </Conteiner>
  );
}

// -------------------------------------css

const Conteiner = styled.div`
  width: 100%;
  position: relative;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .title {
    font-size: 20px;
    width: 80%;
    display: flex;
    justify-content: flex-start;
    color: white;
  }
  img {
    width: 300px;
  }
  ion-icon {
    font-size: 40px;
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: #7d3e57;
  }
`;
