const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const mongoose = require("mongoose");
const SaoChar = require(__dirname + "/../models/sao_char");
const server = require(__dirname + "/../server");

describe("SAO server", () => {
  before((done) => {
    this.portBackup = process.env.PORT;
    this.mongoUriBackup = process.env.MONGODB_URI;
    this.port = process.env.PORT = 1234;
    process.env.MONGODB_URI = "mongodb://localhost/sao_test";
    this.saoServer = server(this.port, () => {
      done();
    });
  });

  after((done) => {
    process.env.PORT = this.portBackup;
    process.env.MONGODB_URI = this.mongoUriBackup;
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        this.saoServer.close(() => {
          done();
        });
      });
    });
  });

  describe("POST method", () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => done());
    });

    it("creates a new SAO character on a POST request", (done) => {
      request("localhost:" + this.port)
      .post("/api/saochars")
      .send({
        name: "Asuna",
        gender: "F",
        weapon: "Rapier"
      })
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.name).to.eql("Asuna");
        expect(res.body.gender).to.eql("F");
        expect(res.body.weapon).to.eql("Rapier");
        done();
      });
    });
  });

  describe("GET method", () => {
    it("reads all SAO characters on a GET request", (done) => {
      request("localhost:" + this.port)
        .get("/api/saochars")
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res.body.length).to.eql(0);
          done();
        });
    });
  });

  describe("PUT and DELETE methods", () => {
    before((done) => {
      var newSaoChar = new SaoChar({
        name: "Kirito",
        gender: "M",
        weapon: "Dual swords"
      });

      newSaoChar.save((err, data) => {
        if (err) return process.stderr.write(err + "\n");

        this.saoChar = data;
        done();
      });
    });

    it("updates the SAO character on a PUT request", (done) => {
      request("localhost:" + this.port)
        .put("/api/saochars/" + this.saoChar._id)
        .send({
          name: "Lisbeth",
          gender: "F",
          weapon: "Mace"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("SAO character updated!");
          done();
        });
    });
  });
});
