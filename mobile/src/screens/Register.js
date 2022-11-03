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
import config from "../utils/config";

const textsInputStyle = tailwind`w-4/5 border border-gray-400 p-5 rounded-lg bg-gray-50 mb-5 `;


const Register = ({ navigation }) => {
  const [error, setErrorText] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const { user, setUser } = useContext(UserContext);

  const handleRegister = async () => {
    if (username === "") setErrorText("Veuillez entrer un nom d'utilisateur");
    else if (password === "") setErrorText("Veuillez entrer un mot de passe");
    else if (password !== passwordConf)
      setErrorText("Passwords do not match");
    else {
      try {
        const { data } = await axios.post(
          config.SERVER_URL + "/auth/register",
          {
            username,
            password,
          }
        );
        if (data.success) {
          setUser(data.user);

          await AsyncStorage.setItem(
            "user",
            JSON.stringify({
              username,
              password,
              isAuth: true,
            })
          );

          setUser({
            username,
            password,
          });

          navigation.navigate("Home");
        } else {
          setErrorText(data.message);
        }
      } catch (error) {
        console.log(error);
        setErrorText("Something went wrong");
      }
    }
  };

  return (
    <SafeAreaView>
      <StatusBar style="auto" />
      <ScrollView style={tailwind`h-full bg-white`}>
        <View
          style={tailwind`mt-10 flex flex-col items-center justify-center bg-white`}
        >
          <Text
            style={tailwind`text-4xl font-bold my-10 text-sky-500 text-left `}
          >
            Create an account
          </Text>

          {error != "" && (
            <View style={tailwind`bg-red-300 w-4/5 p-5 mb-5 rounded-lg`}>
              <Text style={tailwind`text-slate-900 text-center`}>{error}</Text>
            </View>
          )}
          <TextInput
            style={textsInputStyle}
            onChangeText={(text) => setUsername(text)}
            placeholder="Username"
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={textsInputStyle}
            onChangeText={(text) => setPassword(text)}
            placeholder="Password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />
          <TextInput
            style={textsInputStyle}
            onChangeText={(text) => setPasswordConf(text)}
            placeholder="Confirm password"
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
          />

          <TouchableOpacity
            style={tailwind`bg-cyan-500 w-4/5 p-5 rounded-lg `}
            onPress={handleRegister}
          >
            <Text style={tailwind`text-white text-center`}>S'inscrire</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text
              style={tailwind`text-slate-900 text-center mt-5 underline`}
              onPress={() => navigation.navigate("Login")}
            >
             Already have an account? Login
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;