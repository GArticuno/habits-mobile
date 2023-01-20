import { useNavigation } from "@react-navigation/native";
import { ScrollView, Text, View } from "react-native";

import HabitDay from "../../components/HabitDay";
import { daySize } from "../../components/HabitDay/constants";
import Header from "../../components/Header";

import { amountOfDaysToFill, dates, weekDays } from "./constants";

const Home = () => {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <Header />

      <View className="flex-row mt-6 mb-2">
        {weekDays.map((weekDay, index) => (
          <Text
            key={`${weekDay}-${index}`}
            className="text-zinc-400 text-xl font-bold text-center mx-1"
            style={{ width: daySize }}
          >
            {weekDay}
          </Text>
        ))}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View className="flex-row flex-wrap">
          {dates.map(day => (
            <HabitDay
              key={day.toISOString()}
              onPress={() => navigate('habit', {
                date: day.toISOString(),
              })}
            />
          ))}
          {amountOfDaysToFill > 0 && 
            Array.from({ length: amountOfDaysToFill }).map((_value, index) => (
              <View
                key={String(index)}
                className="bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-40"
                style={{ width: daySize, height: daySize }}
              />
            ))
          }
        </View> 
      </ScrollView>
    </View>
  );
};

export default Home;