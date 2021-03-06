"use strict"
const request = require('supertest');
const app = require("../app");

describe("response format" , () => {
    const mockURL = "http://google.com";
    const resPromise = request(app)
    .post("/api/shorturl/new")
    .send({url: mockURL})
    .set("Content-Type", "application/json");

    test("response with status 20X", async () => {
        const {status} = await resPromise;
        expect([200,201]).toContain(status);
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
    const mockURLNew = "http://google.com";
    const resPromiseNew = request(app)
    .post("/api/shorturl/new")
    .send({url: mockURLNew})
    .set("Content-Type", "application/json");

    const mockURL = "http://facebook.com";
    const resPromise = request(app)
    .post("/api/shorturl/new")
    .send({url: mockURL})
    .set("Content-Type", "application/json");
    
    test("existing url respond with status 200", async () => {
        const {status} = await resPromiseNew;
        expect(status).toBe(200);
    });
    test("new url respond with status 201", async () => {
        const {status} = await resPromise;
        expect(status).toBe(201);
    });
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