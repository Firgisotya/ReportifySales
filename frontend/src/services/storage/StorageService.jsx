
const getToken = () => {
    return sessionStorage.getItem("token");
  }
  
  const removeLogged = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("role_id");
    
  }
  
  const userLogged = () => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    const role_id = sessionStorage.getItem("role_id");
    return {user, role_id};
  }

  export { getToken, removeLogged, userLogged };