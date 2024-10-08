import { TASKS_STORAGE_KEY } from "../../src/config";

const taskToCreate = {
  title: "Titre de la tâche",
  date: "2021-12-31",
};

describe("Tasks features", () => {
  it("can add a new task", () => {
    cy.visit("/");

    cy.get("[data-cy='input-title']").type(taskToCreate.title);
    cy.get("[data-cy='input-date']").type(taskToCreate.date);
    cy.get("[data-cy='submit-task']").click();

    // Check success message is displayed
    cy.contains("Tâche ajoutée avec succès !");

    // Check task has been added to the list in local storage
    cy.getAllLocalStorage().then((ls) => {
      const tasks = JSON.parse(ls[Cypress.config().baseUrl][TASKS_STORAGE_KEY]);
      expect(tasks[0]).to.deep.equal(taskToCreate);
    });

    // Check form has been reset
    cy.get("[data-cy='input-title']").should("have.value", "");
    cy.get("[data-cy='input-date']").should("have.value", "");
  });

  it("can't add task without title", () => {
    cy.visit("/");
    cy.get("[data-cy='input-date']").type(taskToCreate.date);
    cy.get("[data-cy='submit-task']").click();

    // Check error message is displayed
    cy.contains("Veuillez remplir tous les champs !");

    // Check date is still in the input
    cy.get("[data-cy='input-date']").should("have.value", taskToCreate.date);

    // Check local storage tasks is empty
    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl]).to.be.undefined;
    });
  });

  it("can't add task without date", () => {
    cy.visit("/");
    cy.get("[data-cy='input-title']").type(taskToCreate.title);
    cy.get("[data-cy='submit-task']").click();

    // Check error message is displayed
    cy.contains("Veuillez remplir tous les champs !");

    // Check title is still in the input
    cy.get("[data-cy='input-title']").should("have.value", taskToCreate.title);

    // Check local storage tasks is empty
    cy.getAllLocalStorage().then((ls) => {
      expect(ls[Cypress.config().baseUrl]).to.be.undefined;
    });
  });
});
