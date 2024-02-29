import {
  StyleSheet,
  Text,
  Image,
  View,
  ScrollView,
  TouchableOpacity,
  PanResponder,
  Animated,
  Dimensions,
  Linking,
  Button,
} from "react-native";
import React from "react";

// import fetchDealDetails from "../ajax"
import priceDisplay from "../util";
import { dealDetails } from "../ajax";

export default function DealDetail({ initialDealData, onBack }) {
  const imageXPos = new Animated.Value(0); // Initial Value for the X Position of the Image
  const [imageIndex, setImageIndex] = React.useState(0);
  const [nextPos, setNextPos] = React.useState(0);

  const imagePanResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gst) => {
      //Move the image as the user moves the image in the X axis.
      imageXPos.setValue(gst.dx);
      Animated.timing(imageXPos, {
        toValue: gst.dx,
        duration: 250,
        useNativeDriver: false,
      }).start();
    },
    onPanResponderRelease: (evt, gst) => {
      const width = Dimensions.get("window").width;
      if (Math.abs(gst.dx) > width * 0.2) {
        //Direction = -1 if image is moving  towards left, else its moving right
        const direction = Math.sign(gst.dx);
        const currIndex = imageIndex - direction;
        //handle the swiping of images
        handleSwipe(width, direction, currIndex);
      } else {
        Animated.timing(imageXPos, {
          toValue: 0,
          duration: 250,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleSwipe = React.useCallback((width, direction, currIndex) => {
    if (currIndex >= 0 && currIndex < deal.media.length) {
      Animated.timing(imageXPos, {
        toValue: width * direction,
        duration: 250,
        useNativeDriver: false,
      }).start(() => {
        //Image moving left (dir = -1), so update the imageIndex to point to next image
        //Image moving Right (dir = 1), so update the imageIndex to point to previous image
        setImageIndex((index) => index - direction);
        //Initial position of the next image, ie from where it should emerge from or where the animation starts
        setNextPos(width * direction * -1);
      });
    }
    //Index out of bounds
    else {
      Animated.timing(imageXPos, {
        toValue: 0,
        duration: 250,
        useNativeDriver: false,
      }).start();
    }
  });

  //Whenever imageIndex and nextPos changes, it will be executed to animate the next Image to bring it from nextPos to default position ie 0.
  React.useEffect(() => {
    imageXPos.setValue(nextPos);
    Animated.timing(imageXPos, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
    // }).start(() => setNextPos(0));
  }, [imageIndex, nextPos]);

  // const fetchDealDetail = async () => {
  //     const details = await fetchDealDetails(initialDealData.key);
  // }
  // React.useEffect(() => {
  //     fetchDealDetail();
  // },[]);

  //API doesn't work, so yeah...
  const [deal, setDeal] = React.useState(initialDealData);
  React.useEffect(() => {
    //   const fullDeal = Object.values(dealDetails).find(
    //     (subObject) => subObject.key === initialDealData.key
    //   );
    if (dealDetails.hasOwnProperty(initialDealData.key)) {
      const fullDeal = dealDetails[initialDealData.key];
      setDeal((prevDetail) => ({ ...prevDetail, ...fullDeal }));
    }
  }, []);

  const getDeal = () => Linking.openURL(deal.url);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => onBack()}>
        <Text style={styles.back}>{"<- Back"} </Text>
      </TouchableOpacity>
      <Animated.Image
        {...imagePanResponder.panHandlers}
        source={{ uri: deal.media[imageIndex] }}
        style={[{ start: imageXPos }, styles.image]}
      />
      <Text style={styles.title}>{deal.title}</Text>
      <ScrollView style={styles.info}>
        <View style={styles.footer}>
          <View style={styles.viewCenter}>
            <Text style={styles.price}>{priceDisplay(deal.price)}</Text>
            <Text style={styles.cause}>{deal.cause.name}</Text>
          </View>
          {deal.user && (
            <View style={styles.viewCenter}>
              <Image source={{ uri: deal.user.avatar }} style={styles.avatar} />
              <Text>{deal.user.name}</Text>
            </View>
          )}
        </View>
        <Text style={styles.description}>{deal.description}</Text>
        <View style={styles.buy}>
          <Button title="Buy this deal!" onPress={getDeal} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 15,
    height: "100%",
  },
  back: {
    marginBottom: 10,
    marginStart: 10,
    color: "skyblue",
    fontSize: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
  },
  cause: {
    fontSize: 17,
  },
  info: {
    // width: "100%",
    flexGrow: 1,
    // height: "50%",
  },
  image: {
    width: "100%",
    height: 200,
  },
  price: {
    // flex: 1,
    fontWeight: "bold",
    fontSize: 17,
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    padding: 10,
    backgroundColor: "peachpuff",
    marginBottom: 5,
  },
  viewCenter: {
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
  },
  description: {
    paddingHorizontal: 15,
  },
  buy: {
    width: "40%",
    marginHorizontal: 20,
    alignSelf: "center",
    marginTop: 30,
  },
});
