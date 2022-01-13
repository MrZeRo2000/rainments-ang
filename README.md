# RainmentsAng

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.21.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Install
npm install -g @angular/cli

## Start server
ng serve --open

## Install bootstrap
npm install bootstrap jquery --save

## Generate component
ng generate component password

## Generate service
ng generate service PassData

## Deploy
ng build --prod --base-href=/rainments-ang/
copy from dist to webapps directory

## Update angular to latest version
ng update @angular/cli @angular/core

## Update dependency to latest version
ng update ngx-bootstrap

## Run local json server
npm run server

## Run with int configuration
ng serve --configuration=int
npm run start-int

## Run one selected test file only
ng test --include=src/app/core/date-range-generator*.ts

## Run one test with browser headless
ng test --include=src/app/utils/*.ts --browsers=ChromeHeadless

## Testing and debugging in IntelliJ
install Karma plugin

## Full update angular to latest version
ng update @angular/cli @angular/core @angular/animations @angular/cdk @angular/common  @angular/compiler @angular/forms @angular/platform-browser @angular/platform-browser-dynamic @angular/router

## Update dev software to latest version
npm install @types/jasmine@latest @types/node@latest codelyzer@latest karma@latest karma-chrome-launcher@latest karma-cli@latest karma-jasmine@latest karma-jasmine-html-reporter@latest jasmine-core@latest jasmine-spec-reporter@latest protractor@latest tslint@latest webpack@latest rxjs-tslint@latest

## Install FontAwesome
npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/angular-fontawesome

## Powershell adjustment
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned

## Update from 12 to 13
npx @angular/cli@13 update @angular/core@13 @angular/cli@13 --force

## Install eslint instead of deprecated tspint
ng add @angular-eslint/schematics
ng g @angular-eslint/schematics:convert-tslint-to-eslint

## Upgrade to bootstrap 5 notes
remove jquery, popper from styles.css, package.json
add "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js" to styles.css
add "bootstrap": "^5.0.2", "ngx-bootstrap": "^8.0.0-RC.8"
classes: 
  text-left -> text-start
  text-right -> text-end
  mr-* -> me-*
  ml-* -> ms-*
browser-default custom-select -> form-select
custom-control-label -> form-label
badge-success -> bg-success
