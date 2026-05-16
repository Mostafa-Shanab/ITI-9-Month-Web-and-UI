// Real Service
class CountryService {
  getCountries() {
    console.log("Fetching countries from API...");

    return ["Egypt", "USA", "France"];
  }
}

// Proxy
class CountryProxy {
  constructor() {
    this.service = new CountryService();
    this.cache = null;
  }

  getCountries() {
    if (this.cache) {
      console.log("Returning countries from cache...");
      return this.cache;
    }

    this.cache = this.service.getCountries();
    return this.cache;
  }
}

const proxy = new CountryProxy();

console.log(proxy.getCountries());

console.log("----------------");

console.log(proxy.getCountries());
