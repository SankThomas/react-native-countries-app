import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Image,
  StyleSheet,
  Pressable,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

export default function Country({ navigation, route }) {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 52,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 32,
          }}
        >
          <Pressable onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </Pressable>
          <Text
            style={{
              fontWeight: "800",
              fontSize: 20,
            }}
          >
            {route.params.name.common}
          </Text>
        </View>

        <View>
          <Image source={{ uri: route.params.flags.png }} style={styles.flag} />
          <Text style={styles.name}>{route.params.name.common}</Text>
          {route.params.flags.alt && (
            <Text style={styles.text}>{route.params.flags.alt}</Text>
          )}

          {route.params.coatOfArms.png && (
            <>
              <Text style={styles.name}>Coat of Arms</Text>
              <Image
                source={{ uri: route.params.coatOfArms.png }}
                style={styles.flag}
              />
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
  },
  flag: {
    width: "100%",
    height: 200,
    resizeMode: "contain",
  },
  name: {
    fontWeight: "800",
    fontSize: 24,
    marginVertical: 16,
  },
  text: {
    color: "#444",
    lineHeight: 28,
    fontSize: 16,
  },
});
