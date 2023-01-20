import { useNavigation } from "@react-navigation/native";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { ScrollView, Text, View, Alert } from "react-native";
import { useToast } from "react-native-toast-notifications";

import HabitDay from "../../components/HabitDay";
import { daySize } from "../../components/HabitDay/constants";
import Header from "../../components/Header";
import Loading from "../../components/Loading";
import { getSummary } from "../../services";
import { SummaryProps } from "../../services/types";

import { amountOfDaysToFill, dates, weekDays } from "./constants";

const Home = () => {
  const { navigate } = useNavigation();
  const toast = useToast();
  const [summary, setSummary] = useState<SummaryProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGetSummary = async () => {
    try {
      setIsLoading(true);
      const response = await getSummary();
      console.log(response.data)
      setSummary(response.data);
    } catch (error) {
      console.log(error);
      toast.show("Ops, não foi possível carregar o sumário de hábitos.", {
        type: "danger"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleGetSummary();
  }, []);

  if(isLoading) {
    return (
      <Loading />
    );
  }

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
          {dates.map(date => {
            const dayInSummary = summary.find(day => {
              return dayjs(date).isSame(day.date, "day")
            })
            return (
              <HabitDay
                date={date}
                key={date.toISOString()}
                onPress={() => navigate('habit', {
                  date: date.toISOString(),
                })}
              />
            )
          })}
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