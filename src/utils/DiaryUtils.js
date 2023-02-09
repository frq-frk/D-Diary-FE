
export function formatDiaryEntries(temp, month, year) {
    console.log(temp)
    temp.splice(0, 0, { 'entry': "" })
    temp.splice(0, 0, { 'heading': "Dear Diary", 'decor': "/images/featherPen.png", 'month': month, 'year':  year})
    temp.push({ 'entry': "" })
    if (temp.length % 2 === 0)
        temp.push({ 'entry': "" })
    temp.push({ 'heading': " ", 'decor': "/images/thankYouText.png" })
    return temp
}

export const months = [
    {name : 'January', value : "01"},
    {name : 'February', value : "02"},
    {name : 'March', value : "03"},
    {name : 'April', value : "04"},
    {name : 'May', value : "05"},
    {name : 'June', value : "06"},
    {name : 'July', value : "07"},
    {name : 'August', value : "08"},
    {name : 'September', value : "09"},
    {name : 'October', value : "10"},
    {name : 'November', value : "11"},
    {name : 'December', value : "12"},
    
]