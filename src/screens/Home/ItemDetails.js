import React, {useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Button, Dimensions, TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useSelector, useDispatch } from "react-redux";
import {
  addToCart,
  removeFromCart
} from "../../redux/actions/productsActions";
import { color } from "react-native-elements/dist/helpers";

const ItemDetails = ({ route }) => {
  const { item } = route.params;

  // Cart
  const {carts } = useSelector((state) => state.productsReducer);
  const dispatch = useDispatch();

  const addToCartList = (product) => dispatch(addToCart(product));
  const removeFromCartList = (product) => dispatch(removeFromCart(product));

  const handleAddToCart = (product) => {
    addToCartList(product);
  };

  const handleRemoveFromCart = (product) => {
    removeFromCartList(product);
  };

  const ifCartExists = (product) => {
    if (carts.filter((item) => item.title === product.title).length > 0) {
      return true;
    }

    return false;
  };

  // Quantity
  const [quantity, setQuantity] = useState(1);

  function addQty(){
      setQuantity(quantity + 1)
  }

  function minusQty(){
    if(quantity > 1){
      setQuantity(quantity - 1)
    }
  }
  // Size
  const [activeSize, setActiveSize] = useState(" ");

  return (
    <ScrollView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{uri: item.image}} style={styles.image}/>
        </View>
        <View>
            <View style={styles.informationContainer}>
                <Text style={styles.itemTitle}>{item.title}</Text>
                <Text style={styles.itemBrand}>{item.brand}</Text>
                <Text style={styles.itemPrice}>{item.price}€</Text>
            </View>
            <View style={styles.mainSizeArea}>
                <Text style={styles.submainSizeArea}>Size</Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => setActiveSize("S")}>
                    <View style={activeSize == "S" ? styles.sizeActive : styles.sizeContainer}>
                      <Text style={styles.sizeItem}>S</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActiveSize("M")}>
                    <View style={activeSize == "M" ? styles.sizeActive : styles.sizeContainer}>
                      <Text style={styles.sizeItem}>M </Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActiveSize("L")}>
                    <View style={activeSize == "L" ? styles.sizeActive : styles.sizeContainer}>
                      <Text style={styles.sizeItem}>L</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActiveSize("XL")}>
                    <View style={activeSize == "XL" ? styles.sizeActive : styles.sizeContainer}>
                        <Text style={styles.sizeItem}>XL</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setActiveSize("XXL")}>
                    <View style={activeSize == "XXL" ? styles.sizeActive : styles.sizeContainer}>
                        <Text style={styles.sizeItem}>XXL</Text>
                    </View>
                  </TouchableOpacity>
                  
                </View>
                
            </View>
            <View style={styles.qtyContainer}>
                <Text style={styles.qtyText}>Qty</Text>
                <TouchableOpacity onPress={minusQty}>
                  <View style={styles.qtyItemContainer}>
                      <AntDesign name="minus" style={{marginTop: 3, marginLeft: 2}} size={20} color="black"/>  
                  </View>
                </TouchableOpacity>
                <View style={styles.qtyNumberContainer}>
                    <Text style={styles.qtyNumber}>{quantity}</Text>
                </View>
                <TouchableOpacity onPress={addQty}>
                  <View style={styles.qtyItemContainer}>
                      <AntDesign name="plus" style={{marginTop: 3, marginLeft: 2}} size={20} color="black"/>   
                  </View>
                </TouchableOpacity>
                <View style={styles.cartContainer}>
                  <TouchableOpacity style={styles.cart} onPress={() =>
                      ifCartExists(item)
                        ? handleRemoveFromCart(item)
                        : handleAddToCart(item)
                    }>
                  <Text>{ifCartExists(item) ? "Remove From Cart" : "Add To Cart"}</Text>
                  </TouchableOpacity>
                </View>
            </View>
        </View>
    </ScrollView>

  )
}

export default ItemDetails

const styles = StyleSheet.create({
  
  cartContainer:{
    marginLeft: 14,
    borderWidth: 1,
    padding: 10
    
  },
  container:{
    backgroundColor: "#fff",
    paddingBottom: 20,
  },
  imageContainer: {
      paddingTop: 30, // this fixes the image in the middle
      alignItems: 'center',
      height: 280,
      backgroundColor: '#eceff1',
      borderTopColor: '#e0e6e8',
      borderTopWidth: 2
  },
  image: {
      width: 170,
      height: 210
  },
  informationContainer:{
      paddingTop: 15, 
      paddingBottom: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#e0e6e8',
      marginLeft: 25,
      marginRight: 25
  },
  itemTitle: {
      fontSize: 23,
      fontWeight: '400',
      textAlign: 'center',
      letterSpacing: 1,
  },
  itemBrand:{
      color: '#7f96a2',
      textAlign: 'center',
      fontSize: 17,
      marginTop: 6,
      letterSpacing: 1
  },
  itemPrice: {
      textAlign: 'center',
      marginTop: 10,
      fontSize: 19,
      fontWeight: '500',
      letterSpacing: 1
  },
  mainSizeArea:{
    flexDirection: 'row', 
    paddingTop: 20, 
    alignItems: 'center'
  },
  submainSizeArea:{
    fontSize: 18, 
    marginLeft: 30,
    marginRight: 20,
  },
  sizeContainer: {
      borderWidth: 1,
      width: 40,
      height: 40,
      marginRight: 15      
  },
  sizeActive:{
    borderWidth: 1,
    width: 40,
    height: 40,
    marginRight: 15,
    backgroundColor: "#eee",
    borderColor: "#eee",
  },
  sizeItem:{
      fontSize: 17,
      textAlign: 'center',
      paddingTop: 9
  },
  qtyContainer:{
      marginLeft: 36,
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center'
  },
  
  qtyText:{
      fontSize: 18,
      marginRight: 20
  },
  qtyItemContainer:{
      borderWidth: 1,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
  },
  qtyNumberContainer:{
      marginLeft: 18,
      marginRight: 18
  },
  qtyNumber:{
      fontSize: 20,
      fontWeight: '500',
      letterSpacing: 1
  }


});