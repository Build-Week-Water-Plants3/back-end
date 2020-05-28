const supertest = require("supertest");
const server = require("../index");

describe('GET/ on server', () => {
    it('return status 200', async () => {
        const res = await supertest(server).get('/');
        expect(res.status).toBe(200);
    });
    it('return json', async () => {
        const res = await supertest(server).get('/');
        expect(res.type).toBe('application/json');
    });
    it('return message: Welcome to the server!', async () => {
        const res = await supertest(server).get('/');
        expect(res.body).toEqual({message:'Welcome to the server!'})
    })
})