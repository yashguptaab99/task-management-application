import dayjs, { Dayjs } from 'dayjs'
// eslint-disable-next-line import-helpers/order-imports
import customParseFormat from 'dayjs/plugin/customParseFormat' // import plugin
dayjs.extend(customParseFormat) // use plugin

export class DateHero {
    private _date: Dayjs
    private _originalDate: Date

    static changeLocale(locale: string) {
        dayjs.locale(locale)
    }

    constructor(date: Date) {
        this._originalDate = date
        this._date = dayjs(date)
        return this
    }

    /**
     *  ____
     * |  _ \ __ _ _ __ ___  ___
     * | |_) / _` | '__/ __|/ _ \
     * |  __/ (_| | |  \__ \  __/
     * |_|   \__,_|_|  |___/\___|
     */

    /**
     * Creates DateHero instance based on current browser time
     * @returns DateHero
     */
    static now() {
        return new DateHero(new Date())
    }

    /**
     * Creates DateHero instance from a YYYY-MM-DD date string
     * Shorthand for fromFormat
     * @param date: string formatted as YYYY-MM-DD
     * @returns DateHero
     */
    static fromDateOnly(date: string): DateHero {
        return DateHero.fromFormat(date, DateFormats.ONLY_DATE)
    }

    /**
     * Creates DateHero instance from a YYYY-MM-DD date string and a custom format string
     * @param date: string formatted as YYYY-MM-DD
     * @param format: dayjs formatting string
     * @returns DateHero
     */
    static fromFormat(date: string, format: DateFormats): DateHero {
        const parsedDate = dayjs(date, format)
        return new DateHero(parsedDate.toDate())
    }

    /**
     * Parses any date, trying to figure out the format automatically
     * @param date string
     * @returns DateHero
     */
    static fromAnyFormat(date: string): DateHero {
        const parsedDate = dayjs(date)
        return new DateHero(parsedDate.toDate())
    }

    /**
     * Creates DateHero instance of a date of N years ago
     * @param value: number of years ago
     * @returns DateHero
     */
    static yearsAgo(value: number): DateHero {
        const instance = new DateHero(new Date())
        return instance.minus(value, 'years')
    }

    /**
     *   ___        _               _
     *  / _ \ _   _| |_ _ __  _   _| |_
     * | | | | | | | __| '_ \| | | | __|
     * | |_| | |_| | |_| |_) | |_| | |_
     *  \___/ \__,_|\__| .__/ \__,_|\__|
     *                 |_|
     */

    /**
     * Converts to a date string following a format from a Enum list
     * @param format
     * @returns string
     */
    format(format: DateFormats) {
        return this._date.format(format)
    }

    /**
     * Converts to a date string following format
     * @param format
     * @returns string
     */
    formatAny(format?: string) {
        return this._date.format(format)
    }

    /**
     * Converts to a date object
     * @returns Date
     */
    toDate() {
        return this._date.toDate()
    }

    /**
     * Converts to a date string on format YYYY-MM-DD
     * @returns string
     */
    onlyDate() {
        return this.format(DateFormats.ONLY_DATE)
    }

    /**
     *  __  __             _             _       _
     * |  \/  | __ _ _ __ (_)_ __  _   _| | __ _| |_ ___
     * | |\/| |/ _` | '_ \| | '_ \| | | | |/ _` | __/ _ \
     * | |  | | (_| | | | | | |_) | |_| | | (_| | ||  __/
     * |_|  |_|\__,_|_| |_|_| .__/ \__,_|_|\__,_|\__\___|
     *                      |_|
     */

    /**
     * Increments instance date
     * @returns DateHero
     */
    plus(value: number, unit: dayjs.ManipulateType) {
        this._date = this._date.add(value, unit)
        return this
    }

    /**
     * Decrements instance date
     * @returns DateHero
     */
    minus(value: number, unit: dayjs.ManipulateType) {
        this._date = this._date.add(-value, unit)
        return this
    }

    /**
     * Duplicates current instance of DateHero
     * @returns new DateHero instance
     */
    clone(): DateHero {
        return new DateHero(this.toDate())
    }
}

export enum DateFormats {
    ONLY_DATE = 'YYYY-MM-DD',
    ISO_DATE_HOUR_MINUTE = 'YYYY-MM-DD HH:mm',
    MMDDYY = 'MMDDYY',
    MMDDYYYY = 'MMDDYYYY',
}
