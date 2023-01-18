import { generateDatesFromYearBeginning } from "../../utils/generateDatesFromYearBeginning";

export const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"];
export const dates = generateDatesFromYearBeginning();

const minimumSummaryDatesSize = 18 * 5;

export const amountOfDaysToFill = minimumSummaryDatesSize - dates.length;