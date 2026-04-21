//Comando --> pnpm test:e2e
//Si da error --> pnpm exec cypress install

describe('Product Filter', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/products*', {
      statusCode: 200,
      fixture: 'products.json',
    }).as('getProducts');
  });

  it('filters and shows products by category', () => {
    cy.visit('/');

    cy.wait('@getProducts');

    cy.get('[data-cy="category-filter"]').click();
    cy.contains('women').click();

    cy.get('[data-cy="product-card"]').should('be.visible');
  });
});
