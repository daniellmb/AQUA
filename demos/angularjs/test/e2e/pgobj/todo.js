/**
Page object that defines the todo app interactions for end-to-end integration tests.
@constructor
*/
var ToDo = function () {
    var page = this;

    /**
    Load the todo app page
    @param {?string} params - optional query string parameters to include.
    @returns {ToDo}
    */
    this.get = function (params) {
        browser.get('/xNet/Mainsite/RandD/testing?' + (params || ''));
        return page;
    };

    // define element selectors
    var newToDoLocator = by.id('new-todo'),
        todoListLocator = by.id('todo-list'),
        todoItemsLocator = by.css('#todo-list li');

    // define methods for interacting with the elements    

    /**
    The page display a list todos.
    @returns {number} the number of todos in the list
    */
    this.listSize = function () {
        return element.all(todoItemsLocator).count();
    };

    /**
    The todo page allows the user to type a todo into the new todo field
    @param {string} task - the task to type in.
    @returns {ToDo}
    */
    this.typeToDo = function (task) {
        // This is the only place that "knows" how to enter a new todo
        element(newToDoLocator).sendKeys(task, protractor.Key.ENTER);

        // Return the current page object as this action doesn't navigate to a page represented by another PageObject
        return page;
    };
};

module.exports = new ToDo();