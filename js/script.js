class Employee {
  constructor(name, age, payRate) {
    this.name = name;
    this.age = age;
    this.annualSalary = 0;
    this.payRate = payRate;
  }
}

class Manager extends Employee {
  constructor(name, age, payRate) {
    super(name, age, payRate);
    this.type = "Manager";
    this.hours = 40;
  }
  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52 - 1000;
  }
}

class PartTime extends Employee {
  constructor(name, age, payRate, hours) {
    super(name, age, payRate);
    this.type = "Part Time";
    this.hours = hours;
  }
  calculatePay() {
    this.annualSalary = this.payRate * this.hours * 52;
  }
}
class Main {
  constructor() {
    this.employees = [];
    this.addEmployee("John,30,20,40");
    this.addEmployee("Haley,20,15,24");
    this.addEmployee("Kelly,18,17,30");
    this.displayEmployees();
    this.init();
  }

  init() {
    setTimeout(() => this.selectAction(),1000);
  }
  selectAction() {
    let action = prompt(
      "Select Action:\n1.Add Employee\n2.Remove Employee\n3.Edit Employee\n4.Display Employees"
    );
    switch (action) {
      case "1":
        this.addEmployeeViaPrompt();
        break;
      case "2":
        this.removeEmployeeViaPrompt();
        break;
      case "3":
        this.editEmployeeViaPrompt();
        break;
      case "4":
        this.displayEmployees();
        break;
      default:
        alert("Invalid Selection Please Enter A Value 1 - 4");
        this.selectAction();
        break;
    }
  }

  addEmployeeViaPrompt() {
    let employeeData = prompt(
      "Enter Employee Data Seperated By Comma Ex:(Name,Age,Pay,Hours)"
    );
    if (!employeeData){
        this.selectAction();
        return;
    }
    this.addEmployee(employeeData);
    this.displayEmployees();
    this.selectAction();
  }
  removeEmployeeViaPrompt() {
    let id = prompt("Enter Employee Name or ID Number To Remove");
    if (!id){
        this.selectAction();
        return;
    }
    this.removeEmployee(id);
    this.displayEmployees();
    this.selectAction();
  }
  editEmployeeViaPrompt() {
    let employeeNumber = prompt("Enter Employee Number To Edit Pay");
    if (!employeeNumber || isNaN(employeeNumber)){
        this.selectAction();
        return;
    }
    let newPayRate = prompt("Enter New Pay Rate");
    if (!newPayRate || isNaN(newPayRate)){
        this.selectAction();
        return;
    }
    this.editEmployee(parseInt(employeeNumber), parseFloat(newPayRate));
    this.displayEmployees();
    this.selectAction();
  }

  addEmployee(employeeData) {
    const [name, age, payRate, hours] = employeeData.split(",");
    if (hours >= 40) {
      const manager = new Manager(name, parseInt(age), parseFloat(payRate));
      manager.calculatePay();
      this.employees.push(manager);
    } else {
      const partTime = new PartTime(
        name,
        parseInt(age),
        parseFloat(payRate),
        parseInt(hours)
      );
      partTime.calculatePay();
      this.employees.push(partTime);
    }
    this.displayEmployees();
  }

  removeEmployee(id) {
    if (isNaN(id)) {
      this.employees = this.employees.filter(
        (employee) => employee.name !== id
      );
    } else {
      this.employees.splice(id - 1, 1);
    }
    this.displayEmployees();
  }

  editEmployee(employeeNumber, newPayRate) {
    const employee = this.employees[employeeNumber - 1];
    employee.payRate = newPayRate;
    employee.calculatePay();
    this.displayEmployees();
  }

  displayEmployees() {
    console.clear();
    console.log("No.\tName\tAge\tSalary\tHrs\tPay\tType");
    this.employees.forEach((employee, index) => {
      console.log(
        `${index + 1}\t${employee.name}\t${employee.age}\t${
          employee.annualSalary
        }\t${employee.hours}\t${employee.payRate}\t${employee.type}`
      );
    });
  }
}
(() => {
 new Main();

})();
