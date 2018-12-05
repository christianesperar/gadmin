describe('Header', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  it('should toggle messages on mail icon click', () => {
    cy.get('.g-header__nav-link:eq(1)')
      .click()
      .get('.g-notification:contains(Show older messages)')
      .should('be.visible');

    cy.get('.g-header__nav-link:eq(1)')
      .click()
      .get('.g-notification:contains(Show older messages)')
      .should('not.be.visible');
  });

  it('should toggle options on arrow icon click', () => {
    cy.get('.g-header__nav-link:eq(2)')
      .click()
      .get('.g-notification:contains(Logout)')
      .should('be.visible');

    cy.get('.g-header__nav-link:eq(2)')
      .click()
      .get('.g-notification:contains(Logout)')
      .should('not.be.visible');
  });
});
