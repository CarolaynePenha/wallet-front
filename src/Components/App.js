import styled from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import SignIn from "./SignIn";
import SignUp from "./SignUp";
import WalletInfos from "./WalletInfos";
import CashIn from "./CashIn";
import CashOut from "./CashOut";
import { TokenProvider } from "../Context/TokenContext";

function App() {
  return (
    <DivApp>
      <TokenProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/wallet" element={<WalletInfos />} />
            <Route path="/cash-in" element={<CashIn />} />
            <Route path="/cash-out" element={<CashOut />} />
          </Routes>
        </BrowserRouter>
      </TokenProvider>
    </DivApp>
  );
}
export default App;
// --------------------------------css

const DivApp = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
  min-height: 100vh;
`;
