# Create NEAR App

Create web app running on NEAR Protocol blockchain with zero configuration required.

Both plain JS and React templates are available. The default generator is for react project

## Usage

In command line, run different command to build different blank project:

React JS app:
```bash
npx create-near-app path/to/your/new-awesome-app
```
Plain app:
```bash
npx create-near-app --vanilla path/to/your/new-awesome-app
```

With initialization command:

React JS app:
```bash
npm init near-app path/to/your/new-awesome-app
```
Plain app:
```bash
npm init near-app --vanilla path/to/your/new-awesome-app
```

If yarn is installed:

React JS app:
```bash
yarn create near-app path/to/your/new-awesome-app
```
Plain app:
```bash
yarn create near-app --vanilla path/to/your/new-awesome-app
```

## Caveats

Make sure to keep `nearlib` and `near-shell` dependencies up to date to avoid issues.
