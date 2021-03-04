const { response } = require('express');
const request = require('supertest');
const app = require("../app");

test("Always PASS", () => {
    expect(true).toBe(true);
});

//backend service tests
describe("URL shortener API", () => {
    const mockURL = "http://google.com";
    const resPromise = request(app)
    .post("/api/shorturl/new")
    .send({url: mockURL})
    .set("Content-Type", "application/json");
    test("response body has 'original_url' property", async () => {
        const {body} = await resPromise;
        expect(body.hasOwnProperty("original_url")).toBe(true);
    }); 
    test("response body has 'short_url' property", async () => {
        const {body} = await resPromise;
        expect(body.hasOwnProperty("short_url")).toBe(true);
    }); 
    

});