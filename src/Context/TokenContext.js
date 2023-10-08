import { createContext } from "react";
import { useState } from "react";

const TokenContext = createContext();

export function TokenProvider({ children }) {
  const [token, setToken] = useState();
  return (
    <TokenContext.Provider value={{ token, setToken }}>
      {children}
    </TokenContext.Provider>
  );
}

export default TokenContext;
