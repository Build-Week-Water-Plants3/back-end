
const db = require("../data/dbconfig");
const Users = require('../models/usermodel');

afterAll(async () => {
    await db.destroy()
});


describe("USER MODELS", () => {
    describe("adds to database", () => {
        beforeEach(async () => {
            await db("users").truncate();
            await db("plants").truncate();
        });
        it("adds plants to database", async () => {
            await db("users").insert({
                username: "dpinkett",
                password: "test1",
                Number: "155-555-5555"
            })
            await Users.addPlant({
                nickname: "test",
                H2Ofrequency: "test",
                image: "",
                species_name: "default",
                user_id: 1,
            })

        })
    })
})