
const getToken = () => {
    return localStorage.getItem("token");
  }
  
  const removeLogged = () => {
    localStorage.removeItem("token");
    
  }
  
  const userLogged = () => {
    const token = getToken();
    const user = localStorage.getItem("user");
    const role = localStorage.getItem("role");
    return { token, user: JSON.parse(user), role}
  }

  export { getToken, removeLogged, userLogged };