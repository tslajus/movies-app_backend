# My Movies REST API

This project contains source code and supporting files for My Movies application back-end. It includes the following files and folders.

- .github - Deployment workflow.
- .husky - Git hooks configuration.
- src - Source code.
- tests - Unit tests for the application code.
- .eslintrc - static code analysis configuration.
- .gitignore - specifies which files should be omitted when commiting to the git repository.
- .npmignore - specifies which files should be omitted when publishing the package to NPM.
- .npmrc - instructions for NPM.
- .nvmrc - NodeJS version prefered for the project.
- .prettierrc - source code formatting configurations.
- Makefile - project build instructions needed during deployment.
- package-lock.json - Is automatically generated for any operations with project dependencies.
- package.json - This file holds various metadata relevant to the project, e.g.: dependencies, scripts, etc.
- template.yaml - A template that defines the application's AWS resources.
- tsconfig.json - A file that defines options for TypeScript compiliation.

## Start the application
Before starting application - make sure all project dependencies are installed:
```
npm install
```

Execute this command in terminal (cmd):
```
npm start
```
**Notes**: after any code changes you should restart the application.

## Stop the application

```
ctrl + c
```
