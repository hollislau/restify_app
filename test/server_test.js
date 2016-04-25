const chai = require("chai");
const chaiHttp = require("chai-http");

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;
const mongoose = require("mongoose");
const FantasyChar = require(__dirname + "/../models/fantasy_char");
const server = require(__dirname + "/../server");

describe("Fantasy server", () => {
  before((done) => {
    this.portBackup = process.env.PORT;
    this.mongoUriBackup = process.env.MONGODB_URI;
    this.port = process.env.PORT = 1234;
    process.env.MONGODB_URI = "mongodb://localhost/fantasy_test";
    this.fantasyServer = server(this.port, () => {
      done();
    });
  });

  after((done) => {
    process.env.PORT = this.portBackup;
    process.env.MONGODB_URI = this.mongoUriBackup;
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        this.fantasyServer.close(() => {
          done();
        });
      });
    });
  });

  describe("POST method", () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => done());
    });

    it("creates a new fantasy character on a POST request", (done) => {
      request("localhost:" + this.port)
      .post("/api/fantasychars")
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
    it("reads all fantasy characters on a GET request", (done) => {
      request("localhost:" + this.port)
        .get("/api/fantasychars")
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
      var newFantasyChar = new FantasyChar({
        name: "Kirito",
        gender: "M",
        weapon: "Dual swords"
      });

      newFantasyChar.save((err, data) => {
        if (err) return process.stderr.write(err + "\n");

        this.fantasyChar = data;
        done();
      });
    });

    it("updates the fantasy character on a PUT request", (done) => {
      request("localhost:" + this.port)
        .put("/api/fantasychars/" + this.fantasyChar._id)
        .send({
          name: "Lisbeth",
          gender: "F",
          weapon: "Mace"
        })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("Fantasy character updated!");
          done();
        });
    });

    it("deletes the fantasy character on a DELETE request", (done) => {
      request("localhost:" + this.port)
        .delete("/api/fantasychars/" + this.fantasyChar._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql("Fantasy character deleted!");
          done();
        });
    });
  });
});
