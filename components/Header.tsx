import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Header = () => (
  <View style={styles.headerContainer}>
    <Text style={styles.headerText}>To-Do List</Text>
  </View>
);

const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 16,
    backgroundColor: "#007AFF",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});

export default Header;
