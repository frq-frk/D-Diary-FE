
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