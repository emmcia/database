const fs = require('fs');
const readline = require('readline-sync');

const DATA_FILE = 'students.json';
let students = [];

function loadData() {
    try {
        const data = fs.readFileSync(DATA_FILE, 'utf-8');
        students = JSON.parse(data);
    } catch (err) {
        students = [];
    }
}

function saveData() {
    fs.writeFileSync(DATA_FILE, JSON.stringify(students, null, 2));
}

function addStudent() {
    const name = readline.question("Enter student name: ");
    const age = parseInt(readline.question("Enter age: "));
    const index = parseInt(readline.question("Enter student index number: "));
    const average = parseFloat(readline.question("Enter grade average: "));

    students.push({ name, age, index, average });
    saveData();
    console.log("Student added!\n");
}


function listStudents() {
    if (students.length === 0) {
        console.log("No students in database.\n");
        return;
    }

    console.log("\n=== Student List ===");
    for (let i = 0; i < students.length; i++) {
        console.log(`${i + 1}. ${students[i].name}, Age: ${students[i].age}, Index: ${students[i].index}, Average: ${students[i].average}`);
    }
    console.log();
}

function calculateAverage() {
    if (students.length === 0) {
        console.log("No students in database.\n");
        return;
    }

    let sum = 0;
    for (let student of students) {
        sum += student.average;
    }
    const avg = sum / students.length;
    console.log(`Average grade of all students: ${avg.toFixed(2)}\n`);
}


function findStudent() {
    const index = parseInt(readline.question("Enter index number to search: "));
    const student = students.find(s => s.index === index);
    if (student) {
        console.log(`Found: ${student.name}, Age: ${student.age}, Average: ${student.average}\n`);
    } else {
        console.log("Student not found.\n");
    }
}


function removeStudent() {
    const index = parseInt(readline.question("Enter index number to remove: "));
    const idx = students.findIndex(s => s.index === index);
    if (idx !== -1) {
        students.splice(idx, 1);
        saveData();
        console.log("Student removed!\n");
    } else {
        console.log("Student not found.\n");
    }
}


function menu() {
    console.log("=== Student Database ===");
    console.log("1. Add student");
    console.log("2. Show students");
    console.log("3. Calculate average grade");
    console.log("4. Find student");
    console.log("5. Remove student");
    console.log("0. Exit");
}


function main() {
    loadData();
    let choice;
    do {
        menu();
        choice = parseInt(readline.question("Choose an option: "));
        switch (choice) {
            case 1: addStudent(); break;
            case 2: listStudents(); break;
            case 3: calculateAverage(); break;
            case 4: findStudent(); break;
            case 5: removeStudent(); break;
            case 0: console.log("Goodbye!"); break;
            default: console.log("Invalid option.\n");
        }
    } while (choice !== 0);
}

main();
