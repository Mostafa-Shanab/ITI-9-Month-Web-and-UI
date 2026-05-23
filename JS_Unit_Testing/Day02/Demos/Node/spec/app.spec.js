const request = require("request");

describe("test get point", () => {
  let server;
  let data = {};
  beforeAll((done) => {
    server = require("../app.js");
    request.get("http://localhost:3000/", (error, res, body) => {
      data.status = res.statusCode;
      data.body = body;
      done();
    });
  });
  afterAll(() => {
    server.close();
  });

  it("",()=>{
    expect(data.status).toEqual(200)
    expect(data.body).toEqual("hello world")
  })
});
