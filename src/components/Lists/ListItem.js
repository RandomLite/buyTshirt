import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { Entypo, Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  addWishlist,
  removeWishlist,
} from "../../redux/actions/productsActions";
import { useNavigation } from "@react-navigation/native";

const ListItem = (item) => {
  const { wishlists } = useSelector((state) => state.productsReducer);
  const navigation = useNavigation();

  const dispatch = useDispatch();

  //Wishlist
  const addToWishlist = (product) => dispatch(addWishlist(product));
  const removeFromWishlist = (product) => dispatch(removeWishlist(product));

  const handleAddWishlist = (product) => {
    addToWishlist(product);
  };

  const handleRemoveWishlist = (product) => {
    removeFromWishlist(product);
  };

  const ifWishlistExists = (product) => {
    if (wishlists.filter((item) => item.id === product.id).length > 0) {
      return true;
    }

    return false;
  };

  return (
    <TouchableOpacity
      style={styles.cardItem}
      onPress={() => {
        navigation.navigate("ItemDetail", { item });
      }}
    >
      <View>
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={styles.cardPicture}
        />
        <TouchableOpacity
          style={styles.heart}
          onPress={() =>
            ifWishlistExists(item)
              ? handleRemoveWishlist(item)
              : handleAddWishlist(item)
          }
        >
          {/* <View style={styles.heart}> */}
          <Entypo
            name={ifWishlistExists(item) ? "heart" : "heart-outlined"}
            size={22}
            color={ifWishlistExists(item) ? "#ff596f" : "#64676D"}
          />
          {/* </View>  */}
        </TouchableOpacity>
      </View>

      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>

        <Text style={styles.Price}>
           €{item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  cardItem: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: "auto",
    marginRight: "auto",
    width: "48%",
    height: "auto",
    borderRadius: 15,
    borderColor: "#ffffff",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  cardPicture: {
    width: "auto",
    height: 180,
    // marginLeft: 15,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  cardInfo: {
    padding: 12,
    height: 75,
    paddingTop:3,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  cardTitle: {
    // textAlign: 'center',
    fontFamily: "ChalkboardSE-Bold",
    fontSize: 15,
    fontWeight: "400"
  },

  Price: {
    fontFamily: "ChalkboardSE-Bold",
    fontSize: 15,
    color: "#2f2f2f90",
  },

  heart: {
    position: "absolute",
    right: 8,
    top: 10,
    borderRadius: 50,
    backgroundColor: "#ffff",
    padding: 6,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },

  cart: {
    borderRadius: 50,
    backgroundColor: "#ffff",
    padding: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});
