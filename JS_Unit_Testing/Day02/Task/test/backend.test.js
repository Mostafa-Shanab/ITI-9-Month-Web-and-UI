const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
const app = require("../server");

chai.use(chaiHttp);

describe("Backend API Testing", function () {
  it("should test GET and POST requests together", async function () {
    const getRequest = chai.request(app).get("/posts");

    const postRequest = chai.request(app).post("/posts").send({
      title: "Mostafa Post",
    });

    const [getResponse, postResponse] = await Promise.all([
      getRequest,
      postRequest,
    ]);

    expect(getResponse.status).to.equal(200);
    expect(getResponse.body).to.be.an("array");

    expect(postResponse.status).to.equal(201);
    expect(postResponse.body).to.be.an("object");
    expect(postResponse.body.title).to.equal("Mostafa Post");
  });
});
