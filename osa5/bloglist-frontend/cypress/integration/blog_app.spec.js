describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3002/api/testing/reset").then(() => {
      cy.request("POST", "http://localhost:3002/api/users", {
        username: "test",
        password: "test",
        name: "test",
      }).then(() => {
        localStorage.removeItem("blogapp-user");
      });
    });

    cy.visit("http://localhost:3000");
  });

  it("login form is shown", function () {
    cy.contains("log in to application");
    cy.contains("username");
    cy.contains("password");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
    });

    it("fails with wrong credentials", function () {
      cy.get("#username").type("wrong");
      cy.get("#password").type("password");
      cy.get("#login-button").click();

      cy.contains("Invalid credentials");
      cy.get(".notification").should(
        "have.css",
        "background-color",
        "rgb(246, 81, 107)"
      );
    });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();
    });

    it("A blog can be created", function () {
      cy.get("#open-create-blog").click();

      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");

      cy.get("#create-blog").click();

      cy.contains("test title");
      cy.contains("test author");
    });

    it("A blog can be removed", function () {
      cy.get("#open-create-blog").click();

      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");

      cy.get("#create-blog").click();

      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("view").should("not.exist");
      cy.contains("Removed test title");
    });

    it("other users cannot remove blogs", function () {
      cy.get("#open-create-blog").click();

      cy.get("#title").type("test title");
      cy.get("#author").type("test author");
      cy.get("#url").type("test url");

      cy.get("#create-blog").click();

      // Log out
      cy.contains("logout").click();

      cy.request("POST", "http://localhost:3002/api/users", {
        username: "other",
        password: "other",
        name: "other user",
      }).then(() => {
        localStorage.removeItem("blogapp-user");

        cy.get("#username").type("other");
        cy.get("#password").type("other");
        cy.get("#login-button").click();

        cy.contains("view").click();
        cy.contains("remove").click();
        cy.contains("test title");
        cy.contains("test author");
        cy.contains("Unable to remove");
      });
    });
  });

  it("blog can be liked", function () {
    cy.get("#username").type("test");
    cy.get("#password").type("test");
    cy.get("#login-button").click();

    cy.get("#open-create-blog").click();

    cy.get("#title").type("test title");
    cy.get("#author").type("test author");
    cy.get("#url").type("test url");

    cy.get("#create-blog").click();

    cy.contains("view").click();
    cy.get("#like-button").click();
    cy.contains("likes 1");
  });

  describe("when multiple blogs are added", function () {
    it("they are sorted by like count", function () {
      cy.get("#username").type("test");
      cy.get("#password").type("test");
      cy.get("#login-button").click();

      cy.get("#open-create-blog").click();

      cy.get("#title").type("test title 1");
      cy.get("#author").type("test author 1");
      cy.get("#url").type("test url 1");

      cy.get("#create-blog").click();

      cy.contains("view").click();
      cy.get("#like-button").click();

      cy.get("#open-create-blog").click();

      cy.get("#title").type("test title 2");
      cy.get("#author").type("test author 2");
      cy.get("#url").type("test url 2");

      cy.get("#create-blog").click();


      cy.get("#open-create-blog").click();

      cy.get("#title").type("test title 3");
      cy.get("#author").type("test author 3");
      cy.get("#url").type("test url 3");

      cy.get("#create-blog").click();

    cy.get('.blog').first().contains('likes 1')
    });
  });
});
