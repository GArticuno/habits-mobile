import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useToast } from "react-native-toast-notifications";
import dayjs from "dayjs";

import BackButton from "../../components/BackButton";
import CheckBox from "../../components/Checkbox";
import Loading from "../../components/Loading";
import ProgressBar from "../../components/ProgressBar";
import { getDay, toggleHabit } from "../../services";
import { DayResponse } from "../../services/types";
import { generateProgressPercentage } from "../../utils/generateProgressPercentage";

import { HabitParamProps } from "./types";
import clsx from "clsx";

const Habit = () => {
  const toast = useToast();
  const { date } = useRoute().params as HabitParamProps;
  const { navigate } = useNavigation();

  const [day, setDay] = useState<DayResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const parsedDate = dayjs(date);
  const isDateInPast = parsedDate.endOf("day").isBefore(new Date());
  const dayOfWeek = parsedDate.format("dddd");
  const dayAndMonth = parsedDate.format("DD/MM");

  const progress = day ?
    generateProgressPercentage(day?.possibleHabits.length, day?.completedHabits.length)
    : 0;

  const handleGetDay = async () => {
    try {
      setIsLoading(true);
      const response = await getDay({ date });
      const data = response.data;
      setDay(data);
    } catch (error) {
      console.log(error);
      toast.show("Ops, não foi possível carregar os hábitos do dia.", {
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    };
  };

  const handleToggleHabit = async (habitId: string) => {
    try {
      if(day) {
        await toggleHabit({ id: habitId });  
        const possibleHabits = day.possibleHabits;
        let completedHabits: string[] = [];

        if(day.completedHabits.includes(habitId)) {
          completedHabits = day.completedHabits.filter(id => id !== habitId);
        } else {
          completedHabits = [...day.completedHabits, habitId];
        }
        setDay({ possibleHabits, completedHabits, });
      }
    } catch (error) {
      console.log(error);
      toast.show("Ops, algo deu errado tente novamente.", {
        type: "danger",
      });
    }
  };

  useEffect(() => {
    handleGetDay();
  }, []);

  if(isLoading) return <Loading />;

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <BackButton />
        <Text className="mt-6 text-zinc-400 font-semibold text-base lowercase">
          {dayOfWeek}
        </Text>
        <Text className="text-white font-extrabold text-3xl">
          {dayAndMonth}
        </Text>
        <ProgressBar progress={progress} />

        <View className={clsx("mt-6", { ["opacity-20"]: isDateInPast })}>
          {day && day?.possibleHabits.map((habit) => {
            const isCompleted = day.completedHabits.includes(habit.id);
            return (
              <CheckBox
                key={habit.id}
                title={habit.title}
                checked={isCompleted}
                onPress={() => handleToggleHabit(habit.id)}
                disabled={isDateInPast}
              />
            );
          })}
          {!day && !isDateInPast && (
            <Text className="text-zinc-400 text-base">
              Você não tem hábitos nesse dia{" "}
              <Text
                className="text-violet-400 text-base underline active:text-violet-500"
                onPress={() => navigate("new_habit")}
              >
                crie um hábito novo.
              </Text>
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default Habit;