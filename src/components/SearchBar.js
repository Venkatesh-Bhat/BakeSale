import { StyleSheet, TextInput } from "react-native";
import React from "react";

import debounce from "lodash.debounce";

export default function SearchBar({ searchDeals, currentSearchTerm }) {
  const [searchTerm, setSearchTerm] = React.useState(currentSearchTerm);

  const debouncedSearchDeals = debounce(searchDeals, 250);
  const handleSearch = (searchTerm) => {
    setSearchTerm(searchTerm);
    debouncedSearchDeals(searchTerm);
  };

  return (
    <TextInput
      placeholder="Search All Deals"
      style={styles.search}
      value={searchTerm}
      onChangeText={handleSearch}
    />
  );
}

const styles = StyleSheet.create({
  search: {
    height: 40,
    marginBottom: 10,
    marginHorizontal: 12,
  },
});
