import { useState } from "react";
import { ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";

import BackButton from "../../components/BackButton";
import CheckBox from "../../components/Checkbox";

import { avaliableWeekDays } from "./constants";

const NewHabit = () => {
  const [weekDays, setWeekDays] = useState<number[]>([]);

  const handleToggleWeekDay = (index: number) => {
    if(weekDays.includes(index)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== index));
    } else {
      setWeekDays(prevState => [...prevState, index]);
    }
  };

  return (
    <View className="flex-1 bg-background px-8 pt-16">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 100,
        }}
      >
        <BackButton />

        <Text className="mt-6 text-white font-extrabold text-3xl">
          Criar hábito
        </Text>
        <Text className="mt-6 text-white font-semibold text-base">
          Qual o seu comprometimento?
        </Text>
        <TextInput
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-green-600"
          placeholder="Ex: Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>
        {avaliableWeekDays.map((weekDay, index) => (
          <CheckBox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className="w-full h-14 flex-row items-center justify-center bg-green-600 rounded-md mt-6"
        >
          <Feather name="check" size={20} color={colors.white} />
          <Text className="font-semibold text-base text-white ml-3">
            Confirmar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewHabit;