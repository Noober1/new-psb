describe("Login Page", () => {
  beforeEach(() => {
    // go to root page
    cy.visit("/login");
    // assert that the url is the about page
    cy.url().should("include", "/login");
  });

  it("Login Box test", () => {
    // login page element should be visible
    cy.get('[data-testid="login-page"]').should("be.visible");

    //   typing email
    let emailLoginInput = cy.get('[data-testid="email-login-input"]');
    emailLoginInput.type("ccc");
    cy.findByRole("textbox", {
      name: /silahkan masukan email anda/i,
    }).should("exist");
    emailLoginInput.type("testcsadc");
    cy.findByRole("textbox", {
      name: /format email salah/i,
    }).should("exist");
    emailLoginInput.type("testcsadc@aaa.com");
    cy.findByRole("textbox", {
      name: /format email salah/i,
    }).should("not.exist");

    //   typing email
    let passwordLoginInput = cy.get('[data-testid="password-login-input"]');
    passwordLoginInput.type("");

    // get the div element that contains the text "About Page"
    cy.get('[data-testid="submit-login-input"]').click();
  });
  // it("Login Box validation test", () => {
  //   // login page element should be visible
  //   cy.get('[data-testid="login-page"]').should("be.visible");

  //   //   typing email
  //   cy.get('[data-testid="email-login-input"]').type("test@afcdasc");

  //   //   typing email
  //   cy.get('[data-testid="password-login-input"]').type("csdcsdc");

  //   // // get the div element that contains the text "About Page"
  //   // cy.get('[data-testid="submit-login-input"]').click();
  // });
});
