var listHelper = require("../utils/list_helper");
const { favoiteBlog } = require("../utils/list_helper");
const { text } = require("body-parser");

var listWithOneBlog = [
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
];

var listWithMultipleBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", function () {
  var blogs = [];

  var result = listHelper.dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", function () {
  test("when list has only one blog equals the likes of that", () => {
    expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
  });

  test("when list has multiple blogs equals the likes of them", () => {
    expect(listHelper.totalLikes(listWithMultipleBlogs)).toBe(36);
  });
});

describe("favorite blog", function () {
  test("when list has only one blog is that blog", () => {
    expect(listHelper.favoiteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0]);
  });

  test("when list has multiple blogs equals the blog with most likes", () => {
    expect(listHelper.favoiteBlog(listWithMultipleBlogs)).toEqual(
      listWithMultipleBlogs[2]
    );
  });
});

describe("author with most blogs", function () {
    test("when list has only one blog is author of that blog", () => {
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({ author: listWithOneBlog[0].author, blogs: 1 })
    })

    test('when list has multiple blogs is author that occurs in most of the blogs', () => {
        expect(listHelper.mostBlogs(listWithMultipleBlogs)).toEqual({ author: listWithMultipleBlogs[3].author, blogs: 3 })
    })
})

describe("author with most likes", function () {
    test("when list has only one blog is author of that blog", () => {
        expect(listHelper.mostLikes(listWithOneBlog)).toEqual({ author: listWithOneBlog[0].author, likes: 5 })
    })

    test('when list has multiple blogs is author that has most likes in the blogs', () => {
        expect(listHelper.mostLikes(listWithMultipleBlogs)).toEqual({ author: listWithMultipleBlogs[1].author, likes: 17 })
    })
})