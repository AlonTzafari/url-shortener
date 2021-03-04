const request = require('supertest');
const app = require("../app");

test("mock test", () => {
    expect(true).toBe(true);
});

//backend service tests
test("POST api/shorturl/new", async () => {
    const response = await request(app).post("api/shorturl/new").send({});
}); 