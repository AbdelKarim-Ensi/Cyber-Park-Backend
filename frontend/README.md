# Frontend

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.2.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  └─ sweet-alert.ts
│  │  ├─ pages
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  └─ announcements.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  └─ attendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.spec.ts
│  │  │  │  │  └─ departments.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  ├─ leaves.spec.ts
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  └─ projects.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  └─ notfound
│  │  │     ├─ notfound.css
│  │  │     ├─ notfound.html
│  │  │     ├─ notfound.spec.ts
│  │  │     └─ notfound.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  └─ sweet-alert.ts
│  │  ├─ pages
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  └─ announcements.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  └─ attendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.spec.ts
│  │  │  │  │  └─ departments.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  ├─ leaves.spec.ts
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  └─ projects.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  └─ notfound
│  │  │     ├─ notfound.css
│  │  │     ├─ notfound.html
│  │  │     ├─ notfound.spec.ts
│  │  │     └─ notfound.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  └─ sweet-alert.ts
│  │  ├─ pages
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  └─ announcements.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  └─ attendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ ajoute-department
│  │  │  │  │  │  ├─ ajoute-department.css
│  │  │  │  │  │  ├─ ajoute-department.html
│  │  │  │  │  │  └─ ajoute-department.ts
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.ts
│  │  │  │  │  └─ update-department
│  │  │  │  │     ├─ update-department.css
│  │  │  │  │     ├─ update-department.html
│  │  │  │  │     └─ update-department.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  ├─ leaves.spec.ts
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  └─ projects.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  └─ notfound
│  │  │     ├─ notfound.css
│  │  │     ├─ notfound.html
│  │  │     ├─ notfound.spec.ts
│  │  │     └─ notfound.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  └─ sweet-alert.ts
│  │  ├─ pages
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  └─ announcements.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  └─ attendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ ajoute-department
│  │  │  │  │  │  ├─ ajoute-department.css
│  │  │  │  │  │  ├─ ajoute-department.html
│  │  │  │  │  │  └─ ajoute-department.ts
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.ts
│  │  │  │  │  └─ update-department
│  │  │  │  │     ├─ update-department.css
│  │  │  │  │     ├─ update-department.html
│  │  │  │  │     └─ update-department.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ ajout-conge
│  │  │  │  │  │  ├─ ajout-conge.css
│  │  │  │  │  │  ├─ ajout-conge.html
│  │  │  │  │  │  └─ ajout-conge.ts
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  └─ projects.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  └─ notfound
│  │  │     ├─ notfound.css
│  │  │     ├─ notfound.html
│  │  │     ├─ notfound.spec.ts
│  │  │     └─ notfound.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  └─ sweet-alert.ts
│  │  ├─ pages
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  └─ announcements.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  └─ attendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ ajoute-department
│  │  │  │  │  │  ├─ ajoute-department.css
│  │  │  │  │  │  ├─ ajoute-department.html
│  │  │  │  │  │  └─ ajoute-department.ts
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.ts
│  │  │  │  │  └─ update-department
│  │  │  │  │     ├─ update-department.css
│  │  │  │  │     ├─ update-department.html
│  │  │  │  │     └─ update-department.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ ajout-conge
│  │  │  │  │  │  ├─ ajout-conge.css
│  │  │  │  │  │  ├─ ajout-conge.html
│  │  │  │  │  │  └─ ajout-conge.ts
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  └─ projects.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  └─ notfound
│  │  │     ├─ notfound.css
│  │  │     ├─ notfound.html
│  │  │     ├─ notfound.spec.ts
│  │  │     └─ notfound.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ profil.spec.ts
│  │  │  │  ├─ profil.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  ├─ sweet-alert.ts
│  │  │  ├─ timer.spec.ts
│  │  │  └─ timer.ts
│  │  ├─ pages
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ ajoutannouncement
│  │  │  │  │  │  ├─ ajoutannouncement.css
│  │  │  │  │  │  ├─ ajoutannouncement.html
│  │  │  │  │  │  ├─ ajoutannouncement.spec.ts
│  │  │  │  │  │  └─ ajoutannouncement.ts
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  ├─ announcements.ts
│  │  │  │  │  └─ updateannouncement
│  │  │  │  │     ├─ updateannouncement.css
│  │  │  │  │     ├─ updateannouncement.html
│  │  │  │  │     ├─ updateannouncement.spec.ts
│  │  │  │  │     └─ updateannouncement.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ ajoutattendance
│  │  │  │  │  │  ├─ ajoutattendance.css
│  │  │  │  │  │  ├─ ajoutattendance.html
│  │  │  │  │  │  ├─ ajoutattendance.spec.ts
│  │  │  │  │  │  └─ ajoutattendance.ts
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  ├─ attendance.ts
│  │  │  │  │  └─ updateattendance
│  │  │  │  │     ├─ updateattendance.css
│  │  │  │  │     ├─ updateattendance.html
│  │  │  │  │     ├─ updateattendance.spec.ts
│  │  │  │  │     └─ updateattendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ ajoute-department
│  │  │  │  │  │  ├─ ajoute-department.css
│  │  │  │  │  │  ├─ ajoute-department.html
│  │  │  │  │  │  └─ ajoute-department.ts
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.ts
│  │  │  │  │  └─ update-department
│  │  │  │  │     ├─ update-department.css
│  │  │  │  │     ├─ update-department.html
│  │  │  │  │     └─ update-department.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ ajout-conge
│  │  │  │  │  │  ├─ ajout-conge.css
│  │  │  │  │  │  ├─ ajout-conge.html
│  │  │  │  │  │  └─ ajout-conge.ts
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ profil
│  │  │  │  │  ├─ profil.css
│  │  │  │  │  ├─ profil.html
│  │  │  │  │  ├─ profil.spec.ts
│  │  │  │  │  └─ profil.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ ajoutproject
│  │  │  │  │  │  ├─ ajoutproject.css
│  │  │  │  │  │  ├─ ajoutproject.html
│  │  │  │  │  │  ├─ ajoutproject.spec.ts
│  │  │  │  │  │  └─ ajoutproject.ts
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  ├─ projects.ts
│  │  │  │  │  └─ updateproject
│  │  │  │  │     ├─ updateproject.css
│  │  │  │  │     ├─ updateproject.html
│  │  │  │  │     ├─ updateproject.spec.ts
│  │  │  │  │     └─ updateproject.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ ajoutsalary
│  │  │  │     │  ├─ ajoutsalary.css
│  │  │  │     │  ├─ ajoutsalary.html
│  │  │  │     │  ├─ ajoutsalary.spec.ts
│  │  │  │     │  └─ ajoutsalary.ts
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  ├─ notfound
│  │  │  │  ├─ notfound.css
│  │  │  │  ├─ notfound.html
│  │  │  │  ├─ notfound.spec.ts
│  │  │  │  └─ notfound.ts
│  │  │  └─ register
│  │  │     ├─ register.css
│  │  │     ├─ register.html
│  │  │     ├─ register.spec.ts
│  │  │     └─ register.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ profil.spec.ts
│  │  │  │  ├─ profil.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  ├─ sweet-alert.ts
│  │  │  ├─ timer.spec.ts
│  │  │  └─ timer.ts
│  │  ├─ pages
│  │  │  ├─ forgot-password
│  │  │  │  ├─ forgot-password.css
│  │  │  │  ├─ forgot-password.html
│  │  │  │  ├─ forgot-password.spec.ts
│  │  │  │  └─ forgot-password.ts
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ ajoutannouncement
│  │  │  │  │  │  ├─ ajoutannouncement.css
│  │  │  │  │  │  ├─ ajoutannouncement.html
│  │  │  │  │  │  ├─ ajoutannouncement.spec.ts
│  │  │  │  │  │  └─ ajoutannouncement.ts
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  ├─ announcements.ts
│  │  │  │  │  └─ updateannouncement
│  │  │  │  │     ├─ updateannouncement.css
│  │  │  │  │     ├─ updateannouncement.html
│  │  │  │  │     ├─ updateannouncement.spec.ts
│  │  │  │  │     └─ updateannouncement.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ ajoutattendance
│  │  │  │  │  │  ├─ ajoutattendance.css
│  │  │  │  │  │  ├─ ajoutattendance.html
│  │  │  │  │  │  ├─ ajoutattendance.spec.ts
│  │  │  │  │  │  └─ ajoutattendance.ts
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  ├─ attendance.ts
│  │  │  │  │  └─ updateattendance
│  │  │  │  │     ├─ updateattendance.css
│  │  │  │  │     ├─ updateattendance.html
│  │  │  │  │     ├─ updateattendance.spec.ts
│  │  │  │  │     └─ updateattendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ ajoute-department
│  │  │  │  │  │  ├─ ajoute-department.css
│  │  │  │  │  │  ├─ ajoute-department.html
│  │  │  │  │  │  └─ ajoute-department.ts
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.ts
│  │  │  │  │  └─ update-department
│  │  │  │  │     ├─ update-department.css
│  │  │  │  │     ├─ update-department.html
│  │  │  │  │     └─ update-department.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ ajout-conge
│  │  │  │  │  │  ├─ ajout-conge.css
│  │  │  │  │  │  ├─ ajout-conge.html
│  │  │  │  │  │  └─ ajout-conge.ts
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ profil
│  │  │  │  │  ├─ profil.css
│  │  │  │  │  ├─ profil.html
│  │  │  │  │  ├─ profil.spec.ts
│  │  │  │  │  ├─ profil.ts
│  │  │  │  │  └─ reset-password
│  │  │  │  │     ├─ reset-password.css
│  │  │  │  │     ├─ reset-password.html
│  │  │  │  │     ├─ reset-password.spec.ts
│  │  │  │  │     └─ reset-password.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ ajoutproject
│  │  │  │  │  │  ├─ ajoutproject.css
│  │  │  │  │  │  ├─ ajoutproject.html
│  │  │  │  │  │  ├─ ajoutproject.spec.ts
│  │  │  │  │  │  └─ ajoutproject.ts
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  ├─ projects.ts
│  │  │  │  │  └─ updateproject
│  │  │  │  │     ├─ updateproject.css
│  │  │  │  │     ├─ updateproject.html
│  │  │  │  │     ├─ updateproject.spec.ts
│  │  │  │  │     └─ updateproject.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ ajoutsalary
│  │  │  │     │  ├─ ajoutsalary.css
│  │  │  │     │  ├─ ajoutsalary.html
│  │  │  │     │  ├─ ajoutsalary.spec.ts
│  │  │  │     │  └─ ajoutsalary.ts
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  ├─ notfound
│  │  │  │  ├─ notfound.css
│  │  │  │  ├─ notfound.html
│  │  │  │  ├─ notfound.spec.ts
│  │  │  │  └─ notfound.ts
│  │  │  └─ register
│  │  │     ├─ register.css
│  │  │     ├─ register.html
│  │  │     ├─ register.spec.ts
│  │  │     └─ register.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ firebase-config.ts
│  │  │  │  ├─ google-auth.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ profil.spec.ts
│  │  │  │  ├─ profil.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  ├─ sweet-alert.ts
│  │  │  ├─ timer.spec.ts
│  │  │  └─ timer.ts
│  │  ├─ pages
│  │  │  ├─ forgot-password
│  │  │  │  ├─ forgot-password.css
│  │  │  │  ├─ forgot-password.html
│  │  │  │  ├─ forgot-password.spec.ts
│  │  │  │  └─ forgot-password.ts
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ ajoutannouncement
│  │  │  │  │  │  ├─ ajoutannouncement.css
│  │  │  │  │  │  ├─ ajoutannouncement.html
│  │  │  │  │  │  ├─ ajoutannouncement.spec.ts
│  │  │  │  │  │  └─ ajoutannouncement.ts
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  ├─ announcements.ts
│  │  │  │  │  └─ updateannouncement
│  │  │  │  │     ├─ updateannouncement.css
│  │  │  │  │     ├─ updateannouncement.html
│  │  │  │  │     ├─ updateannouncement.spec.ts
│  │  │  │  │     └─ updateannouncement.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ ajoutattendance
│  │  │  │  │  │  ├─ ajoutattendance.css
│  │  │  │  │  │  ├─ ajoutattendance.html
│  │  │  │  │  │  ├─ ajoutattendance.spec.ts
│  │  │  │  │  │  └─ ajoutattendance.ts
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  ├─ attendance.ts
│  │  │  │  │  └─ updateattendance
│  │  │  │  │     ├─ updateattendance.css
│  │  │  │  │     ├─ updateattendance.html
│  │  │  │  │     ├─ updateattendance.spec.ts
│  │  │  │  │     └─ updateattendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ ajoute-department
│  │  │  │  │  │  ├─ ajoute-department.css
│  │  │  │  │  │  ├─ ajoute-department.html
│  │  │  │  │  │  └─ ajoute-department.ts
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.ts
│  │  │  │  │  └─ update-department
│  │  │  │  │     ├─ update-department.css
│  │  │  │  │     ├─ update-department.html
│  │  │  │  │     └─ update-department.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ ajout-conge
│  │  │  │  │  │  ├─ ajout-conge.css
│  │  │  │  │  │  ├─ ajout-conge.html
│  │  │  │  │  │  └─ ajout-conge.ts
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ profil
│  │  │  │  │  ├─ profil.css
│  │  │  │  │  ├─ profil.html
│  │  │  │  │  ├─ profil.spec.ts
│  │  │  │  │  └─ profil.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ ajoutproject
│  │  │  │  │  │  ├─ ajoutproject.css
│  │  │  │  │  │  ├─ ajoutproject.html
│  │  │  │  │  │  ├─ ajoutproject.spec.ts
│  │  │  │  │  │  └─ ajoutproject.ts
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  ├─ projects.ts
│  │  │  │  │  └─ updateproject
│  │  │  │  │     ├─ updateproject.css
│  │  │  │  │     ├─ updateproject.html
│  │  │  │  │     ├─ updateproject.spec.ts
│  │  │  │  │     └─ updateproject.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ ajoutsalary
│  │  │  │     │  ├─ ajoutsalary.css
│  │  │  │     │  ├─ ajoutsalary.html
│  │  │  │     │  ├─ ajoutsalary.spec.ts
│  │  │  │     │  └─ ajoutsalary.ts
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  ├─ notfound
│  │  │  │  ├─ notfound.css
│  │  │  │  ├─ notfound.html
│  │  │  │  ├─ notfound.spec.ts
│  │  │  │  └─ notfound.ts
│  │  │  ├─ register
│  │  │  │  ├─ register.css
│  │  │  │  ├─ register.html
│  │  │  │  ├─ register.spec.ts
│  │  │  │  └─ register.ts
│  │  │  └─ reset-password
│  │  │     ├─ reset-password.css
│  │  │     ├─ reset-password.html
│  │  │     ├─ reset-password.spec.ts
│  │  │     └─ reset-password.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ firebase-config.ts
│  │  │  │  ├─ google-auth.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ profil.spec.ts
│  │  │  │  ├─ profil.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  ├─ sweet-alert.ts
│  │  │  ├─ timer.spec.ts
│  │  │  └─ timer.ts
│  │  ├─ pages
│  │  │  ├─ forgot-password
│  │  │  │  ├─ forgot-password.css
│  │  │  │  ├─ forgot-password.html
│  │  │  │  ├─ forgot-password.spec.ts
│  │  │  │  └─ forgot-password.ts
│  │  │  ├─ home
│  │  │  │  ├─ announcements
│  │  │  │  │  ├─ ajoutannouncement
│  │  │  │  │  │  ├─ ajoutannouncement.css
│  │  │  │  │  │  ├─ ajoutannouncement.html
│  │  │  │  │  │  ├─ ajoutannouncement.spec.ts
│  │  │  │  │  │  └─ ajoutannouncement.ts
│  │  │  │  │  ├─ announcements.css
│  │  │  │  │  ├─ announcements.html
│  │  │  │  │  ├─ announcements.spec.ts
│  │  │  │  │  ├─ announcements.ts
│  │  │  │  │  └─ updateannouncement
│  │  │  │  │     ├─ updateannouncement.css
│  │  │  │  │     ├─ updateannouncement.html
│  │  │  │  │     ├─ updateannouncement.spec.ts
│  │  │  │  │     └─ updateannouncement.ts
│  │  │  │  ├─ attendance
│  │  │  │  │  ├─ ajoutattendance
│  │  │  │  │  │  ├─ ajoutattendance.css
│  │  │  │  │  │  ├─ ajoutattendance.html
│  │  │  │  │  │  ├─ ajoutattendance.spec.ts
│  │  │  │  │  │  └─ ajoutattendance.ts
│  │  │  │  │  ├─ attendance.css
│  │  │  │  │  ├─ attendance.html
│  │  │  │  │  ├─ attendance.spec.ts
│  │  │  │  │  ├─ attendance.ts
│  │  │  │  │  └─ updateattendance
│  │  │  │  │     ├─ updateattendance.css
│  │  │  │  │     ├─ updateattendance.html
│  │  │  │  │     ├─ updateattendance.spec.ts
│  │  │  │  │     └─ updateattendance.ts
│  │  │  │  ├─ dashboard
│  │  │  │  │  ├─ dashboard.css
│  │  │  │  │  ├─ dashboard.html
│  │  │  │  │  ├─ dashboard.spec.ts
│  │  │  │  │  └─ dashboard.ts
│  │  │  │  ├─ departments
│  │  │  │  │  ├─ ajoute-department
│  │  │  │  │  │  ├─ ajoute-department.css
│  │  │  │  │  │  ├─ ajoute-department.html
│  │  │  │  │  │  └─ ajoute-department.ts
│  │  │  │  │  ├─ departments.css
│  │  │  │  │  ├─ departments.html
│  │  │  │  │  ├─ departments.ts
│  │  │  │  │  └─ update-department
│  │  │  │  │     ├─ update-department.css
│  │  │  │  │     ├─ update-department.html
│  │  │  │  │     └─ update-department.ts
│  │  │  │  ├─ employees
│  │  │  │  │  ├─ ajoute-employee
│  │  │  │  │  │  ├─ ajoute-employee.css
│  │  │  │  │  │  ├─ ajoute-employee.html
│  │  │  │  │  │  └─ ajoute-employee.ts
│  │  │  │  │  ├─ employees.css
│  │  │  │  │  ├─ employees.html
│  │  │  │  │  ├─ employees.ts
│  │  │  │  │  └─ update-employee
│  │  │  │  │     ├─ update-employee.css
│  │  │  │  │     ├─ update-employee.html
│  │  │  │  │     └─ update-employee.ts
│  │  │  │  ├─ home.css
│  │  │  │  ├─ home.html
│  │  │  │  ├─ home.ts
│  │  │  │  ├─ leaves
│  │  │  │  │  ├─ ajout-conge
│  │  │  │  │  │  ├─ ajout-conge.css
│  │  │  │  │  │  ├─ ajout-conge.html
│  │  │  │  │  │  └─ ajout-conge.ts
│  │  │  │  │  ├─ leaves.css
│  │  │  │  │  ├─ leaves.html
│  │  │  │  │  └─ leaves.ts
│  │  │  │  ├─ profil
│  │  │  │  │  ├─ profil.css
│  │  │  │  │  ├─ profil.html
│  │  │  │  │  ├─ profil.spec.ts
│  │  │  │  │  └─ profil.ts
│  │  │  │  ├─ projects
│  │  │  │  │  ├─ ajoutproject
│  │  │  │  │  │  ├─ ajoutproject.css
│  │  │  │  │  │  ├─ ajoutproject.html
│  │  │  │  │  │  ├─ ajoutproject.spec.ts
│  │  │  │  │  │  └─ ajoutproject.ts
│  │  │  │  │  ├─ projects.css
│  │  │  │  │  ├─ projects.html
│  │  │  │  │  ├─ projects.spec.ts
│  │  │  │  │  ├─ projects.ts
│  │  │  │  │  └─ updateproject
│  │  │  │  │     ├─ updateproject.css
│  │  │  │  │     ├─ updateproject.html
│  │  │  │  │     ├─ updateproject.spec.ts
│  │  │  │  │     └─ updateproject.ts
│  │  │  │  └─ salary-advances
│  │  │  │     ├─ ajoutsalary
│  │  │  │     │  ├─ ajoutsalary.css
│  │  │  │     │  ├─ ajoutsalary.html
│  │  │  │     │  ├─ ajoutsalary.spec.ts
│  │  │  │     │  └─ ajoutsalary.ts
│  │  │  │     ├─ salary-advances.css
│  │  │  │     ├─ salary-advances.html
│  │  │  │     ├─ salary-advances.spec.ts
│  │  │  │     └─ salary-advances.ts
│  │  │  ├─ landing
│  │  │  │  ├─ landing.css
│  │  │  │  ├─ landing.html
│  │  │  │  ├─ landing.spec.ts
│  │  │  │  └─ landing.ts
│  │  │  ├─ login
│  │  │  │  ├─ login.css
│  │  │  │  ├─ login.html
│  │  │  │  └─ login.ts
│  │  │  ├─ notfound
│  │  │  │  ├─ notfound.css
│  │  │  │  ├─ notfound.html
│  │  │  │  ├─ notfound.spec.ts
│  │  │  │  └─ notfound.ts
│  │  │  ├─ register
│  │  │  │  ├─ register.css
│  │  │  │  ├─ register.html
│  │  │  │  ├─ register.spec.ts
│  │  │  │  └─ register.ts
│  │  │  └─ reset-password
│  │  │     ├─ reset-password.css
│  │  │     ├─ reset-password.html
│  │  │     ├─ reset-password.spec.ts
│  │  │     └─ reset-password.ts
│  │  └─ shared
│  │     └─ layout
│  │        ├─ my-component
│  │        │  ├─ my-component.css
│  │        │  ├─ my-component.html
│  │        │  ├─ my-component.spec.ts
│  │        │  └─ my-component.ts
│  │        ├─ navbar
│  │        │  ├─ navbar.css
│  │        │  ├─ navbar.html
│  │        │  ├─ navbar.spec.ts
│  │        │  └─ navbar.ts
│  │        └─ sidebar
│  │           ├─ sidebar.css
│  │           ├─ sidebar.html
│  │           ├─ sidebar.spec.ts
│  │           └─ sidebar.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ chatbot.spec.ts
│  │  │  │  ├─ chatbot.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ firebase-config.ts
│  │  │  │  ├─ google-auth.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ profil.spec.ts
│  │  │  │  ├─ profil.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  ├─ sweet-alert.ts
│  │  │  ├─ timer.spec.ts
│  │  │  └─ timer.ts
│  │  └─ pages
│  │     ├─ forgot-password
│  │     │  ├─ forgot-password.css
│  │     │  ├─ forgot-password.html
│  │     │  ├─ forgot-password.spec.ts
│  │     │  └─ forgot-password.ts
│  │     ├─ home
│  │     │  ├─ announcements
│  │     │  │  ├─ ajoutannouncement
│  │     │  │  │  ├─ ajoutannouncement.css
│  │     │  │  │  ├─ ajoutannouncement.html
│  │     │  │  │  ├─ ajoutannouncement.spec.ts
│  │     │  │  │  └─ ajoutannouncement.ts
│  │     │  │  ├─ announcements.css
│  │     │  │  ├─ announcements.html
│  │     │  │  ├─ announcements.spec.ts
│  │     │  │  ├─ announcements.ts
│  │     │  │  └─ updateannouncement
│  │     │  │     ├─ updateannouncement.css
│  │     │  │     ├─ updateannouncement.html
│  │     │  │     ├─ updateannouncement.spec.ts
│  │     │  │     └─ updateannouncement.ts
│  │     │  ├─ attendance
│  │     │  │  ├─ ajoutattendance
│  │     │  │  │  ├─ ajoutattendance.css
│  │     │  │  │  ├─ ajoutattendance.html
│  │     │  │  │  ├─ ajoutattendance.spec.ts
│  │     │  │  │  └─ ajoutattendance.ts
│  │     │  │  ├─ attendance.css
│  │     │  │  ├─ attendance.html
│  │     │  │  ├─ attendance.spec.ts
│  │     │  │  ├─ attendance.ts
│  │     │  │  └─ updateattendance
│  │     │  │     ├─ updateattendance.css
│  │     │  │     ├─ updateattendance.html
│  │     │  │     ├─ updateattendance.spec.ts
│  │     │  │     └─ updateattendance.ts
│  │     │  ├─ chatbot
│  │     │  │  ├─ chatbot.css
│  │     │  │  ├─ chatbot.html
│  │     │  │  ├─ chatbot.spec.ts
│  │     │  │  └─ chatbot.ts
│  │     │  ├─ dashboard
│  │     │  │  ├─ dashboard.css
│  │     │  │  ├─ dashboard.html
│  │     │  │  ├─ dashboard.spec.ts
│  │     │  │  └─ dashboard.ts
│  │     │  ├─ departments
│  │     │  │  ├─ ajoute-department
│  │     │  │  │  ├─ ajoute-department.css
│  │     │  │  │  ├─ ajoute-department.html
│  │     │  │  │  └─ ajoute-department.ts
│  │     │  │  ├─ departments.css
│  │     │  │  ├─ departments.html
│  │     │  │  ├─ departments.ts
│  │     │  │  └─ update-department
│  │     │  │     ├─ update-department.css
│  │     │  │     ├─ update-department.html
│  │     │  │     └─ update-department.ts
│  │     │  ├─ employees
│  │     │  │  ├─ ajoute-employee
│  │     │  │  │  ├─ ajoute-employee.css
│  │     │  │  │  ├─ ajoute-employee.html
│  │     │  │  │  └─ ajoute-employee.ts
│  │     │  │  ├─ employees.css
│  │     │  │  ├─ employees.html
│  │     │  │  ├─ employees.ts
│  │     │  │  └─ update-employee
│  │     │  │     ├─ update-employee.css
│  │     │  │     ├─ update-employee.html
│  │     │  │     └─ update-employee.ts
│  │     │  ├─ home.css
│  │     │  ├─ home.html
│  │     │  ├─ home.ts
│  │     │  ├─ leaves
│  │     │  │  ├─ ajout-conge
│  │     │  │  │  ├─ ajout-conge.css
│  │     │  │  │  ├─ ajout-conge.html
│  │     │  │  │  └─ ajout-conge.ts
│  │     │  │  ├─ leaves.css
│  │     │  │  ├─ leaves.html
│  │     │  │  └─ leaves.ts
│  │     │  ├─ profil
│  │     │  │  ├─ profil.css
│  │     │  │  ├─ profil.html
│  │     │  │  ├─ profil.spec.ts
│  │     │  │  └─ profil.ts
│  │     │  ├─ projects
│  │     │  │  ├─ ajoutproject
│  │     │  │  │  ├─ ajoutproject.css
│  │     │  │  │  ├─ ajoutproject.html
│  │     │  │  │  ├─ ajoutproject.spec.ts
│  │     │  │  │  └─ ajoutproject.ts
│  │     │  │  ├─ projects.css
│  │     │  │  ├─ projects.html
│  │     │  │  ├─ projects.spec.ts
│  │     │  │  ├─ projects.ts
│  │     │  │  └─ updateproject
│  │     │  │     ├─ updateproject.css
│  │     │  │     ├─ updateproject.html
│  │     │  │     ├─ updateproject.spec.ts
│  │     │  │     └─ updateproject.ts
│  │     │  └─ salary-advances
│  │     │     ├─ ajoutsalary
│  │     │     │  ├─ ajoutsalary.css
│  │     │     │  ├─ ajoutsalary.html
│  │     │     │  ├─ ajoutsalary.spec.ts
│  │     │     │  └─ ajoutsalary.ts
│  │     │     ├─ salary-advances.css
│  │     │     ├─ salary-advances.html
│  │     │     ├─ salary-advances.spec.ts
│  │     │     └─ salary-advances.ts
│  │     ├─ landing
│  │     │  ├─ landing.css
│  │     │  ├─ landing.html
│  │     │  ├─ landing.spec.ts
│  │     │  └─ landing.ts
│  │     ├─ login
│  │     │  ├─ login.css
│  │     │  ├─ login.html
│  │     │  └─ login.ts
│  │     ├─ notfound
│  │     │  ├─ notfound.css
│  │     │  ├─ notfound.html
│  │     │  ├─ notfound.spec.ts
│  │     │  └─ notfound.ts
│  │     ├─ register
│  │     │  ├─ register.css
│  │     │  ├─ register.html
│  │     │  ├─ register.spec.ts
│  │     │  └─ register.ts
│  │     └─ reset-password
│  │        ├─ reset-password.css
│  │        ├─ reset-password.html
│  │        ├─ reset-password.spec.ts
│  │        └─ reset-password.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  └─ auth-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ chatbot.spec.ts
│  │  │  │  ├─ chatbot.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ firebase-config.ts
│  │  │  │  ├─ google-auth.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ profil.spec.ts
│  │  │  │  ├─ profil.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  ├─ sweet-alert.ts
│  │  │  ├─ timer.spec.ts
│  │  │  └─ timer.ts
│  │  └─ pages
│  │     ├─ forgot-password
│  │     │  ├─ forgot-password.css
│  │     │  ├─ forgot-password.html
│  │     │  ├─ forgot-password.spec.ts
│  │     │  └─ forgot-password.ts
│  │     ├─ home
│  │     │  ├─ announcements
│  │     │  │  ├─ ajoutannouncement
│  │     │  │  │  ├─ ajoutannouncement.css
│  │     │  │  │  ├─ ajoutannouncement.html
│  │     │  │  │  ├─ ajoutannouncement.spec.ts
│  │     │  │  │  └─ ajoutannouncement.ts
│  │     │  │  ├─ announcements.css
│  │     │  │  ├─ announcements.html
│  │     │  │  ├─ announcements.spec.ts
│  │     │  │  ├─ announcements.ts
│  │     │  │  └─ updateannouncement
│  │     │  │     ├─ updateannouncement.css
│  │     │  │     ├─ updateannouncement.html
│  │     │  │     ├─ updateannouncement.spec.ts
│  │     │  │     └─ updateannouncement.ts
│  │     │  ├─ attendance
│  │     │  │  ├─ ajoutattendance
│  │     │  │  │  ├─ ajoutattendance.css
│  │     │  │  │  ├─ ajoutattendance.html
│  │     │  │  │  ├─ ajoutattendance.spec.ts
│  │     │  │  │  └─ ajoutattendance.ts
│  │     │  │  ├─ attendance.css
│  │     │  │  ├─ attendance.html
│  │     │  │  ├─ attendance.spec.ts
│  │     │  │  ├─ attendance.ts
│  │     │  │  └─ updateattendance
│  │     │  │     ├─ updateattendance.css
│  │     │  │     ├─ updateattendance.html
│  │     │  │     ├─ updateattendance.spec.ts
│  │     │  │     └─ updateattendance.ts
│  │     │  ├─ chatbot
│  │     │  │  ├─ chatbot.css
│  │     │  │  ├─ chatbot.html
│  │     │  │  ├─ chatbot.spec.ts
│  │     │  │  └─ chatbot.ts
│  │     │  ├─ dashboard
│  │     │  │  ├─ dashboard.css
│  │     │  │  ├─ dashboard.html
│  │     │  │  ├─ dashboard.spec.ts
│  │     │  │  └─ dashboard.ts
│  │     │  ├─ departments
│  │     │  │  ├─ ajoute-department
│  │     │  │  │  ├─ ajoute-department.css
│  │     │  │  │  ├─ ajoute-department.html
│  │     │  │  │  └─ ajoute-department.ts
│  │     │  │  ├─ departments.css
│  │     │  │  ├─ departments.html
│  │     │  │  ├─ departments.ts
│  │     │  │  └─ update-department
│  │     │  │     ├─ update-department.css
│  │     │  │     ├─ update-department.html
│  │     │  │     └─ update-department.ts
│  │     │  ├─ employees
│  │     │  │  ├─ ajoute-employee
│  │     │  │  │  ├─ ajoute-employee.css
│  │     │  │  │  ├─ ajoute-employee.html
│  │     │  │  │  └─ ajoute-employee.ts
│  │     │  │  ├─ employees.css
│  │     │  │  ├─ employees.html
│  │     │  │  ├─ employees.ts
│  │     │  │  └─ update-employee
│  │     │  │     ├─ update-employee.css
│  │     │  │     ├─ update-employee.html
│  │     │  │     └─ update-employee.ts
│  │     │  ├─ home.css
│  │     │  ├─ home.html
│  │     │  ├─ home.ts
│  │     │  ├─ leaves
│  │     │  │  ├─ ajout-conge
│  │     │  │  │  ├─ ajout-conge.css
│  │     │  │  │  ├─ ajout-conge.html
│  │     │  │  │  └─ ajout-conge.ts
│  │     │  │  ├─ leaves.css
│  │     │  │  ├─ leaves.html
│  │     │  │  └─ leaves.ts
│  │     │  ├─ profil
│  │     │  │  ├─ profil.css
│  │     │  │  ├─ profil.html
│  │     │  │  ├─ profil.spec.ts
│  │     │  │  └─ profil.ts
│  │     │  ├─ projects
│  │     │  │  ├─ ajoutproject
│  │     │  │  │  ├─ ajoutproject.css
│  │     │  │  │  ├─ ajoutproject.html
│  │     │  │  │  ├─ ajoutproject.spec.ts
│  │     │  │  │  └─ ajoutproject.ts
│  │     │  │  ├─ projects.css
│  │     │  │  ├─ projects.html
│  │     │  │  ├─ projects.spec.ts
│  │     │  │  ├─ projects.ts
│  │     │  │  └─ updateproject
│  │     │  │     ├─ updateproject.css
│  │     │  │     ├─ updateproject.html
│  │     │  │     ├─ updateproject.spec.ts
│  │     │  │     └─ updateproject.ts
│  │     │  └─ salary-advances
│  │     │     ├─ ajoutsalary
│  │     │     │  ├─ ajoutsalary.css
│  │     │     │  ├─ ajoutsalary.html
│  │     │     │  ├─ ajoutsalary.spec.ts
│  │     │     │  └─ ajoutsalary.ts
│  │     │     ├─ salary-advances.css
│  │     │     ├─ salary-advances.html
│  │     │     ├─ salary-advances.spec.ts
│  │     │     └─ salary-advances.ts
│  │     ├─ landing
│  │     │  ├─ landing.css
│  │     │  ├─ landing.html
│  │     │  ├─ landing.spec.ts
│  │     │  └─ landing.ts
│  │     ├─ login
│  │     │  ├─ login.css
│  │     │  ├─ login.html
│  │     │  └─ login.ts
│  │     ├─ notfound
│  │     │  ├─ notfound.css
│  │     │  ├─ notfound.html
│  │     │  ├─ notfound.spec.ts
│  │     │  └─ notfound.ts
│  │     ├─ register
│  │     │  ├─ register.css
│  │     │  ├─ register.html
│  │     │  ├─ register.spec.ts
│  │     │  └─ register.ts
│  │     └─ reset-password
│  │        ├─ reset-password.css
│  │        ├─ reset-password.html
│  │        ├─ reset-password.spec.ts
│  │        └─ reset-password.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  ├─ auth-guard.ts
│  │  │  │  ├─ role-guard-guard.spec.ts
│  │  │  │  └─ role-guard-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ chatbot.spec.ts
│  │  │  │  ├─ chatbot.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ firebase-config.ts
│  │  │  │  ├─ google-auth.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ profil.spec.ts
│  │  │  │  ├─ profil.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  └─ salary-advance.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  ├─ sweet-alert.ts
│  │  │  ├─ timer.spec.ts
│  │  │  └─ timer.ts
│  │  └─ pages
│  │     ├─ forgot-password
│  │     │  ├─ forgot-password.css
│  │     │  ├─ forgot-password.html
│  │     │  ├─ forgot-password.spec.ts
│  │     │  └─ forgot-password.ts
│  │     ├─ home
│  │     │  ├─ announcements
│  │     │  │  ├─ ajoutannouncement
│  │     │  │  │  ├─ ajoutannouncement.css
│  │     │  │  │  ├─ ajoutannouncement.html
│  │     │  │  │  ├─ ajoutannouncement.spec.ts
│  │     │  │  │  └─ ajoutannouncement.ts
│  │     │  │  ├─ announcements.css
│  │     │  │  ├─ announcements.html
│  │     │  │  ├─ announcements.spec.ts
│  │     │  │  ├─ announcements.ts
│  │     │  │  └─ updateannouncement
│  │     │  │     ├─ updateannouncement.css
│  │     │  │     ├─ updateannouncement.html
│  │     │  │     ├─ updateannouncement.spec.ts
│  │     │  │     └─ updateannouncement.ts
│  │     │  ├─ attendance
│  │     │  │  ├─ ajoutattendance
│  │     │  │  │  ├─ ajoutattendance.css
│  │     │  │  │  ├─ ajoutattendance.html
│  │     │  │  │  ├─ ajoutattendance.spec.ts
│  │     │  │  │  └─ ajoutattendance.ts
│  │     │  │  ├─ attendance.css
│  │     │  │  ├─ attendance.html
│  │     │  │  ├─ attendance.spec.ts
│  │     │  │  ├─ attendance.ts
│  │     │  │  └─ updateattendance
│  │     │  │     ├─ updateattendance.css
│  │     │  │     ├─ updateattendance.html
│  │     │  │     ├─ updateattendance.spec.ts
│  │     │  │     └─ updateattendance.ts
│  │     │  ├─ chatbot
│  │     │  │  ├─ chatbot.css
│  │     │  │  ├─ chatbot.html
│  │     │  │  ├─ chatbot.spec.ts
│  │     │  │  └─ chatbot.ts
│  │     │  ├─ dashboard
│  │     │  │  ├─ dashboard.css
│  │     │  │  ├─ dashboard.html
│  │     │  │  ├─ dashboard.spec.ts
│  │     │  │  └─ dashboard.ts
│  │     │  ├─ departments
│  │     │  │  ├─ ajoute-department
│  │     │  │  │  ├─ ajoute-department.css
│  │     │  │  │  ├─ ajoute-department.html
│  │     │  │  │  └─ ajoute-department.ts
│  │     │  │  ├─ departments.css
│  │     │  │  ├─ departments.html
│  │     │  │  ├─ departments.ts
│  │     │  │  └─ update-department
│  │     │  │     ├─ update-department.css
│  │     │  │     ├─ update-department.html
│  │     │  │     └─ update-department.ts
│  │     │  ├─ employees
│  │     │  │  ├─ ajoute-employee
│  │     │  │  │  ├─ ajoute-employee.css
│  │     │  │  │  ├─ ajoute-employee.html
│  │     │  │  │  └─ ajoute-employee.ts
│  │     │  │  ├─ employees.css
│  │     │  │  ├─ employees.html
│  │     │  │  ├─ employees.ts
│  │     │  │  └─ update-employee
│  │     │  │     ├─ update-employee.css
│  │     │  │     ├─ update-employee.html
│  │     │  │     └─ update-employee.ts
│  │     │  ├─ home.css
│  │     │  ├─ home.html
│  │     │  ├─ home.ts
│  │     │  ├─ leaves
│  │     │  │  ├─ ajout-conge
│  │     │  │  │  ├─ ajout-conge.css
│  │     │  │  │  ├─ ajout-conge.html
│  │     │  │  │  └─ ajout-conge.ts
│  │     │  │  ├─ leaves.css
│  │     │  │  ├─ leaves.html
│  │     │  │  └─ leaves.ts
│  │     │  ├─ profil
│  │     │  │  ├─ profil.css
│  │     │  │  ├─ profil.html
│  │     │  │  ├─ profil.spec.ts
│  │     │  │  └─ profil.ts
│  │     │  ├─ projects
│  │     │  │  ├─ ajoutproject
│  │     │  │  │  ├─ ajoutproject.css
│  │     │  │  │  ├─ ajoutproject.html
│  │     │  │  │  ├─ ajoutproject.spec.ts
│  │     │  │  │  └─ ajoutproject.ts
│  │     │  │  ├─ projects.css
│  │     │  │  ├─ projects.html
│  │     │  │  ├─ projects.spec.ts
│  │     │  │  ├─ projects.ts
│  │     │  │  └─ updateproject
│  │     │  │     ├─ updateproject.css
│  │     │  │     ├─ updateproject.html
│  │     │  │     ├─ updateproject.spec.ts
│  │     │  │     └─ updateproject.ts
│  │     │  └─ salary-advances
│  │     │     ├─ ajoutsalary
│  │     │     │  ├─ ajoutsalary.css
│  │     │     │  ├─ ajoutsalary.html
│  │     │     │  ├─ ajoutsalary.spec.ts
│  │     │     │  └─ ajoutsalary.ts
│  │     │     ├─ salary-advances.css
│  │     │     ├─ salary-advances.html
│  │     │     ├─ salary-advances.spec.ts
│  │     │     └─ salary-advances.ts
│  │     ├─ landing
│  │     │  ├─ landing.css
│  │     │  ├─ landing.html
│  │     │  └─ landing.ts
│  │     ├─ login
│  │     │  ├─ login.css
│  │     │  ├─ login.html
│  │     │  └─ login.ts
│  │     ├─ notfound
│  │     │  ├─ notfound.css
│  │     │  ├─ notfound.html
│  │     │  ├─ notfound.spec.ts
│  │     │  └─ notfound.ts
│  │     └─ reset-password
│  │        ├─ reset-password.css
│  │        ├─ reset-password.html
│  │        ├─ reset-password.spec.ts
│  │        └─ reset-password.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```
```
frontend
├─ .angular
├─ .editorconfig
├─ angular.json
├─ cypress
│  ├─ e2e
│  │  ├─ departments.cy.ts
│  │  ├─ employees.cy.ts
│  │  └─ login.cy.ts
│  ├─ fixtures
│  │  └─ example.json
│  └─ support
│     ├─ commands.ts
│     └─ e2e.ts
├─ cypress.config.ts
├─ package-lock.json
├─ package.json
├─ public
│  ├─ assets
│  │  └─ cyberParkphoto.png
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ app-icon.ts
│  │  ├─ app.config.ts
│  │  ├─ app.css
│  │  ├─ app.html
│  │  ├─ app.routes.ts
│  │  ├─ app.spec.ts
│  │  ├─ app.ts
│  │  ├─ core
│  │  │  ├─ guards
│  │  │  │  ├─ admin-guard.spec.ts
│  │  │  │  ├─ admin-guard.ts
│  │  │  │  ├─ auth-guard.spec.ts
│  │  │  │  ├─ auth-guard.ts
│  │  │  │  ├─ role-guard-guard.spec.ts
│  │  │  │  └─ role-guard-guard.ts
│  │  │  ├─ interceptors
│  │  │  │  ├─ intercept-interceptor.spec.ts
│  │  │  │  └─ intercept-interceptor.ts
│  │  │  ├─ services
│  │  │  │  ├─ announcement.spec.ts
│  │  │  │  ├─ announcement.ts
│  │  │  │  ├─ attendance.spec.ts
│  │  │  │  ├─ attendance.ts
│  │  │  │  ├─ auth.spec.ts
│  │  │  │  ├─ auth.ts
│  │  │  │  ├─ chatbot.spec.ts
│  │  │  │  ├─ chatbot.ts
│  │  │  │  ├─ department.spec.ts
│  │  │  │  ├─ department.ts
│  │  │  │  ├─ employee.spec.ts
│  │  │  │  ├─ employee.ts
│  │  │  │  ├─ firebase-config.ts
│  │  │  │  ├─ google-auth.ts
│  │  │  │  ├─ leave.spec.ts
│  │  │  │  ├─ leave.ts
│  │  │  │  ├─ profil.spec.ts
│  │  │  │  ├─ profil.ts
│  │  │  │  ├─ project.spec.ts
│  │  │  │  ├─ project.ts
│  │  │  │  ├─ salary-advance.spec.ts
│  │  │  │  ├─ salary-advance.ts
│  │  │  │  ├─ subscriber.spec.ts
│  │  │  │  └─ subscriber.ts
│  │  │  ├─ sweet-alert.spec.ts
│  │  │  ├─ sweet-alert.ts
│  │  │  ├─ timer.spec.ts
│  │  │  └─ timer.ts
│  │  └─ pages
│  │     ├─ forgot-password
│  │     │  ├─ forgot-password.css
│  │     │  ├─ forgot-password.html
│  │     │  ├─ forgot-password.spec.ts
│  │     │  └─ forgot-password.ts
│  │     ├─ home
│  │     │  ├─ announcements
│  │     │  │  ├─ ajoutannouncement
│  │     │  │  │  ├─ ajoutannouncement.css
│  │     │  │  │  ├─ ajoutannouncement.html
│  │     │  │  │  ├─ ajoutannouncement.spec.ts
│  │     │  │  │  └─ ajoutannouncement.ts
│  │     │  │  ├─ announcements.css
│  │     │  │  ├─ announcements.html
│  │     │  │  ├─ announcements.spec.ts
│  │     │  │  ├─ announcements.ts
│  │     │  │  └─ updateannouncement
│  │     │  │     ├─ updateannouncement.css
│  │     │  │     ├─ updateannouncement.html
│  │     │  │     ├─ updateannouncement.spec.ts
│  │     │  │     └─ updateannouncement.ts
│  │     │  ├─ attendance
│  │     │  │  ├─ ajoutattendance
│  │     │  │  │  ├─ ajoutattendance.css
│  │     │  │  │  ├─ ajoutattendance.html
│  │     │  │  │  ├─ ajoutattendance.spec.ts
│  │     │  │  │  └─ ajoutattendance.ts
│  │     │  │  ├─ attendance.css
│  │     │  │  ├─ attendance.html
│  │     │  │  ├─ attendance.spec.ts
│  │     │  │  ├─ attendance.ts
│  │     │  │  └─ updateattendance
│  │     │  │     ├─ updateattendance.css
│  │     │  │     ├─ updateattendance.html
│  │     │  │     ├─ updateattendance.spec.ts
│  │     │  │     └─ updateattendance.ts
│  │     │  ├─ chatbot
│  │     │  │  ├─ chatbot.css
│  │     │  │  ├─ chatbot.html
│  │     │  │  ├─ chatbot.spec.ts
│  │     │  │  └─ chatbot.ts
│  │     │  ├─ dashboard
│  │     │  │  ├─ dashboard.css
│  │     │  │  ├─ dashboard.html
│  │     │  │  ├─ dashboard.spec.ts
│  │     │  │  └─ dashboard.ts
│  │     │  ├─ departments
│  │     │  │  ├─ ajoute-department
│  │     │  │  │  ├─ ajoute-department.css
│  │     │  │  │  ├─ ajoute-department.html
│  │     │  │  │  └─ ajoute-department.ts
│  │     │  │  ├─ departments.css
│  │     │  │  ├─ departments.html
│  │     │  │  ├─ departments.ts
│  │     │  │  └─ update-department
│  │     │  │     ├─ update-department.css
│  │     │  │     ├─ update-department.html
│  │     │  │     └─ update-department.ts
│  │     │  ├─ employees
│  │     │  │  ├─ ajoute-employee
│  │     │  │  │  ├─ ajoute-employee.css
│  │     │  │  │  ├─ ajoute-employee.html
│  │     │  │  │  └─ ajoute-employee.ts
│  │     │  │  ├─ employees.css
│  │     │  │  ├─ employees.html
│  │     │  │  ├─ employees.ts
│  │     │  │  └─ update-employee
│  │     │  │     ├─ update-employee.css
│  │     │  │     ├─ update-employee.html
│  │     │  │     └─ update-employee.ts
│  │     │  ├─ home.css
│  │     │  ├─ home.html
│  │     │  ├─ home.ts
│  │     │  ├─ leaves
│  │     │  │  ├─ ajout-conge
│  │     │  │  │  ├─ ajout-conge.css
│  │     │  │  │  ├─ ajout-conge.html
│  │     │  │  │  └─ ajout-conge.ts
│  │     │  │  ├─ leaves.css
│  │     │  │  ├─ leaves.html
│  │     │  │  └─ leaves.ts
│  │     │  ├─ profil
│  │     │  │  ├─ profil.css
│  │     │  │  ├─ profil.html
│  │     │  │  ├─ profil.spec.ts
│  │     │  │  └─ profil.ts
│  │     │  ├─ projects
│  │     │  │  ├─ ajoutproject
│  │     │  │  │  ├─ ajoutproject.css
│  │     │  │  │  ├─ ajoutproject.html
│  │     │  │  │  ├─ ajoutproject.spec.ts
│  │     │  │  │  └─ ajoutproject.ts
│  │     │  │  ├─ projects.css
│  │     │  │  ├─ projects.html
│  │     │  │  ├─ projects.spec.ts
│  │     │  │  ├─ projects.ts
│  │     │  │  └─ updateproject
│  │     │  │     ├─ updateproject.css
│  │     │  │     ├─ updateproject.html
│  │     │  │     ├─ updateproject.spec.ts
│  │     │  │     └─ updateproject.ts
│  │     │  └─ salary-advances
│  │     │     ├─ ajoutsalary
│  │     │     │  ├─ ajoutsalary.css
│  │     │     │  ├─ ajoutsalary.html
│  │     │     │  ├─ ajoutsalary.spec.ts
│  │     │     │  └─ ajoutsalary.ts
│  │     │     ├─ salary-advances.css
│  │     │     ├─ salary-advances.html
│  │     │     ├─ salary-advances.spec.ts
│  │     │     └─ salary-advances.ts
│  │     ├─ landing
│  │     │  ├─ landing.css
│  │     │  ├─ landing.html
│  │     │  └─ landing.ts
│  │     ├─ login
│  │     │  ├─ login.css
│  │     │  ├─ login.html
│  │     │  └─ login.ts
│  │     ├─ notfound
│  │     │  ├─ notfound.css
│  │     │  ├─ notfound.html
│  │     │  ├─ notfound.spec.ts
│  │     │  └─ notfound.ts
│  │     ├─ reset-password
│  │     │  ├─ reset-password.css
│  │     │  ├─ reset-password.html
│  │     │  ├─ reset-password.spec.ts
│  │     │  └─ reset-password.ts
│  │     └─ unsubscribe
│  │        └─ unsubscribe
│  │           ├─ unsubscribe.css
│  │           ├─ unsubscribe.html
│  │           ├─ unsubscribe.spec.ts
│  │           └─ unsubscribe.ts
│  ├─ environments
│  │  ├─ environment.development.ts
│  │  └─ environment.ts
│  ├─ index.html
│  ├─ main.ts
│  └─ styles.css
├─ test-results
│  └─ .last-run.json
├─ tsconfig.app.json
├─ tsconfig.json
└─ tsconfig.spec.json

```