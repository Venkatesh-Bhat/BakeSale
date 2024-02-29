import { StyleSheet, Text, Image, View, TouchableOpacity } from "react-native";
import React from "react";

import priceDisplay from "../util";

export default function DealItem({ deal, onPress }) {
  const handlePress = () => onPress(deal.key);

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <Image source={{ uri: deal.media[0] }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{deal.title}</Text>
        <View style={styles.footer}>
          <Text style={styles.cause}>{deal.cause.name}</Text>
          <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  footer: {
    flexDirection: "row",
  },
  cause: {
    flex: 2,
  },
  info: {
    backgroundColor: "#fff",
    padding: 10,
    borderColor: "#bbb",
    borderWidth: 1,
    borderTopWidth: 0,
  },
  image: {
    width: "100%",
    height: 200,
  },
  price: {
    flex: 1,
    textAlign: "right",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 5,
  },
});
