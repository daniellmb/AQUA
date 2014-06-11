# Analyze Code Complexity

Analyze your JavaScript source code for maintainability and enforce complexity thresholds. Currently, it is able to report on the following complexity metrics: lines of code, number of parameters, cyclomatic complexity, cyclomatic complexity density, Halstead complexity measures, maintainability index, dependencies, first-order density, change cost and core size.

## Task

Use the `{id}-gpa` task to Analyze the JavaScript source configured in your (https://github.com/daniellmb/AQUA#aquaprojectjson)[aqua.project.json] file. Where `{id}` is the project id you've configured in your aqua.project.json file.

## Configuration

To use this task you need to include the following required sections in your in your [aqua.project.json](https://github.com/daniellmb/AQUA#user-content-aquaprojectjson) file.

### Required

The `src` option should be an array that specifies where to find all the JavaScript source code written for the project, excluding specs, end-to-end tests, configuration files etc.

### Lines of Code (LOC)

This can be either physical (a count of the actual lines in the file) or logical (a count of the imperative statements). The physical count is widely considered to be a less useful metric because it is easily subverted by collecting multiple statements on a single line of code. However it should be noted that the logical count can be similarly flawed, since the tersest expression of a solution is not necessarily the optimal one.

### Number of Parameters

Analysed statically from the function signature, so no accounting is made for functions that rely on the arguments object. Lower is better

### Cyclomatic Complexity

Defined by Thomas J. McCabe in 1976, this is a count of the number of cycles in the program flow control graph. Effectively the number of distinct paths through a block of code. Lower is better.

### Cyclomatic Complexity Density

Proposed as a modification to cyclomatic complexity by Geoffrey K. Gill and Chris F. Kemerer in 1991, this metric simply re-expresses it as a percentage of the logical lines of code. Lower is better.

### Halstead Complexity Measures

In 1977, Maurice Halstead developed a set of metrics which are calculated based on the number of distinct operators, the number of distinct operands, the total number of operators and the total number of operands in each function. This site picks out three Halstead measures in particular: difficulty, volume and effort.

### Difficulty

```
    (# distinct operators / 2) *
        (# operands / # distinct operands)
```

### Volume

```
    (# operators + # operands) *
        log2(# distinct operators + # distinct operands)
```

### Effort

```
    difficulty * volume
```

### Maintainability Index

Designed in 1991 by Paul Oman and Jack Hagemeister at the University of Idaho, this metric is calculated at the whole program or module level from averages of the other 3 metrics, using the following formula:
```
    171 -
        (3.42 * ln(mean effort)) -
        (0.23 * ln(mean cyclomatic complexity)) -
        (16.2 * ln(mean logical LOC))
```
Values are on a logarithmic scale ranging from negative infinity up to 171, with greater numbers indicating a higher level of maintainability. In their original paper, Oman and Hagemeister identified 65 as the threshold value below which a program should be considered difficult to maintain.

### Dependencies

A list of dependencies from calls to CommonJS and AMD require. Analysed statically from the function signature, so no accounting is made for dynamic calls where a variable or function is obscuring the nature of the dependency. Fewer is better.

### First-Order Density

The percentage of all possible internal dependencies that are actually realised in the project. Lower is better.

### Change Cost

The percentage of modules affected, on average, when one module in the project is changed. Lower is better.

### Core Size

The percentage of modules that are both widely depended on and themselves depend on other modules. Lower is better.

The key point with all of these metrics is that the prescribed threshold values should not be considered as definitive indicators of whether a particular piece of code is "too complex", whatever that might mean. Software development is a broad, varied practice and every project is subject to a unique set of countless environmental factors, rendering such general absolutes as essentially arbitrary. Further, complexity itself is such an amorphous, multi-dimensional continuum, that attempting to pigeon-hole chunks of code at discrete points along a single axis is an intrinsically crude model.

It is better to use them as a somewhat fuzzy, high-level mechanism, which can identify regions of potential interest or concern and from which your own programming- and domain-expertise can take over for a more comprehensive analysis. (source: jscomplexity.org)