let newDate = new Date()
export function getCurrentDate(separator = '') {

    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${date}`
}

const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "Octobar", "Novembar", "December"]

const d = new Date();

let day = weekday[d.getDay()];

export function getCurrentYear() {
    return newDate.getFullYear();
}

export function getCurrentMonth() {
    let month = newDate.getMonth() + 1;
    return month < 10 ? `0${month}` : `${month}`;
}

export function getCurrentMonthName() {
    let month = newDate.getMonth()
    return monthNames[month];
}

export function getMonthName(m) {
    return monthNames[Number(m) - 1];
}

export function getMonthYearList(month, year) {
    let current_year = newDate.getFullYear();
    let current_month = newDate.getMonth() + 1;
    let monthIndex = monthNames.indexOf(month);
    console.log(month)
    console.log(monthIndex)
    if (Number(year) === current_year) {
        return { "monthArray": monthNames.slice(0, current_month), "yearArray": [year] }
    }
    var yearArray = [];
    for (var i = Number(year); i <= Number(current_year); i++) {
        yearArray.push(String(i));
    }
    return { "monthArray": monthNames, "yearArray": yearArray };
}

export { day }