/// <reference types="cypress" />
import { fetchUsers } from '../../src/api';
import index from '../../pages/index'

describe('User List App', () => {

    beforeEach(() => {
      cy.visit("http://localhost:3000/");
    });
    
    it('Successfully Create User', async () => {
      // Assert that the header title contains the text 'User List App'
      index.elements.headerTitle().should('contain.text', 'User List App');

      index.typeNameInput('Arturo');
      index.clickCreateButton();
      await cy.wait(1000);

      const response = await fetchUsers();
      const users = response.users;
      const arturoExists = users.some(user => user.name === 'Arturo');
      expect(arturoExists).to.be.true;
    });
    

    it('Successfully Edit User', async () => {
      // Fetch the users
      const response = await fetchUsers();
      const users = response.users;
      
      const nameIndex = users.findIndex(user => user.name === 'Arturo');
      cy.log(`Index of user Name: ${nameIndex}`);
      
      index.clickEditButton(nameIndex);
      index.typeNameInput('Arturo2');
      index.clickCreateButton();
      await cy.wait(1000);
      const secResponse = await fetchUsers();
      const secUsers = secResponse.users;
      const arturo2Exists = secUsers.some(user => user.name === 'Arturo2');
      expect(arturo2Exists).to.be.true;
    });

    it('Successfully Delete User', async () => {
      // Fetch the users
      const response = await fetchUsers();
      const users = response.users;
      
      const nameIndex = users.findIndex(user => user.name === 'Arturo2');
      cy.log(`Index of user Name: ${nameIndex}`);
      index.clickDeleteButton(nameIndex);
      await cy.wait(1000);

      const secResponse = await fetchUsers();
      const secUsers = secResponse.users;
      const arturo2Exists = secUsers.some(user => user.name === 'Arturo2');
      expect(arturo2Exists).to.be.false;
    });

    

    



    
})
