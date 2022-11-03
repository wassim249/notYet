import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { StatusBar } from "expo-status-bar";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import tailwind from "twrnc";
import { UserContext } from "../contexts/UserContext";


const Login = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleLogin = async () => {
    if (userName.trim() === "" || password.trim() === "") {
      setError("All fields are required");
    } else {
      await login();
    }
  };

  const login = async () => {
    try {
      const { data } = await axios.post(config.SERVER_URL + "/auth/login", {
        username: userName,
        password,
      });
      if (data.success) {
        setUser({...data.user , isAuth : true});
        await AsyncStorage.setItem(
          "user",
          JSON.stringify({
            username: userName,
            password,
            isAuth: true,
          })
        );

      
       navigation.navigate("Home");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={tailwind`bg-white h-full`}>
        <View style={tailwind`flex flex-col justify-center items-center mt-10 bg-white`}>
          <Text   
          style={tailwind`text-4xl font-bold my-10 text-sky-500 text-left `}
          >Login</Text>
          {error !== "" && (
            <View
            style={tailwind`bg-red-300 w-4/5 p-5 mb-5 rounded-lg`}
            >
              <Text style={tailwind`text-slate-900 text-center`}>{error}</Text>
            </View>
          )}
          <TextInput
            style={textsInputStyle}
            placeholder="Username"
            autoCapitalize="none"
            onChangeText={(text) => setUserName(text)}
            autoCorrect={false}
          />
          <TextInput
            style={textsInputStyle}
            placeholder="Password"
            onChangeText={(text) => setPassword(text)}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TouchableOpacity 
           style={tailwind`bg-cyan-500 w-4/5 p-5 rounded-lg `}
           onPress={handleLogin}>
            <Text
          style={tailwind`text-white text-center`}
             >Login</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text 
             style={tailwind`text-slate-900 text-center mt-5 underline`}
            >Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const textsInputStyle = tailwind`w-4/5 border border-gray-400 p-5 rounded-lg bg-gray-50 mb-5 `;
