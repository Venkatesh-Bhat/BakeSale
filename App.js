import {
  StyleSheet,
  Text,
  View,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import React from "react";

import DealList from "./src/components/DealList";
import { dealsData, SearchResults } from "./src/ajax";
import DealDetail from "./src/components/DealDetail";
import SearchBar from "./src/components/SearchBar";

export default function App() {
  // const fetchData = async () => {
  //   const deals = await fetchInitialDeals();
  //   console.log(deals);
  // };

  // React.useEffect(() => {
  //   fetchData();
  // }, []);

  const titleXPos = new Animated.Value(0);

  const animateTitle = (direction = 1) => {
    console.log("Animate");
    //Screens vary in sizes
    const width = Dimensions.get("window").width - 150;
    Animated.timing(titleXPos, {
      toValue: (direction * width) / 2,
      useNativeDriver: false,
      duration: 1000,
      easing: Easing.ease,
    }).start(({ finished }) => {
      // If the first animation was finished only then execute the second animation, otherwise stop the loop
      if (finished) animateTitle(-1 * direction);
    });
  };

  const [deals, setDeals] = React.useState([]);
  const [currDealId, setDealId] = React.useState(null);
  const [activeSearchTerm, setActiveSearchTerm] = React.useState("");
  const [displayFromSearch, setDisplayFromSearch] = React.useState([]);

  // Since API is not working, using useEffect for displaying LOGO for few seconds during the app start up
  React.useEffect(() => {
    animateTitle();
    const timer = setTimeout(() => {
      // if (dealsToDisplay.length === 0)
      setDeals(dealsData);
    }, 1500);
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const setCurrentDeal = React.useCallback((id) => {
    setDealId(id);
  }, []);

  const unsetCurrentDeal = React.useCallback(() => {
    setDealId(null);
    // setDisplayFromSearch([]);
  }, []);

  const findCurrentDeal = () => deals.find((d) => d.key === currDealId);

  const handleSearch = React.useCallback((searchTerm) => {
    setActiveSearchTerm(searchTerm);
    if (searchTerm) setDisplayFromSearch(SearchResults(searchTerm));
    else setDisplayFromSearch(deals);
  }, []);

  // const dealsToDisplay = React.useMemo(() => {
  //   if (displayFromSearch.length === 0) return deals;
  //   return displayFromSearch;
  // }, []);

  const dealsToDisplay =
    displayFromSearch.length > 0 ? displayFromSearch : deals;

  if (currDealId)
    return (
      <View style={styles.main}>
        <DealDetail
          initialDealData={findCurrentDeal()}
          onBack={unsetCurrentDeal}
        />
      </View>
    );
  if (dealsToDisplay.length > 0)
    return (
      <View style={styles.main}>
        <SearchBar
          searchDeals={handleSearch}
          currentSearchTerm={activeSearchTerm}
        />
        <DealList deals={dealsToDisplay} onItemPress={setCurrentDeal} />
      </View>
    );
  return (
    <Animated.View style={[{ start: titleXPos }, styles.container]}>
      <Text style={styles.header}>BakeSale</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    flex: 1,
    marginVertical: 40,
  },
  header: {
    fontSize: 40,
  },
});
