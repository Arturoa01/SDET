class index{

    elements = {
        headerTitle: () => cy.get('.app-header'),

        nameInput: () => cy.get('#name'),
        createButton: () => cy.get('.form-submit-btn'),

        tableLine: () => cy.get('tbody > tr'),
        cellByLine: () => page.tableLine().find(' > td'),
        editButton: () => page.cellByLine().contains('button', 'Edit'),
        deleteButton: () => page.cellByLine().contains('button', 'Delete'),

        
        invalidUsernameMessage: () => cy.get('h3[data-test="error"]')
    }

    typeNameInput(username){
        this.elements.nameInput().type(username);
    }
    clickCreateButton(){
        this.elements.createButton().click();
    }
    clickEditButton(nameIndex){
        const lineNumber = cy.get(`tbody > tr:nth-child(${nameIndex + 1}) > td > button:nth-child(1)`);
        lineNumber.click();
    }
    clickDeleteButton(nameIndex){
        const lineNumber = cy.get(`tbody > tr:nth-child(${nameIndex + 1}) > td > button:nth-child(2)`);
        lineNumber.click();
    }

}

module.exports = new index();