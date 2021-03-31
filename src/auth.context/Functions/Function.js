import axio from "axios";
const axios = axio.create({
    withCredentials: true,
});

// LOGIN 
const LoginUser = () => {
    axios.get(`http://localhost:4000/user`).then((res) => {
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userType", res.data.userType);
      localStorage.setItem("auth", true);
    });
    console.log("login");
  };


// REGISTER
 const RegisterUser = () => {
    axios.get(`http://localhost:4000/user`).then((res) => {
      localStorage.setItem("id", res.data.id);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("userType", res.data.userType);
      localStorage.setItem("auth", true);
    });
    console.log("register");
  };


// LOGOUT
 const LogoutUser = () => {
    localStorage.setItem("id", "");
    localStorage.setItem("name", "");
    localStorage.setItem("email", "");
    localStorage.setItem("userType", "");
    localStorage.setItem("auth", false);
    console.log("logout");
  };


//   EXPORT
export { LoginUser, RegisterUser, LogoutUser };