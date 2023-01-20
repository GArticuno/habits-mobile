import { ActivityIndicator, View } from "react-native";
import { LoadingProps } from "./types";

const Loading = ({ color = "#7C3AED" }: LoadingProps) => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#09090A" }}>
      <ActivityIndicator color={color} />
    </View>
  );
};

export default Loading;