import styled from "styled-components";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import axios from "axios";

import { Form } from "./SignIn";
import Loading from "./Loading";
import TokenContext from "../Context/TokenContext";

export default function CashOut() {
  const { token } = useContext(TokenContext);

  const [cashOut, setCashOut] = useState({
    value: "",
    description: "",
  });
  const [buttonState, setButtonState] = useState(false);
  const { value, description } = cashOut;
  const [buttonLoading, setButtonLoading] = useState("Salvar saída");

  async function post(event) {
    event.preventDefault();
    setButtonState(true);
    setButtonLoading(<Loading />);
    const URL = process.env.REACT_APP_API_URL + "/cash-out";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios.post(URL, cashOut, config);
      const { data } = response;
      setCashOut({
        value: "",
        description: "",
      });
      setButtonLoading("Salvar saída");
      setButtonState(false);
      alert("saída salva com sucesso");
    } catch (err) {
      console.log(err);
      setButtonState(false);
      setButtonLoading("Salvar saída");
      alert("algo deu errado,tente novamente!");
    }
  }
  return (
    <Conteiner>
      <p className="title">Nova saída</p>
      <Form onSubmit={post}>
        <input
          disabled={buttonState}
          type="number"
          required
          placeholder="valor da saída"
          value={value}
          onChange={(e) => setCashOut({ ...cashOut, value: e.target.value })}
        />
        <input
          disabled={buttonState}
          type="text"
          required
          placeholder="Descrição"
          maxlength={30}
          value={description}
          onChange={(e) =>
            setCashOut({ ...cashOut, description: e.target.value })
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
    color: #7d3e57;
  }
  img {
    width: 300px;
  }
  ion-icon {
    font-size: 40px;
    position: absolute;
    bottom: 30px;
    left: 30px;
    color: black;
  }
`;
