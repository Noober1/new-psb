describe("Login Box", () => {
  it("Toggle login pop up", () => {
    cy.visit("/");

    // assert that the url visited is the correct one
    cy.url().should("include", "/");

    // click on login popup button
    cy.findByTestId("login-box-button-from-hero").click();

    // login box should be visible
    cy.findByTestId("login-box").should("be.visible");

    // click on login popup button inside login box
    cy.findByTestId("login-box")
      .findByTestId("login-box-toggle-button")
      .click();

    // login box should be hidden
    cy.findByTestId("login-box").should("not.exist");
  });

  it("Login box input validation", () => {
    // visit page that contain login box component
    cy.visit("/login");

    // assert that the url visited is the correct one
    cy.url().should("include", "/login");

    // login page element should be visible
    cy.get('[data-testid="login-page"]').should("be.visible");

    //   typing empty email
    cy.findByTestId("login-box-email").get('[name="email"]').type("c").clear();

    // label should be exist
    cy.findByTestId("login-box-email").findByRole("label").should("exist");

    // typing email with incorrect format
    cy.findByTestId("login-box-email").get('[name="email"]').type("testcsadc");

    // label should be exist
    cy.findByTestId("login-box-email").findByRole("label").should("exist");

    // typing email correcty
    cy.findByTestId("login-box-email")
      .get('[name="email"]')
      .type("testcsadc@aaa.com");

    // label should not be exist
    cy.findByTestId("login-box-email").findByRole("label").should("not.exist");

    // clearing password
    cy.findByTestId("login-box-password")
      .get('[name="password"]')
      .type("test")
      .clear();

    // label error should be exist
    cy.findByTestId("login-box-password").findByRole("label").should("exist");

    // submit button should be disabled
    cy.findByTestId("submit-login-input").should("be.disabled");

    // typing password under 8 characters
    cy.findByTestId("login-box-password")
      .get('[name="password"]')
      .type("test123");

    // label error should be exist
    cy.findByTestId("login-box-password").findByRole("label").should("exist");

    // typing password over 50 characters
    cy.findByTestId("login-box-password")
      .get('[name="password"]')
      .type("1234 1234 1234 1234 1234 1234 1234 1234 1234 1234 s");

    // label error should be exist
    cy.findByTestId("login-box-password").findByRole("label").should("exist");

    // typing password between 8 and 50 characters
    cy.findByTestId("login-box-password")
      .get('[name="password"]')
      .clear()
      .type("test1234");

    // error label should not exist
    cy.findByTestId("login-box-password")
      .findByRole("label")
      .should("not.exist");

    // button should be enabled
    cy.findByTestId("submit-login-input").should("be.enabled");

    // submitting form
    cy.findByTestId("submit-login-input").click();
  });
});
