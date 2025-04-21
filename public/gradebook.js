// @ts-check

/**
 * @typedef GradeData
 * @prop {string} first_name
 * @prop {string} last_name
 * @prop {number} student_id
 * @prop {number} total_grade
 */

function fetchGradeData() {
    console.log("Fetching grade data");
    const xhr = new XMLHttpRequest();
    const route = "/api/grades";
    xhr.onreadystatechange = function () {
        // let results; // this variable was not used
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status !== 200) {
                console.error(`Could not get grades.\nStatus: ${xhr.status}`)
                return; // added a return so that it wouldn't try to calculate grades without data
            }
            populateGradebook(JSON.parse(xhr.responseText))
        }
    }//.bind(this); // this part was not needed
    xhr.open("get", route, true);
    xhr.send();
}

const gradeLetters = ["A", "A", "B", "C", "D", "F"]

/** @param {GradeData[]} data */
function populateGradebook(data) {
    console.log("Populating gradebook with data:", data);
    const table = document.getElementById("gradebook");
    
    // added in the event that the backend breaks or no data is available
    if (!data) {
        console.log("No data was given.")
        return;
    }

    // the parameter name "assignment" was misleading
    // also used a for loop for faster times and clearer interpretation
    for (const student of data) {
        const row = document.createElement("tr");
        const columns = { // columns was originally an array for some reason
            name: document.createElement("td"),
            grade: document.createElement("td")
        };

        columns.name.appendChild(
            document.createTextNode(`${student.last_name}, ${student.first_name}`)
        );

        // added grade letters just for fun
        const gradeLetter = gradeLetters[Math.min(10 - Math.floor(student.total_grade / 10), gradeLetters.length - 1)]
        columns.grade.appendChild(
            document.createTextNode(`${gradeLetter} | ${student.total_grade.toFixed(2)}`)
        );

        row.appendChild(columns.name);
        row.appendChild(columns.grade);
        table?.appendChild(row);
    }
}

fetchGradeData()