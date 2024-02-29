import { StyleSheet, Text, FlatList, View } from "react-native";
import React from "react";

import DealItem from "./DealItem";

export default function DealList({ deals, onItemPress }) {
  return (
    <View style={styles.list}>
      <FlatList
        data={deals}
        renderItem={({ item }) => (
          <DealItem deal={item} onPress={onItemPress} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: "#eee",
    // flex: 1,
    width: "100%",
    height: "100%",
    // marginBottom: 100,
    // paddingBottom: 100,
  },
});
