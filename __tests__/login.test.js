require("dotenv").config();

const request = require("supertest");
const mongoose = require("mongoose");

const app = require("../app");

const { DB_USER, DB_PASS, DB_NAME } = process.env;

const DB_HOST = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.domin4s.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`;

beforeAll(async () => {
  await mongoose.connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

mongoose.set("strictQuery", false);

describe("login/signup controller", () => {
  const credentials = {
    email: "test1@pbridal.com",
    password: "123456",
  };

  test("Should return status code 200", async () => {
    const response = await request(app)
      .post("/api/users/login")
      .send(credentials);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user).toBeDefined();
    expect(typeof response.body.user.email).toBe("string");
    expect(typeof response.body.user.subscription).toBe("string");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
