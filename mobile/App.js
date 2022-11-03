import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import { UserContext } from "./src/contexts/UserContext";
import Home from "./src/screens/Home";
import Login from "./src/screens/Login";
import Register from "./src/screens/Register";

export default function App() {
  const Stack = createNativeStackNavigator();

  const [user, setUser] = useState(null);



  useEffect(() => {
    const getUser = async () => {
      try {
        const loadedUser = JSON.parse(await AsyncStorage.getItem("user"));
        setUser(loadedUser);
          
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <NavigationContainer>
        <Stack.Navigator>
         {
          user?.isAuth ? (
             <Stack.Screen
            name="Home"
            component={Home}
             options={{
              headerShown: false,            
            }}
          />
          ) : (
              <>
              <Stack.Screen
                          name="Login"
                          component={Login}
                          options={{
                            headerShown: false,
                          }}
                        />
                        <Stack.Screen
                          name="Register"
                          options={{
                            headerShown: false,
                          }}
                          component={Register}
                        />
              </>
          )
         }
         
        
        </Stack.Navigator>
      </NavigationContainer>
    </UserContext.Provider>
  );
}
