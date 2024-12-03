import getDataForDay from "../utils/getDataForDay";

export async function day2(): Promise<string> {
    const dataString = (await getDataForDay(2)).trim();
    const reports = dataString.split('\n').map(item => 
        item.split(' ').map(level => Number(level))
    );

    const isSafe = (report: number[]): boolean => {
        const isAscending = report.every((value, index) => index === 0 || value > report[index - 1]);
        const isDescending = report.every((value, index) => index === 0 || value < report[index - 1]);
        if (!isAscending && !isDescending) return false;

        return report.every((value, index) => {
            if (index === 0) return true;
            const diff = Math.abs(value - report[index - 1]);
            return diff >= 1 && diff <= 3;
        });
    };

    const safeReports = reports.filter(report => isSafe(report))
    const saferReports = reports.filter(report => {
        // If the report is already safe, count it
        if (isSafe(report)) return true;

        // Otherwise, try removing each level to see if it becomes safe
        for (let i = 0; i < report.length; i++) {
            const subReport = [...report.slice(0, i), ...report.slice(i + 1)];
            if (isSafe(subReport)) return true;
        }

        return false;
    });

    const answerA = safeReports.length
    const answerB = saferReports.length

    return `${answerA} ${answerB}`
}
