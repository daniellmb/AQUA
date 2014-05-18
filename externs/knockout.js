/**
 * Define the knockout API.
 * @externs
 */

var ko = {};

ko.observable = function (initialValue) { };
ko.dependentObservable = function (evaluatorFunctionOrOptions, evaluatorFunctionTarget, options) { };
ko.computed = ko.dependentObservable;
ko.observableArray = function (initialValues) { };
ko.applyBindings = function (viewModel, rootNode) { };
ko.setTemplateEngine = function (templateEngine) { };
ko.nativeTemplateEngine = function () { };
ko.dataFor = function (element) { };
ko.contextFor = function (element) { };
ko.nativeTemplateEngine.prototype.makeTemplateSource = function (template, templateDocument) { };
ko.utils = {};
ko.utils.isIe6 = {};
ko.utils.isIe7 = {};
ko.utils.ieVersion = {};
ko.utils.arrayForEach = function (array, action) { };
ko.utils.arrayIndexOf = function (array, item) { };
ko.utils.arrayFirst = function (array, predicate, predicateOwner) { };
ko.utils.arrayRemoveItem = function (array, itemToRemove) { };
ko.utils.arrayGetDistinctValues = function (array) { };
ko.utils.arrayMap = function (array, mapping) { };
ko.utils.arrayFilter = function (array, predicate) { };
ko.utils.arrayPushAll = function (array, valuesToPush) { };
ko.utils.extend = function (target, source) { };
ko.utils.emptyDomNode = function (domNode) { };
ko.utils.moveCleanedNodesToContainerElement = function (nodes) { };
ko.utils.setDomNodeChildren = function (domNode, childNodes) { };
ko.utils.replaceDomNodes = function (nodeToReplaceOrNodeArray, newNodesArray) { };
ko.utils.setOptionNodeSelectionState = function (optionNode, isSelected) { };
ko.utils.stringTrim = function (string) { };
ko.utils.stringTokenize = function (string, delimiter) { };
ko.utils.stringStartsWith = function (string, startsWith) { };
ko.utils.buildEvalWithinScopeFunction = function (expression, scopeLevels) { };
ko.utils.domNodeIsContainedBy = function (node, containedByNode) { };
ko.utils.domNodeIsAttachedToDocument = function (node) { };
ko.utils.tagNameLower = function (element) { };
ko.utils.registerEventHandler = function (element, eventType, handler) { };
ko.utils.triggerEvent = function (element, eventType) { };
ko.utils.unwrapObservable = function (value) { };
ko.utils.toggleDomNodeCssClass = function (node, className, shouldHaveClass) { };
ko.utils.setTextContent = function (element, textContent) { };
ko.utils.ensureSelectElementIsRenderedCorrectly = function (selectElement) { };
ko.utils.range = function (min, max) { };
ko.utils.makeArray = function (arrayLikeObject) { };
ko.utils.getFormFields = function (form, fieldName) { };
ko.utils.parseJson = function (jsonString) { };
ko.utils.stringifyJson = function (data, replacer, space) { };
ko.utils.postJson = function (urlOrForm, data, options) { };