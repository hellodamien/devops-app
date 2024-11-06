describe("Main page access", () => {
  it("can access main page", () => {
    cy.visit("/");
  });

  it("can access main page and see the title", () => {
    cy.visit("/");
    cy.get("h1").should("contain", "Todo App");
  });
});
