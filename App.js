import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Countries from "./screens/Countries";
import Country from "./screens/Country";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen name="Countries" component={Countries} />
        <Stack.Screen name="Country" component={Country} />
      </Stack.Navigator>

      <StatusBar style="dark" />
    </NavigationContainer>
  );
}
