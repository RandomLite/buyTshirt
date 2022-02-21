import React from "react";
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch,useSelector } from "react-redux";

import {
  removeWishlist,
  addToCart,
  removeFromCart,
} from "../../redux/actions/productsActions";

const ListItem = (item) => {
  const {carts } = useSelector((state) => state.productsReducer);

  const dispatch = useDispatch();

  const removeFromWishlist = (product) => dispatch(removeWishlist(product));

  const handleRemoveWishlist = (product) => {
    removeFromWishlist(product);
  };

  //Add to carts
  const addToCartList = (product) => dispatch(addToCart(product));
  const removeFromCartList = (product) => dispatch(removeFromCart(product));

  const handleAddToCart = (product) => {
    addToCartList(product);
  };

  const handleRemoveFromCart = (product) => {
    removeFromCartList(product);
  };

  const ifCartExists = (product) => {
    if (carts.filter((item) => item.id === product.id).length > 0) {
      return true;
    }

    return false;
  };
  const rightSwipeActions = () => {
    return (
      <TouchableOpacity onPress={() => handleRemoveWishlist(item)}>
        <View
          style={{
            backgroundColor: "#ff596f",
            justifyContent: "center",
            alignItems: "flex-end",
            height: "78%",
            marginTop: 18,
            borderRadius: 10,
          }}
        >
          <Text
            style={{
              color: "#f6f6f6",
              fontSize: 16,
              paddingHorizontal: 10,
              fontWeight: "600",
              paddingHorizontal: 30,
              paddingVertical: 20,
            }}
          >
            Remove
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <Swipeable renderRightActions={rightSwipeActions}>
      <View style={styles.cardItem}>
        <View style={styles.imgArea}>
          <Image
            source={{ uri: item.image }}
            resizeMode="cover"
            style={styles.cardPicture}
          />
        </View>
        <View style={styles.heartArea}>
          <TouchableOpacity
            style={styles.heart}
            onPress={() => handleRemoveWishlist(item)}
          >
            <MaterialCommunityIcons
              name="heart-remove"
              size={22}
              color="#ff596f"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.cardTitle}>{item.title}</Text>
          <View style={styles.priceAndCart}>
            <Text style={styles.Price}>
              <Text>€{item.price}</Text>
            </Text>
            {/* <AntDesign name="shoppingcart" size={30} color="black" style={styles.cart}/>          */}
            <TouchableOpacity style={styles.cart}
          onPress={() =>
            ifCartExists(item)
              ? handleRemoveFromCart(item)
              : handleAddToCart(item)
          }
          >
            {ifCartExists(item) ? <Text>IN CART</Text> : <Text style={{color:"#007aff"}}>ADD TO CART</Text>}
          </TouchableOpacity>
          </View>
        </View>
      </View>
    </Swipeable>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  cardItem: {
    flex: 1,
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 15,
    marginHorizontal: 10,
    width: "100%",
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

  imgArea: {
    width: "40%",
  },
  cardPicture: {
    width: "100%",
    height: 120,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },

  cardInfo: {
    width: "60%",
    padding: 12,
    flexDirection: "column",
    justifyContent: "space-between",
  },

  cardTitle: {
    fontFamily: "ChalkboardSE-Bold",
    fontSize: 16,
    fontWeight:"400",
    width:"75%"
  },

  Price: {
    fontFamily: "ChalkboardSE-Bold",
    fontSize: 15,
    color: "#2d2d2d",
  },

  priceAndCart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 15,
  },

  heartArea:{
    position: "absolute",
    right:20,
    top:10,
    zIndex:100
  },
  heart: {
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

  // cart:{
  //     position: 'absolute',
  //     bottom: 10,
  //     right:8
  // }
});
