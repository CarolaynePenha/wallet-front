import axios from "axios";

export async function keepConection(token) {
  console.log("entrei");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    "http://localhost:5500/user-remain",
    null,
    config
  );
}
