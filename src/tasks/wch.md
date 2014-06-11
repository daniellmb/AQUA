# Watch Files

Watch for file changes and automatically run all but you end-to-end tests when something is updated. Great for those who use TDD and the Red &gt; Green &gt; Refactor pattern.

## Task

Use the `{id}-wch` task to file changes and automatically run your configured tasks. Where `{id}` is the project id you've configured in your aqua.project.json file.

## Configuration

Will run whatever you have configured, except end-to-end tests as they are typically slow and you typically don't want to trigger them every time you save a file.

To use this task you need to include the following required sections in your in your [aqua.project.json](https://github.com/daniellmb/AQUA#user-content-aquaprojectjson) file.

### Required

