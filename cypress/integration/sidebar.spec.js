describe('Sidebar', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  it('should have active state', () => {
    cy.get('.c-sidebar__menu-item:contains(Dashboard)')
      .should('have.class', 'c-sidebar__menu-item--selected');
  });

  it('should be collapsible', () => {
    cy.get('.c-header__sidebar-toggle').click();

    cy.get('.c-sidebar')
      .should('have.class', 'c-sidebar--collapse');

    cy.get('.c-header__sidebar-toggle').click();

    cy.get('.c-sidebar')
      .should('not.have.class', 'c-sidebar--collapse');
  });
});

describe('Sidebar Expand', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  it('menu item should be active on click', () => {
    cy.get('.c-sidebar__menu-item:contains(Multilevel Menu)')
      .click()
      .should('have.class', 'c-sidebar__menu-item--active')
      .get('.c-sidebar__menu-item:contains(Level One):eq(2)')
      .click()
      .should('have.class', 'c-sidebar__menu-item--active');
  });

  it('menu item should show on click', () => {
    cy.get('.c-sidebar__menu-item:contains(Multilevel Menu)')
      .click()
      .get('.c-sidebar__menu-item:contains(Level One)')
      .should('be.visible')
      .get('.c-sidebar__menu-item:contains(Level One):eq(2)')
      .click()
      .get('.c-sidebar__menu-item:contains(Level Two)')
      .should('be.visible');
  });
});

describe('Sidebar Collapse', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');

    cy.get('.c-header__sidebar-toggle').click();
  });

  it('menu item should be active on hover', () => {
    cy.get('.c-sidebar__menu-item:contains(Multilevel Menu)')
      .trigger('mouseover')
      .should('have.class', 'c-sidebar__menu-item--active')
      .should('have.class', 'c-sidebar__menu-item--toggle');
  });

  it('menu item should be active on click', () => {
    cy.get('.c-sidebar__menu-item:contains(Multilevel Menu)')
      .click()
      .should('have.class', 'c-sidebar__menu-item--active')
      .should('have.class', 'c-sidebar__menu-item--toggle');
  });

  it('menu item should show on hover', () => {
    cy.get('.c-sidebar__menu-item:contains(Multilevel Menu)')
      .trigger('mouseover');

    cy.get('.c-sidebar__menu-description:contains(Multilevel Menu)')
      .should('be.visible');
  });

  it('menu item should show on click', () => {
    cy.get('.c-sidebar__menu-item:contains(Multilevel Menu)')
      .click();

    cy.get('.c-sidebar__menu-description:contains(Multilevel Menu)')
      .should('be.visible');
  });
});
