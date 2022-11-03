import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import {
  BackHandler, FlatList, SafeAreaView, Text, TouchableOpacity, View
} from "react-native";
import tailwind from "twrnc";
import { UserContext } from "../contexts/UserContext";
import config from "../utils/config";
import Form from "./../components/Form";
import Todo from "./../components/Todo";

export default function Home() {
  const navigation = useNavigation();
  const [todos, setTodos] = useState([]);

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axios.get(
          config.SERVER_URL + `/todos/oneuser/${user._id}`
        );
        setTodos(response.data.todos);
      } catch (error) {
        console.log(error);
      }
    };

    fetchTodos();
  }, []);
  /************************************************************************** */

  const handleCheck = async (id) => {
    try {
      const { data } = await axios.put(config.SERVER_URL + `/todos/${id}`, {
        completed: !todos.find((todo) => todo._id === id).completed,
      });
      if (data.success) {
        setTodos(
          todos.map((t) =>
            t._id === id ? { ...t, completed: !t.completed } : t
          )
        );
      }
    } catch (error) { }
  };
  /******************************************************************************* */
  const handleAdd = async (title) => {
    try {
      const { data } = await axios.post(config.SERVER_URL + "/todos", {
        completed: false,
        title,
        userId: user._id,
      });

      if (data.success) {
        setTodos([...todos, data.todo]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  /******************************************************************************* */
  const handleEdit = async (id, title) => {
    try {
      const { data } = await axios.put(config.SERVER_URL + `/todos/${id}`, {
        title,
      });
      if (data.success) {
        setTodos(todos.map((t) => (t._id === id ? { ...t, title } : t)));
      }
    } catch (error) {
      console.log(error);
    }
  };
  /******************************************************************************* */

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(config.SERVER_URL + `/todos/${id}`);
      if (data.success) {
        setTodos(todos.filter((t) => t._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /******************************************************************************* */

  BackHandler.addEventListener("hardwareBackPress", () => true);

  return (
    <SafeAreaView style={tailwind`h-full p-4 bg-slate-50`}>
      <View style={tailwind`flex-row justify-between items-center mt-5`}>
        <Text style={tailwind`text-2xl text-slate-900`}>
          Hello , <Text style={tailwind`text-cyan-500 font-bold `}>{user.username}</Text>
        </Text>

        <TouchableOpacity
          onPress={() => {
            setUser({ ...user, isAuth: false });
            navigation.goBack();
          }}
        >
          <Text style={tailwind`text-sm text-slate-900 font-bold bg-cyan-100 px-4 py-2 text-center rounded-lg`}>

            ➔
          </Text>
        </TouchableOpacity>
      </View>

      <Form handleAdd={handleAdd} />
      <Text style={tailwind`text-sm text-slate-400 mb-3`}>
        <Text style={tailwind`text-xl text-cyan-500 font-bold`}>
          {todos.filter((t) => t.completed).length}/{todos.length}
        </Text>
        {" "}completed</Text>
      <FlatList
        data={todos}
        keyExtractor={(todo) => todo._id}
        horizontal={false}
        renderItem={({ item }) => (
          <Todo
            id={item._id}
            title={item.title}
            isCompleted={item.completed}
            handleCheck={handleCheck}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            todos={todos}
            setTodos={setTodos}
          />
        )}
      />
    </SafeAreaView>
  );
}
