export default class Other {
    parseFullDate (fullDate) {
        var options = {year: 'numeric', month: '2-digit', day: '2-digit'};

        const newDate = new Date(Date.parse(fullDate));

        return newDate.toLocaleDateString('pl-PL', options);
    }
}