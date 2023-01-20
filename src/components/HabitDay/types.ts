import { TouchableOpacityProps } from "react-native";

export type HabitDayProps = {
  date: Date;
  amount?: number;
  completed?: number;
} & TouchableOpacityProps;