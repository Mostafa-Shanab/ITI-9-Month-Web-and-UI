function UserService() {
  this.getUser = async function (id) {
    console.log("Fetching data from api...");
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );
    return response.json();
  };
}

//Proxy
function UserProxy() {
  this.userService = new UserService();
  this.cache = {};

  this.getUser = function (id) {
    if (!this.cache[id]) {
      console.log("Not in cache");
      this.cache[id] = this.userService.getUser(id);
    } else {
      console.log("found in cache");
    }
    return this.cache[id];
  };
}

//client code
// let user = new UserService();
// user.getUser(1).then(console.log);
// user.getUser(1).then(console.log);
// user.getUser(1).then(console.log);

let proxy = new UserProxy();
proxy.getUser(1).then(console.log);
proxy.getUser(1).then(console.log);
proxy.getUser(1).then(console.log);
