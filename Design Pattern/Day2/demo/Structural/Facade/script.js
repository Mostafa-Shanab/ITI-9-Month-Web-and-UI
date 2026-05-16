class User {
  constructor(name, email, passwrod) {
    this.name = name;
    this.email = email;
    this.passwrod = passwrod;
  }
}

//subsystem1
class Database {
  connect() {
    console.log("connected to DB");
  }
  save(user) {
    console.log(`user ${user.name} saved to DB`);
  }
}

//subsystem2

class EmailService {
  sendWelcomingMessage(email) {
    console.log(`welcoming message sent to ${email}`);
  }
}

//subsystem3
class AuthService {
  hashPassword(password) {
    console.log("pawword hashed");
    return `hashed-${password}`;
  }
}

//subsystem4
class Logger {
  log(message) {
    console.log(message);
  }
}

class UserFacade {
  constructor() {
    this.db = new Database();
    this.email = new EmailService();
    this.auth = new AuthService();
    this.logger = new Logger();
  }

  registerUser(user) {
    this.db.connect();
    user.password = this.auth.hashPassword(user.password);
    this.db.save(user);
    this.email.sendWelcomingMessage(user.email);
    this.logger.log(`user ${user.name} registered successfully`);
  }
}

//client code
let db = new Database();
let email = new EmailService();
let auth = new AuthService();
let logger = new Logger();

//client code
let userFacade = new UserFacade();
userFacade.registerUser(new User("ahmed", "123", "ahmed@gmail.com"));
