import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import { CheckBoxProps } from "./types";
import clsx from "clsx";
import Animated, { RotateInUpLeft, RotateOutUpLeft } from "react-native-reanimated";

const CheckBox = ({ title, checked = false, ...rest }: CheckBoxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="flex-row mb-2 items-center"
      {...rest}
    >
      {checked ? (
        <Animated.View
          className="h-8 w-8 bg-green-500 rounded-lg items-center justify-center"
          entering={RotateInUpLeft}
          exiting={RotateOutUpLeft}
        >
          <Feather name="check" size={20} color={colors.white} />
        </Animated.View>
      ) : (
        <View className="h-8 w-8 bg-zinc-900 rounded-lg" />
      )}
      <Text className="text-white ml-3 text-base">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CheckBox;
