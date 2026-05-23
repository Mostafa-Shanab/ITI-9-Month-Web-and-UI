const chai = require("chai");
const expect = chai.expect;

describe("API Testing with Mocha and Chai", function () {
  let posts;
  let response;

  before(async function () {
    response = await fetch("https://jsonplaceholder.typicode.com/posts");

    posts = await response.json();
  });

  it("should return status 200", function () {
    expect(response.status).to.equal(200);
  });

  it("should return array", function () {
    expect(posts).to.be.an("array");
  });

  it("should not be empty", function () {
    expect(posts.length).to.be.greaterThan(0);
  });

  it("should contain objects", function () {
    expect(posts[0]).to.be.an("object");
  });

  it("should contain required properties", function () {
    expect(posts[0]).to.have.property("userId");

    expect(posts[0]).to.have.property("id");

    expect(posts[0]).to.have.property("title");

    expect(posts[0]).to.have.property("body");
  });

  it("should have correct data types", function () {
    expect(posts[0].userId).to.be.a("number");

    expect(posts[0].id).to.be.a("number");

    expect(posts[0].title).to.be.a("string");

    expect(posts[0].body).to.be.a("string");
  });

  it("should contain valid title", function () {
    expect(posts[0].title).to.not.equal("");
  });
  it("Headers Testing", function () {
    expect(response.headers.get("content-type")).to.include("application/json");
  });

  it("should use stored data later", function () {
    const firstPostId = posts[0].id;

    expect(firstPostId).to.equal(1);
  });

  it("all posts should have ids", function () {
    posts.forEach((post) => {
      expect(post.id).to.exist;
    });
  });
});
