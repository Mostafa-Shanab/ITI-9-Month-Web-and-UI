import ApiService from "./api_service.js";

import api from "./login.js"; 
console.log(api.getToken());
const api2 = new ApiService(); 
let token =api2.getToken()
console.log(token); 



console.log(api === api2)