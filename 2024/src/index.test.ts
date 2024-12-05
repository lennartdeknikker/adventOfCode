import getDataForDay from "./utils/getDataForDay"

describe('getMessage()', () => {
    it('should return the correct message when called', () => {
        expect(getDataForDay(1)).toBeTruthy
    })

    it('should be super smart', () => {
        expect(true).toBe(true)
    })
})
