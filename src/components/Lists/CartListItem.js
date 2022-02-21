import React,{ useState} from 'react'
import Swipeable from "react-native-gesture-handler/Swipeable";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  TouchableOpacity,
  CheckBox,
  Alert
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";

import { removeFromCart } from "../../redux/actions/productsActions";

import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";



const CartListItem = (item) => {
  
    const dispatch = useDispatch();

    const removeFromCartList = (product) => dispatch(removeFromCart(product));
  
    const handleRemoveFromCart = (product) => {
      removeFromCartList(product);
    };

    // Swipe to delete function
    const rightSwipeActions = () => {
        return (
          <TouchableOpacity onPress={() => handleRemoveFromCart(item)}>
         
            <View
              style={{
                backgroundColor: "#ff596f",
                justifyContent: "center",
                alignItems: "flex-end",
                height: "80%",
                marginTop: 15,
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

// Create to the firebase firestore
      const productCollectionRef = collection(db, "orders");

      const createOrder = async () => {
        await addDoc(productCollectionRef, { items:item});
      };

      const createTwoButtonAlert = () =>
    
      Alert.alert(
        "Order "+`${item.title}`,
        "Please confirm your order?",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "Confirm", onPress: () => orderComplete() }
        ]
      );

    
      const orderComplete = () =>
    
      Alert.alert(
        `${item.title}`+" is ordered ",
        "",
        [
          { text: "Ok", onPress: () =>  createOrder(item) }
        ]
      );

   




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
      <View style={styles.cardInfo}>
        <Text style={styles.cardTitle}>{item.title}</Text>
       
          <Text style={styles.Price}>
            <Text>€{item.price}</Text>
          </Text>
          {/* <AntDesign name="shoppingcart" size={30} color="black" style={styles.cart}/>          */}
           <View style={styles.CartAndOrder}>
          <TouchableOpacity
           onPress={() => handleRemoveFromCart(item)}
           >
            <Text style={styles.cart}>REMOVE CART</Text>
          </TouchableOpacity>
       
        <TouchableOpacity
           onPress={() =>createTwoButtonAlert()}
           >
            <Text style={styles.order}>ORDER</Text>
          </TouchableOpacity>
           </View>
      </View>
    </View>
  </Swipeable>  
  )
}

export default CartListItem


const styles = StyleSheet.create({
    cardItem: {
      flex: 1,
      flexDirection: "row",
      marginTop: 15,
      marginBottom: 15,
      marginHorizontal: 10,
      backgroundColor: "#f6f6f6",
      width: "100%",
      height: "auto",
      // justifyContent: "space-between",
      paddingRight:10,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
  
      elevation: 3,
    },
  
    imgArea:{
      width: "40%"
    },
    cardPicture: {
      width: "100%",
      height: 120,
    },
  
    cardInfo: {
      width:"60%",
      padding: 12,
      // height: 75,
      flexDirection: "column",
      justifyContent: "space-between",
    },
  
    cardTitle: {
      color:"#1564a2",
      fontFamily: "ChalkboardSE-Bold",
      fontSize: 16,
      fontWeight:"400",
    },
  
    Price: {
      fontFamily: "ChalkboardSE-Bold",
      fontSize: 15,
      color: "#2e2e2e",
    },

    CartAndOrder: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    cart:{
    color:"red"
    },
order: {
  color:"#007aff"
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
  
  });