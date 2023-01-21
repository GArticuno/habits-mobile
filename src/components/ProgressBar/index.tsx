
import { useEffect } from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import clsx from "clsx";

import { ProgressBarProps } from "./types";

const ProgressBar = ({ progress }: ProgressBarProps) => {
  const sharedProgress = useSharedValue(progress);
  const style = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`
    }
  });

  useEffect(() => {
    sharedProgress.value = withTiming(progress);
  }, [progress]);

  return (
    <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
      <Animated.View
        className={clsx(`
          h-3
          rounded-xl
          bg-violet-900
          transition-all
        `, {
          "bg-violet-800": progress >= 20 && progress < 40,
          "bg-violet-700": progress >= 40 && progress < 60,
          "bg-violet-600": progress >= 60 && progress < 80,
          "bg-violet-500": progress >= 80,
        })}
        style={style}
      />
    </View>
  );
};

export default ProgressBar;