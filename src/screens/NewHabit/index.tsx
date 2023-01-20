import { useState } from "react";
import { ActivityIndicator, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useToast } from "react-native-toast-notifications";
import colors from "tailwindcss/colors";
import clsx from "clsx";

import BackButton from "../../components/BackButton";
import CheckBox from "../../components/Checkbox";
import { createHabit } from "../../services";

import { availableWeekDays } from "./constants";

const NewHabit = () => {
  const toast = useToast();
  const [weekDays, setWeekDays] = useState<number[]>([]);
  const [title, setTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleWeekDay = (index: number) => {
    if(weekDays.includes(index)) {
      setWeekDays(prevState => prevState.filter(weekDay => weekDay !== index));
    } else {
      setWeekDays(prevState => [...prevState, index]);
    }
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await createHabit({ title, weekDays });
      setTitle("");
      setWeekDays([]);
      toast.show('Hábito criado com sucesso!', {
        type: "success",
      });
    } catch (error) {
      console.log(error);
      toast.show("Ops, algo deu errado.", {
        type: "danger",
      });
    } finally {
      setIsLoading(false);
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
          value={title}
          onChangeText={setTitle}
          className="h-12 pl-4 rounded-lg mt-3 bg-zinc-900 border-2 border-zinc-800 text-white focus:border-green-600"
          placeholder="Ex: Exercícios, dormir bem, etc..."
          placeholderTextColor={colors.zinc[400]}
        />

        <Text className="mt-4 mb-3 text-white font-semibold text-base">
          Qual a recorrência?
        </Text>
        {availableWeekDays.map((weekDay, index) => (
          <CheckBox
            key={weekDay}
            title={weekDay}
            checked={weekDays.includes(index)}
            onPress={() => handleToggleWeekDay(index)}
          />
        ))}

        <TouchableOpacity
          activeOpacity={0.7}
          className={clsx(`
            w-full
            h-14
            flex-row
            items-center
            justify-center
            bg-green-600
            rounded-md
            mt-6
          `, {
            ["bg-zinc-800"]: !title.trim() || weekDays.length === 0,
          })}
          onPress={onSubmit}
          disabled={!title.trim() || weekDays.length === 0}
        >
          {isLoading && (
            <ActivityIndicator color="#FFFFFF" />
          )}
          {!isLoading && (
            <>
              <Feather
                name="check"
                size={20}
                color={!title.trim() || weekDays.length === 0 ? colors.zinc[500] : colors.white}
              />
              <Text className={clsx("font-semibold text-base text-white ml-3", {
                ["text-zinc-500"]: !title.trim() || weekDays.length === 0,
              })}>
                Confirmar
              </Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default NewHabit;