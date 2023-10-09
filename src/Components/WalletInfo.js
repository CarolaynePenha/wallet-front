import styled from "styled-components";
import Swal from "sweetalert2";
import { useContext } from "react";
import axios from "axios";
import dotenv from "dotenv";

import TokenContext from "../Context/TokenContext";

dotenv.config();

export default function WalletInfo({
  walletinfo,
  setRemoveInfos,
  removeinfos,
}) {
  const { token } = useContext(TokenContext);
  const { value, _id: id, status, description, date } = walletinfo;
  console.log("id: ", id);
  console.log("walletinfo: ", walletinfo);

  function deleteInfos(id) {
    Swal.fire({
      title: "Tem certeza que deseja excluir?",
      text: "Não será possivél reverter.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#008000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, excluir!",
    }).then((result) => {
      if (result.isConfirmed) {
        const URL = process.env.API_URL + `/cash/${id}`;
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const promise = axios.delete(URL, config);
        promise.then(() => {
          setRemoveInfos(!removeinfos);
          Swal.fire("Excluido!", "", "success");
        });
        promise.catch((err) => console.log(err.response));
      }
    });
  }

  return (
    <>
      <CashInfos status={status}>
        <p> {date}</p>
        <p className="description">{description}</p>
        <p className="value">{value}</p>
        <ion-icon
          onClick={() => deleteInfos(id)}
          name="trash-outline"
        ></ion-icon>
      </CashInfos>
    </>
  );
}

// ----------------------css

const CashInfos = styled.div`
  width: 90%;
  height: fit-content;
  display: flex;
  justify-content: space-between;
  align-items: center;
  p {
    font-family: "Young Serif", serif;
    font-size: 18px;
    margin: 0;
    margin-top: 10px;
  }
  .value {
    color: ${(props) => (props.status === "cash-out" ? "red" : "green")};
  }
  ion-icon {
    color: black;
  }
  .description {
    width: 40%;
  }
`;
