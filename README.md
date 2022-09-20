# Wolox bootstrap

Create Angular-CLI project, configure Jest for Unit test and add ESLint.


## How use 

- Initialize a project.

This schematic creates a new Angular workspace and runs the [`add-linter`](#add-linter-to-an-existing-workspace) schematic.

```bash
schematics wolox-angular-bootstrap:initialize
```

- #### Add linter to an existing workspace

If you have a workspace created first with a `ng new` and you want to add only the linter, you must have to run the next command.

_Note: This schematic adds typescript and angular rules for linter_

```bash
schematics wolox-angular-bootstrap:add-linter
```

## Prerequisites 

- Node ^v14.x.x
```bash
  npm i node@lts
```

- If using nvm
```bash
  npm i -g npm
```

- Angular CLI ^14.0.0

```bash
  npm install -g @angular/cli
```

- Install Angular schematics CLI

```bash
npm i -g @angular-devkit/schematics-cli
```

- Install Angular schematics

```bash
npm i -g @schematics/angular
```

- Install Wolox bootstrap

```bash
npm i -g wolox-angular-bootstrap
```

### **Considerations**

You need to have the [ESLint](vscode:extension/dbaeumer.vscode-eslint) extension installed and enabled in your VSCode.
