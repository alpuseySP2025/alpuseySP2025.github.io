// @ts-check

/**
 * @typedef {any} GradeData
 */

/** @returns {GradeData} */
function fetchGradeData() {
    console.log("Fetching grade data")
}

/** @param {GradeData} data */
function populateGradebook(data) {
    console.log("Populating gradebook with data:", data)
}

const gradeData = fetchGradeData()
populateGradebook(gradeData)