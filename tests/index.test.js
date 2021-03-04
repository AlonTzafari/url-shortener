"use strict"
const request = require('supertest');
const app = require("../app");

// test the tests!!
test("Always PASS", () => {
    expect(true).toBe(true);
});

// backend service tests
describe("URL shortener API", () => {

    describe("response format" , () => {
        const mockURL = "http://google.com";
        const resPromise = request(app)
        .post("/api/shorturl/new")
        .send({url: mockURL})
        .set("Content-Type", "application/json");

        test("response with status 200", async () => {
            const {status} = await resPromise;
            expect(status).toBe(200);
        });

        const cases = [
            "original_url",
            "short_url",
        ];
        test.each(cases)("response body has '%s' property", async (propName) => {
            const {body} = await resPromise;
            expect(body.hasOwnProperty(propName)).toBe(true);
        });
    
        test("'original_url' same as one sent", async () => {
            const {body} = await resPromise;
            expect(body["original_url"]).toBe(mockURL);
        });
    }); 
    

});