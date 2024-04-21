interface dateRange {
    startDate: Date,
    endDate: Date
}

export function datesOverlap(a: dateRange, b: dateRange){
    if((a.endDate > b.startDate && a.endDate < b.endDate) || (a.startDate > b.startDate && b.endDate > a.startDate) || (a.startDate == b.startDate && a.endDate == b.endDate))
        return true;
    else return false;
};