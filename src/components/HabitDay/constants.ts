import { Dimensions } from "react-native";

const weekDays = 7;
const screenHorizontalPadding = (32 * 2)/ 5;

export const dayMarginBetween = 8;
export const daySize = (Dimensions.get("screen").width / weekDays) - (screenHorizontalPadding + 5);