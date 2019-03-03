describe('Sidebar', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  it('should have active state', () => {
    cy.get('.g-sidebar__menu-item:contains(Dashboard)').should(
      'have.class',
      'g-sidebar__menu-item--selected'
    );
  });

  it('should be collapsible', () => {
    cy.get('.g-header__sidebar-toggle').click();

    cy.get('.g-sidebar').should('have.class', 'g-sidebar--collapse');

    cy.get('.g-header__sidebar-toggle').click();

    cy.get('.g-sidebar').should('not.have.class', 'g-sidebar--collapse');
  });
});

describe('Sidebar Expand', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');
  });

  it('menu item should be active on click', () => {
    cy.get('.g-sidebar__menu-item:contains(Multilevel Menu)')
      .click()
      .should('have.class', 'g-sidebar__menu-item--active')
      .get('.g-sidebar__menu-item:contains(Level One):eq(2)')
      .click()
      .should('have.class', 'g-sidebar__menu-item--active');
  });

  it('menu item should show on click', () => {
    cy.get('.g-sidebar__menu-item:contains(Multilevel Menu)')
      .click()
      .get('.g-sidebar__menu-item:contains(Level One)')
      .should('be.visible')
      .get('.g-sidebar__menu-item:contains(Level One):eq(2)')
      .click()
      .get('.g-sidebar__menu-item:contains(Level Two)')
      .should('be.visible');
  });

  it('should have sidebar footer', () => {
    cy.get('.g-sidebar__footer').should('be.visible');
  });
});

describe('Sidebar Collapse', () => {
  beforeEach(() => {
    cy.visit('http://127.0.0.1:8080/index.html');

    cy.get('.g-header__sidebar-toggle').click();
  });

  it('menu item should be active on hover', () => {
    cy.get('.g-sidebar__menu-item:contains(Multilevel Menu)')
      .trigger('mouseover')
      .should('have.class', 'g-sidebar__menu-item--active')
      .should('have.class', 'g-sidebar__menu-item--toggle');
  });

  it('menu item should be active on click', () => {
    cy.get('.g-sidebar__menu-item:contains(Multilevel Menu)')
      .click()
      .should('have.class', 'g-sidebar__menu-item--active')
      .should('have.class', 'g-sidebar__menu-item--toggle');
  });

  it('menu item should show on hover', () => {
    cy.get('.g-sidebar__menu-item:contains(Multilevel Menu)').trigger('mouseover');

    cy.get('.g-sidebar__menu-description:contains(Multilevel Menu)').should('be.visible');
  });

  it('menu item should show on click', () => {
    cy.get('.g-sidebar__menu-item:contains(Multilevel Menu)').click();

    cy.get('.g-sidebar__menu-description:contains(Multilevel Menu)').should('be.visible');
  });

  it('should not have sidebar footer', () => {
    cy.get('.g-sidebar__footer').should('not.be.visible');
  });
});
