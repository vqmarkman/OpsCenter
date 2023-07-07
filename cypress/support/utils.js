import { v4 as uuidv4 } from "uuid";

export function setup() {
  Cypress.config("baseUrl", Cypress.env("OPSCENTER_URL"));

  // wait a minute to allow materialization to complete
  cy.wait(60000);
}

export function checkNoErrorOnThePage() {
  // TODO: Temporarily for testing, make sure page loaded
  cy.wait(5000);

  // Validate no exception is thrown
  cy.get('div[class="stException"]').should("not.exist");
};

export const fillInProbeForm = (
  probeName,
  condition,
  emailTheAuthor,
  cancelTheQuery,
  emailOthers
) => {

  cy.get('input[aria-label="Probe Name"]')
    .clear()
    .type(probeName);

  cy.get('textarea[aria-label="Condition"]')
    .clear()
    .type(condition);

  if (emailTheAuthor) {
    // check({force: true}) - explanation below
    // https://docs.cypress.io/guides/references/error-messages#cy-failed-because-the-element-cannot-be-interacted-with
    cy.get('input[aria-label="Email the author"]')
      .should("exist")
      .check({ force: true });
  }

  if (cancelTheQuery) {
    cy.get('input[aria-label="Cancel the query"]')
      .should("exist")
      .check({ force: true });
  }

  cy.get('textarea[aria-label="Email others (comma delimited)"]')
    .clear()
    .type(emailOthers);
};

export const buttonClick = (buttonName) => {
  cy.get('button[kind="secondary"]')
    .contains(buttonName)
    .click();
};

export const buttonCheckExists = (buttonName) => {
  cy.get('button[kind="secondary"]')
    .contains(buttonName)
    .should("exist");
};

function generateUUID(){
  const uuid = uuidv4();
  return uuid;
}

export function generateUniqueName(prefix){
  const uuid = generateUUID();
  const uniqueName = `${prefix}_${uuid}`;
  return uniqueName;
}
