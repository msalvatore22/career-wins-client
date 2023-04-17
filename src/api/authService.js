import api from "./axiosConfig";
import useToken from "../hooks/useToken";

const { setToken } = useToken();

class AuthService {

  async login(username, password) {
    return await api
      .post("/login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          setToken(response.data.accessToken)
        }
        return response.data;
      });
  }

  async register(firstName, lastName, email, password) {
    return await api.post("/users", {
      firstName,
      lastName,
      email,
      password
    }).then(response => {
      return response
    })
  }

}

export default AuthService;