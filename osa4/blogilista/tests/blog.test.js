require("dotenv").config();
var supertest = require("supertest");
var mongoose = require("mongoose");
var app = require("../app");
var Blog = require("../models/Blog");

var api = supertest(app);

var blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
  },
];

beforeEach(async () => {
  await Blog.insertMany(blogs);
});

var token

describe("retrieving blogs", () => {
  test("returns data in json format", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("returns object with appropriate fields", async () => {
    var { body } = await api.get("/api/blogs");
    expect(body[0]).toHaveProperty("title");
    expect(body[0]).toHaveProperty("author");
    expect(body[0]).toHaveProperty("url");
    expect(body[0]).toHaveProperty("likes");
    expect(body[0]).toHaveProperty("id");
  });
});

describe("creating new blog", () => {
  beforeEach(async () => {
    var user = {
      name: "test user",
      username: "testuser",
      password: "testpass",
    };

    await api.post("/api/users").send(user);
    response = await api.post("/api/login").send(user);
    token = `Bearer ${response.body.token}`
  });

  test("increases blog count by one", async () => {
    var blog = {
      title: "Test blog",
      author: "Test Author",
      url: "http://blog.test.com",
      likes: 22,
    };

    var response = await api.post("/api/blogs").set("Authorization", token).send(blog);

    var { body } = await api.get("/api/blogs");
    expect(body).toHaveLength(blogs.length + 1);
  });

  test("missing field likes is set to 0", async () => {
    var blog = {
      title: "Test blog",
      author: "Test Author",
      url: "http://blog.test.com",
    };

    var { body } = await api.post("/api/blogs").set("Authorization", token).send(blog);

    expect(body).toHaveProperty("likes");
    expect(body.likes).toBe(0);
  });

  test("fails with status code 400 when missing title and url", async () => {
    var blog = {};

    await api.post("/api/blogs").set("Authorization", token).send(blog).expect(400);
  });

  test('fails with status code 401 when access token is not provided', async () => {
    var blog = {
      title: "Test blog",
      author: "Test Author",
      url: "http://blog.test.com",
    };

    await api.post('/api/blogs').send(blog).expect(401)
  })
});

afterEach(async () => {
  await Blog.deleteMany({});
});

afterAll(() => {
  mongoose.disconnect();
});
