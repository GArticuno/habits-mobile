import clsx from "clsx";
import dayjs from "dayjs";
import { TouchableOpacity } from "react-native";
import { generateProgressPercentage } from "../../utils/generateProgressPercentage";
import { daySize } from "./constants";

import { HabitDayProps } from "./types";

const HabitDay = ({ amount = 0, completed = 0, date, ...rest }: HabitDayProps) => {
  const percentage = generateProgressPercentage(amount, completed);

  const today = dayjs().startOf("day").toDate()
  const isToday = dayjs(date).isSame(today);

  return (
    <TouchableOpacity
      className={clsx("rounded-lg border-2 m-1", {
        ["bg-zinc-900 border-2 border-zinc-800"]: percentage === 0,
        ["bg-violet-900 border-violet-700"]: percentage > 0 && percentage < 20,
        ["bg-violet-800 border-violet-600"]: percentage >= 20 && percentage < 40,
        ["bg-violet-700 border-violet-500"]: percentage >= 40 && percentage < 60,
        ["bg-violet-600 border-violet-500"]: percentage >= 60 && percentage < 80,
        ["bg-violet-500 border-violet-400"]: percentage >= 80,
        ["border-white bottom-4"]: isToday,
      })}
      style={{ width: daySize, height: daySize }}
      activeOpacity={0.7}
      {...rest}
    />
  );
};

export default HabitDay;