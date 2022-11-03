import { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tailwind from "twrnc";

const Form = ({ handleAdd }) => {
  const [title, setTitle] = useState("");

  return (
    <View style={tailwind`flex flex-row py-5`}>
      <TextInput
        onChangeText={(e) => {
          setTitle(e);
        }}
        placeholder="Add Todo"
        value={title}
        style={tailwind`bg-slate-100 grow-1 p-5 rounded-lg border border-slate-200 border-2`}
      />
      {/**************************************************** */}

      <TouchableOpacity
      style={tailwind`ml-2 bg-cyan-500 px-4 py-2 rounded-lg w-16 flex flex-row justify-center items-center`}
       onPress={() => {
        setTitle("");
        handleAdd(title);
      }}
      >
        <Text
        style={tailwind`text-white text-xl font-bold `}
        >
          +
        </Text>
      </TouchableOpacity>
     
      {/************************************************************************** */}
    </View>
  );
};

export default Form;
