<img src="https://img.shields.io/badge/cestmarcel-EmployeeTracker-navy">

<img src="https://img.shields.io/badge/Version-1.0-green">

# Command line employee tracker

## Description

This is a simple application for managing a company's employees using node, inquirer, and MySQL.
![Screenshot of the start screen](https://github.com/cestmarcel/uoft-employee-tracker/blob/master/assets/screenshots/start.png)

## Table of contents

- [Installation](#Installation)
- [Usage](#Usage)
- [License](#License)
- [Contributing](#Contributing)
- [Credits](#Credits)

## Installation

To get started with the application, simply clone the project and run "npm install" on your command line after navigating to your repository. There is a seed file in the repository for your convenience and to pre-populate the database with some values for testing. Once you're all set, all you have to do is run "node app.js" and you can work with the tracker.

## Usage

The application is intended to be used as a tracker for employees within a company, as well as their roles, salaries, and departments. The user can perform a variety of tasks:
- View all employees, departments, and roles
- View employees by department
- Add new employees, departments, and roles
- Remove employees
- Update the role of an employee

Here's an example for an employee overview as an output:
![Screenshot of the start screen](https://github.com/cestmarcel/uoft-employee-tracker/blob/master/assets/screenshots/emlployees.png)

## License

No license

## Contributing

If you want to contribute to this project, please reach out to me here on Github!

## Credits

- The project uses the MySQL npm package to connect to the SQL database and to perform queries. Documentation available under: https://www.npmjs.com/package/mysql
- This application uses the inquirer module for Node.js. Documentation is available under https://www.npmjs.com/package/inquirer.
- The application also uses the console.table module for Node.js. You can find the module's documentation under: https://www.npmjs.com/package/console.table
- The dotenv module is used to handle database credentials. Documentation is available under: https://www.npmjs.com/package/dotenv


