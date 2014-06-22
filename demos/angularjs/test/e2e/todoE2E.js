describe('todo app', function() {
  'use strict';

  // get the page object
  var page = require('./pgobj/todo.js');

  beforeEach(function() {
    // load page under test
    page.get();
  });

  // fail test if uncaught exception was thrown
  afterEach(failIfJSError);

  it('should start with no todos in the list', function() {
    // arrange
    // act
    // assert
    expect(page.listSize()).toBe(0);
  });

  it('should add a new todo to the list', function() {
    // arrange
    // act
    page.typeToDo('Mow the front yard');
    // assert
    expect(page.listSize()).toBe(1);
  });

});
