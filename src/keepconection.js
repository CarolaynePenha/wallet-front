import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

export async function keepConection(token) {
  console.log("entrei");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.put(
    process.env.API_URL + "/user-remain",
    null,
    config
  );
}
