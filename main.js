import inquirer from "inquirer";
let fees = {
    WMA: 20000,
    AI: 5000,
    Cloudcomputing: 6000,
};
function randomNumber() {
    let random = Math.floor(Math.random() * 90000 + 10000);
    return random;
}
class students_detail {
    name;
    age;
    studentID;
    courses;
    balance;
    constructor(name, age) {
        this.studentID = randomNumber();
        this.courses = [];
        this.balance = 0;
        this.name = name;
        this.age = age;
    }
    enrollStudents(course) {
        this.courses.push(course);
    }
    show_tuitionfees(courses) {
        console.log(`The Fees for ${courses} course is ${fees[courses]}`);
    }
    view_studentbalance() {
        console.log(`Your balance is ${this.balance}`);
    }
    pay_Studentfees(courses) {
        this.balance = -fees[courses];
        console.log(`Your fees has been successfully paid`);
        this.view_studentbalance;
    }
    show_status() {
        console.log(`Name: ${this.name}`);
        console.log(`Age: ${this.age}`);
        console.log(`Courses: ${this.courses.join(" , ")}`);
        console.log(`ID: ${this.studentID}`);
        this.view_studentbalance();
    }
}
class courses {
    name;
    constructor(name) {
        this.name = name;
    }
    ;
}
var Students = [];
var Courses = [
    new courses("WMA"),
    new courses("AI"),
    new courses("Cloudcomputing")
];
async function main() {
    console.log(`Welcome to my student management system`);
    console.log("-".repeat(60));
    var condition = true;
    while (condition) {
        let question = await inquirer.prompt([{
                message: "Select an option",
                name: "Options",
                type: "list",
                choices: ["Add students", "enroll in course", "View balance", "Pay tuition fees", "Show status", "Exit"]
            }]);
        if (question.Options === "Add students") {
            let question0 = await inquirer.prompt([{
                    message: "What is your name?",
                    type: "input",
                    name: "Name"
                }]);
            if (!question0.Name) {
                throw new Error("Entering name is mandatory");
            }
            let question1 = await inquirer.prompt({
                message: "Enter your age",
                type: "input",
                name: "age"
            });
            if (!question1.age) {
                throw new Error("Entering age is mandatory");
            }
            let newStudent = new students_detail(question0.Name, question1.age);
            Students.push(newStudent);
            console.log(`${question0.Name.charAt(0).toUpperCase() + question0.Name.slice(1)} of age ${question1.age} has been added with student id "${newStudent.studentID}"`);
        }
        else if (question.Options === "enroll in course") {
            let question3 = await inquirer.prompt([{
                    message: "Select student to enroll?",
                    type: "list",
                    name: "student",
                    choices: Students.map((student) => ({ name: student.name, value: student })),
                }, {
                    name: "courses",
                    type: "list",
                    message: "Please enter the courses you want to enroll in",
                    choices: Courses.map(courses => courses.name)
                }]);
            question3.student.enrollStudents(question3.courses);
            console.log(`${question3.student.name.charAt(0).toUpperCase() + question3.student.name.slice(1)} is enrolled into ${question3.courses}`);
        }
        else if (question.Options === "View balance") {
            let question4 = await inquirer.prompt([{
                    message: "Select student to view balance?",
                    type: "list",
                    name: "student",
                    choices: Students.map((student) => ({ name: student.name, value: student })),
                }]);
            question4.student.view_studentbalance();
        }
        else if (question.Options === "Pay tuition fees") {
            let question5 = await inquirer.prompt([{
                    message: "Select student to pay fee?",
                    type: "list",
                    name: "student",
                    choices: Students.map((student) => ({ name: student.name, value: student })),
                }, {
                    name: "courses",
                    type: "list",
                    message: "Which course's fees do you want to pay",
                    choices: Courses.map(courses => courses.name)
                }]);
            if (question5.student.courses.includes(question5.courses)) {
                question5.student.show_tuitionfees(question5.courses);
                let question6 = await inquirer.prompt({
                    message: "Enter required amount",
                    type: "number",
                    name: "amount"
                });
                if (question6.amount === fees[question5.courses]) {
                    question5.student.pay_Studentfees(question5.courses);
                }
                else {
                    console.log(`You entered wrong amount!`);
                }
            }
            else {
                console.log(`First get enrolled in selected course then pay its fee!`);
            }
        }
        else if (question.Options === "Show status") {
            let question7 = await inquirer.prompt([{
                    message: "Select student to show status?",
                    type: "list",
                    name: "student",
                    choices: Students.map((student) => ({ name: student.name, value: student })),
                }]);
            question7.student.show_status();
        }
        else {
            process.exit(0);
        }
        var options = await inquirer.prompt([{
                name: "DoSomething",
                type: "confirm",
                default: true
            }]);
        condition = options.DoSomething;
    }
}
main();
