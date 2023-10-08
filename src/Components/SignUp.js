import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

import { Form } from "./SignIn";
import { ButtonRegisterLogin } from "./SignIn";
import Loading from "./Loading";
import Logo from "./../assets/logo.svg";

export default function SignUp() {
  const navigate = useNavigate();
  const [infoSignUp, setInfoSignUp] = useState({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });
  const [buttonState, setButtonState] = useState(false);
  const { email, name, password, repeatPassword } = infoSignUp;
  const [buttonLoading, setButtonLoading] = useState("Entrar");

  async function post(event) {
    event.preventDefault();
    setButtonState(true);
    setButtonLoading(<Loading />);
    const URL = "http://localhost:5500/sign-up";
    console.log("infos: ", infoSignUp);
    try {
      const response = await axios.post(URL, infoSignUp);
      const { data } = response;
      navigate("/");
    } catch (err) {
      console.log(err);
      setButtonState(false);
      setButtonLoading("Entrar");
      alert("algo deu errado,tente novamente!");
    }
  }
  return (
    <Conteiner>
      <img src={Logo} alt="Logo" />
      <Form onSubmit={post}>
        <input
          disabled={buttonState}
          type="text"
          required
          placeholder="nome"
          value={name}
          onChange={(e) =>
            setInfoSignUp({ ...infoSignUp, name: e.target.value })
          }
        />
        <input
          disabled={buttonState}
          type="email"
          required
          placeholder="e-mail"
          value={email}
          onChange={(e) =>
            setInfoSignUp({ ...infoSignUp, email: e.target.value })
          }
        />
        <input
          disabled={buttonState}
          type="password"
          required
          placeholder="senha"
          title="senha deve ter no minimo 8 caracteres,ao menos uma letra maiuscula, uma minuscula,
           um numero e um caractere especial(@$!%*?&)"
          value={password}
          onChange={(e) =>
            setInfoSignUp({ ...infoSignUp, password: e.target.value })
          }
        />
        <input
          disabled={buttonState}
          type="password"
          required
          placeholder="repita a senha"
          value={repeatPassword}
          onChange={(e) =>
            setInfoSignUp({ ...infoSignUp, repeatPassword: e.target.value })
          }
        />
        <button disabled={buttonState} type="submit" className="save-button">
          {buttonLoading}
        </button>
      </Form>
      <Link to={"/"}>
        <ButtonRegisterLogin disabled={buttonState}>
          Já tem uma conta? Faça login!
        </ButtonRegisterLogin>
      </Link>
    </Conteiner>
  );
}

// -------------------------------------css

const Conteiner = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    font-size: 20px;
  }
  img {
    width: 300px;
  }
`;
