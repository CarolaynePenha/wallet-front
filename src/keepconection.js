import axios from "axios";

export async function keepConection(token) {
  console.log("entrei");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    process.env.REACT_APP_API_URL + "/user-remain",
    null,
    config
  );
}
