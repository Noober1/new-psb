describe("Navigasi", () => {
  it("Navigasi ke halaman about", () => {
    // go to root page
    cy.visit("/");

    // get the link with href="/about"
    cy.get('a[href*="about"]').click();

    // assert that the url is the about page
    cy.url().should("include", "/about");

    // get the div element that contains the text "About Page"
    cy.get("div").contains("About Page");
  });
});
