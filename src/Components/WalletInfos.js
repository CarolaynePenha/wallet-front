import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import TokenContext from "../Context/TokenContext";
import Loading from "./Loading";
import WalletInfo from "./WalletInfo";

export default function WalletInfos() {
  const { token, setToken } = useContext(TokenContext);
  const [walletInfos, setWalletInfos] = useState(null);
  const [name, setName] = useState();
  const [removeinfos, setRemoveInfos] = useState(false);

  const navigate = useNavigate();

  let total = 0;

  const URL = "http://localhost:5500/cash";

  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const promise = axios.get(URL, config);
      promise.then((response) => {
        const { data } = response;
        console.log("data: ", data);
        setWalletInfos(data.infos);
        setName(data.name);
      });
      promise.catch((err) => console.log(err.response));
    }
  }, [token, removeinfos]);

  function logOut() {
    setToken(null);
    navigate("/");
  }

  return walletInfos === null ? (
    <Loanding>
      <Loading />
    </Loanding>
  ) : walletInfos.length === 0 ? (
    <>
      <Conteiner>
        <div className="title">
          <p>Olá, {name}!</p>
        </div>
        <div className="data">
          <p>Você não tem nenhum registro de entrada ou saída!</p>
        </div>
        <div className="buttons-options">
          <Link className="button" to={"/cash-in"}>
            <button> Nova entrada</button>
          </Link>
          <Link className="button" to={"/cash-out"}>
            <button> Nova saída</button>
          </Link>
        </div>
      </Conteiner>
    </>
  ) : (
    <Conteiner>
      <div className="title">
        <p>Olá, {name}!</p>
        <ion-icon onClick={() => logOut()} name="log-out-outline"></ion-icon>
      </div>
      <div className="datas">
        {walletInfos.map((walletinfo, index) => {
          if (walletinfo.status === "cash-in") {
            total += parseFloat(walletinfo.value);
          } else {
            total -= parseFloat(walletinfo.value);
          }
          return (
            <WalletInfo
              key={index}
              walletinfo={walletinfo}
              removeinfos={removeinfos}
              setRemoveInfos={setRemoveInfos}
            />
          );
        })}
        <DivTotal total={total}>
          <span>SALDO:</span>
          <p>{total}</p>
        </DivTotal>
      </div>
      <div className="buttons-options">
        <Link className="button" to={"/cash-in"}>
          <button> Nova entrada</button>
        </Link>
        <Link className="button" to={"/cash-out"}>
          <button> Nova saída</button>
        </Link>
      </div>
    </Conteiner>
  );
}

// --------------------------css

const Conteiner = styled.div`
  width: 100%;
  height: fit-content;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  p {
    font-size: 20px;
  }
  .title {
    display: flex;
    align-items: center;
    width: 90%;
    text-align: start;
    p {
      width: 100%;
      color: white;
    }
    ion-icon {
      font-size: 35px;
      color: #7d3e57;
    }
  }
  .data {
    width: 90%;
    height: 60vh;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    p {
      text-align: center;
    }
  }
  .datas {
    width: 90%;
    min-height: 60vh;
    position: relative;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
  }
  .buttons-options {
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .button {
    width: 48%;
  }
  .buttons-options button {
    width: 100%;
    height: 100px;
    border-radius: 5px;
    margin-top: 20px;
    background-color: #7d3e57;
    border: none;
    color: #ffffff;
    font-size: 20px;
  }
`;

const DivTotal = styled.div`
  width: 90%;
  bottom: 2%;
  display: flex;
  position: absolute;
  bottom: 1vh;
  justify-content: space-between;
  align-items: center;
  p {
    color: ${(props) => (props.status <= -1 ? "red" : "green")};
  }
  span {
    font-size: 18px;
    font-weight: 500;
  }
`;

const Loanding = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  padding-top: 50%;
`;
