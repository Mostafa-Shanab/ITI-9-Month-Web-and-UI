import ApiService from "./api_service.js";

function login(name, passwrod){
    console.log(name, passwrod);
    return `${name}-Token`
}

const api = new ApiService(); //{} -> bind {} to this keyword 
api.setToken(login("ahmed", "123"))    //ahmed-Token


export default api ;