import { TouchableOpacityProps } from "react-native";

export type CheckBoxProps = {
  title: string;
  checked?: boolean;
} & TouchableOpacityProps;