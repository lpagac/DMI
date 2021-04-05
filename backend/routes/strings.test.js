"use strict";

const request = require("supertest");

const app = require("../app");

/************************************** GET /strings */

describe("GET /api/strings", function () {
  test("works", async function () {
    const resp = await request(app).get("/api/strings");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.strings[0]).toEqual({
      id: expect.any(String),
      string: expect.any(String),
    });
  });

});

/************************************** POST /strings */

describe("POST /api/strings", function () {
  test("works with valid input", async function () {
    const resp = await request(app)
      .post("/api/strings")
      .send({id: 'uuid', string: 'newString'});
    
    expect(resp.body.strings[0]).toEqual({
      id: 'uuid',
      string: 'newString',
    });
  });

  test("Bad request if no input", async function () {
    const resp = await request(app)
        .post("/api/strings");

    expect(resp.statusCode).toEqual(400);
  });

  test("Bad request if invalid input", async function () {
    const resp = await request(app)
        .post("/api/strings")
        .send({id: 'uuid', string: '      '});

    expect(resp.statusCode).toEqual(400);
  });

});
