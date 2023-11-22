import {
  SafeAreaView,
  Image,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";

export default function Countries({ navigation }) {
  const [countries, setCountries] = useState([]);
  const [text, setText] = useState("");
  const [results, setResults] = useState();

  async function getCountries() {
    try {
      setResults();
      const response = await fetch("https://restcountries.com/v3.1/all");
      const data = await response.json();
      console.log("Pressed");
      setCountries(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getCountries();
  }, []);

  async function handleSearch() {
    try {
      const response = await fetch(
        "https://restcountries.com/v3.1/name/" + text
      );
      const data = await response.json();
      setResults(data);
    } catch (error) {
      Alert.alert(
        "Something went wrong",
        "Seems like there's no such country in the world.",
        [
          {
            text: "Close",
          },
        ]
      );
    }
  }

  function handleSubmit() {
    handleSearch();
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 32,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 32,
            paddingLeft: 16,
          }}
        >
          {results ? (
            <Text
              style={{
                fontWeight: "800",
                fontSize: 20,
                textTransform: "capitalize",
              }}
            >
              {text}
            </Text>
          ) : (
            <Text
              style={{
                fontWeight: "800",
                fontSize: 20,
              }}
            >
              All Countries
            </Text>
          )}
        </View>

        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 20,
          }}
        >
          <TextInput
            placeholder="Search for a country"
            style={styles.input}
            value={text}
            onChangeText={(text) => setText(text.toLowerCase())}
            onSubmitEditing={handleSubmit}
          />
        </View>

        {results ? (
          <View style={styles.grid}>
            {results.map((country) => (
              <Pressable
                onPress={() => navigation.navigate("Country", country)}
                key={country.name.common}
                style={styles.gridItem}
              >
                <Image
                  source={{ uri: country.flags.png }}
                  style={styles.flag}
                />
                <Text style={styles.name}>{country.name.common}</Text>
                <Text style={styles.text}>{country.flags.alt}</Text>
              </Pressable>
            ))}

            <Pressable style={styles.buttonContainer} onPress={getCountries}>
              <Text style={styles.buttonText}>Refresh</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.grid}>
            {countries.map((country) => (
              <Pressable
                onPress={() => navigation.navigate("Country", country)}
                key={country.name.common}
                style={styles.gridItem}
              >
                <Image
                  source={{ uri: country.flags.png }}
                  style={styles.flag}
                />
                <Text style={styles.name}>{country.name.common}</Text>
                <Text style={styles.text}>{country.flags.alt}</Text>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  input: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 30,
    borderWidth: 2,
    borderStyle: "solid",
    borderColor: "#999",
  },
  grid: {
    gap: 16,
  },
  gridItem: {
    padding: 16,
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
    lineHeight: 24,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
    backgroundColor: "#333",
    width: 300,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
  },
});
