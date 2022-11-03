import Checkbox from "expo-checkbox";
import React, { useState } from "react";
import { Alert, Text, TouchableOpacity, Vibration, View } from "react-native";
import tailwind from "twrnc";
import EditTodo from "./EditTodo";

const Todo = ({
  id,
  title,
  isCompleted,
  handleCheck,
  handleDelete,
  handleEdit,
}) => {
  const [checked, setChecked] = useState(isCompleted);
  const [pressed, setPressed] = useState(false);

  const showDialog = () => {
    Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
      {
        text: "Cancel",
      },
      {
        text: "OK",
        onPress: () => {
          handleDelete(id);
        },
      },
    ]);
  };

  return (
    <View style={tailwind`flex flex-row`}>
      <View style={tailwind`mb-5 py-5 rounded-lg flex flex-row justify-center items-center px-5 ${isCompleted ? 'bg-slate-200' : 'bg-slate-100'} `}>
        <Checkbox
          value={checked}
          color="#06B6D4"
          onValueChange={() => {
            setChecked(!checked);
            handleCheck(id);
          }}
        />
      </View>
      {/* **************************************** */}

      <TouchableOpacity
        onLongPress={() => {
          Vibration.vibrate(80)
          showDialog();
        }}
        onPress={() => {
          setPressed(true);
        }}
        style={tailwind`ml-3 grow-1 mb-5 py-5 rounded-lg flex flex-row justify-start items-center px-5 ${isCompleted ? 'bg-slate-200' : 'bg-slate-100'} `}
      >
        {pressed ? (
          <EditTodo
            oldTitle={title}
            pressed={pressed}
            setPressed={setPressed}
            handleEdit={handleEdit}
            id={id}
          />
        ) : (
          <Text style={tailwind`text-sm text-slate-900`}>{title}</Text>
        )}
      </TouchableOpacity>
      {/* /********************************************* */}
    </View>
  );
};

export default Todo;
