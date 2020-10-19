import axios from "axios";

var url = "/api/login";

async function login(credentials) {
  var response = await axios.post(url, credentials);
  return response.data;
}

export default { login };
