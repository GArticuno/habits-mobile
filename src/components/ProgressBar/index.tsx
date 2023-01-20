import { View } from "react-native";
import { ProgressBarProps } from "./types";

const ProgressBar = ({ progress }: ProgressBarProps) => (
  <View className="w-full h-3 rounded-xl bg-zinc-700 mt-4">
    <View
      className="h-3 rounded-xl bg-violet-600"
      style={{ width: `${progress}%`}}
    />
  </View>
);

export default ProgressBar;