


/**
Page object that defines the to do app interactions for end-to-end integration tests.
@constructor
*/
var ToDo = function() {
  var page = this;

  /**
  Load the to do app page
  @param {string=} opt_params - optional query string parameters to include.
  @return {ToDo}
  */
  this.get = function(opt_params) {
    browser.get('/AQUA/demos/angularjs' + (opt_params || ''));
    return page;
  };

  // define element selectors
  var newToDoLocator = by.id('new-todo'),
      todoItemsLocator = by.css('#todo-list li');

  // define methods for interacting with the elements

  /**
  The page display a list todos.
  @return {number} the number of todos in the list
  */
  this.listSize = function() {
    return element.all(todoItemsLocator).count();
  };

  /**
  The to do page allows the user to type a to do into the new to do field
  @param {string} task - the task to type in.
  @return {ToDo}
  */
  this.typeToDo = function(task) {
    // This is the only place that "knows" how to enter a new to do
    element(newToDoLocator).sendKeys(task, protractor.Key.ENTER);

    // Return the current page object as this action doesn't navigate to a page represented by another PageObject
    return page;
  };
};


/** export page object */
module.exports = new ToDo();
