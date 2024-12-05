import getDataForDay from "../utils/getDataForDay";

type Print = number[];
type Rule = [number, number]

export async function day5(): Promise<string> {
    const dataString = await getDataForDay(5);

    const [rulesString, printsString] = dataString.trim().split('\n\n');
    const rules = rulesString.split('\n').map(rule => rule.split('|').map(rulePart => parseInt(rulePart))) as Rule[]
    const prints = printsString.split('\n').map(print => print.split(',').map(page => parseInt(page))) as Print[]

    let desiredValidity = true;

    const checkPrintValidity = (print: Print): boolean => {
        let isValid = true
        let pageIndex = 0

        do {
            const page = print[pageIndex]
            const applicableRules = rules.filter(rule => {
                const [pageA, pageB] = rule
                return pageA === page || pageB === page
            })
            const pagesThatShouldComeFirst = applicableRules.filter(rule => rule[1] === page).map(rule => rule[0])
            const pagesThatShouldComeAfter = applicableRules.filter(rule => rule[0] === page).map(rule => rule[1])

            const pagesBefore = print.slice(0, pageIndex)
            const pagesAfter = print.slice(pageIndex + 1)

            if (pagesBefore.filter(page => pagesThatShouldComeAfter.includes(page)).length > 0) {
                isValid = false;
                break;
            }
            if (pagesAfter.filter(page => pagesThatShouldComeFirst.includes(page)).length > 0) {
                isValid = false;
                break;
            }

            pageIndex++
        } while (isValid && pageIndex < print.length)

        return isValid === desiredValidity
    }

    const updateToValidOrder = (print: Print): Print => {
        const applicableRules = rules.filter(rule => {
            const [pageA, pageB] = rule
            return print.includes(pageA) && print.includes(pageB)
        })

        const precedenceMap = new Map<number, Set<number>>();

        // Build a precedence map from the applicable rules
        for (const [pageA, pageB] of applicableRules) {
            if (!precedenceMap.has(pageA)) precedenceMap.set(pageA, new Set());
            precedenceMap.get(pageA)?.add(pageB);
        }

        return print.sort((pageA, pageB) => {
            const shouldTakePrecedence = precedenceMap.has(pageA) && precedenceMap.get(pageA)?.has(pageB)
            return shouldTakePrecedence ? -1 : 1
        })
    }

    desiredValidity = true
    const validPrints = prints.filter(checkPrintValidity)
    const middlePages = validPrints.map(print => print[Math.round((print.length - 1) / 2)])
    const answerA = middlePages.reduce((acc, curr) => acc + curr, 0)

    desiredValidity = false
    const invalidPrints = prints.filter(checkPrintValidity)
    const nowValidPrints = invalidPrints.map(updateToValidOrder)
    const nowValidMiddlePages = nowValidPrints.map(print => print[Math.round((print.length - 1) / 2)])
    
    const answerB = nowValidMiddlePages.reduce((acc, curr) => acc + curr, 0)

    return `${answerA} ${answerB}`
}
