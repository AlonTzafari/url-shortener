"use strict"
const { response } = require('express');
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
    
    }); 
    
    describe("Response content" , () => {
        const mockURL = "http://google.com";
        const resPromise = request(app)
        .post("/api/shorturl/new")
        .send({url: mockURL})
        .set("Content-Type", "application/json");
        
        test("'original_url' same as one sent", async () => {
            const {body} = await resPromise;
            expect(body["original_url"]).toBe(mockURL);
        });
        test('short url is valid', async () => {
            const {body} = await resPromise;
            try {
                const urlObject = new URL(body["short_url"])
                expect(true).toBe(true);
            } catch (err) {
                expect(err).toBe("test not supposed to run");
            }
        });
    });

    describe("Error handling" , () => {
        const cases = [
            [
                "invalid url",
                {
                    url: "badString",
                },
                {
                    status: 400,
                    message: "url must be valid",
                },
            ],
            [
                "missing url property",
                {
                    notUrl: "https://www.facebook.com/",
                },
                {
                    status: 400,
                    message: "request body must have 'url' property",
                },
            ],
        ];

        test.each(cases)("%s", async (_, send, expected) => {
            const resPromise = request(app)
            .post("/api/shorturl/new")
            .send(send)
            .set("Content-Type", "application/json");
            const res = await resPromise;
            expect(res.status).toBe(expected.status);
            expect(res.body.message).toBe(expected.message);
        });
    });
    
});