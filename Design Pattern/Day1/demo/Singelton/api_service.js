class ApiService{
    constructor(){
        if(ApiService.instance){
            return ApiService.instance;
        }
        this.token = null;
        ApiService.instance = this;
    }
    setToken(token){
        this.token = token;
    }

    getToken(){
        return this.token;
    }
}
export default ApiService;