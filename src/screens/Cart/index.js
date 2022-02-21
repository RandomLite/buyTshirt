import React,{ useState} from 'react'
import { StyleSheet, Text, View,FlatList,SafeAreaView,TouchableOpacity } from 'react-native'
import { useSelector } from 'react-redux';

import CartItem from "../../components/Lists/CartListItem";


const CartList = () => {

  // Getting the cart items
  const { carts } = useSelector(state => state.productsReducer);

  const renderItem = ({ item }) => <CartItem {...item} />;

  const ItemSeparatorView = () => {
    return (
      <View
        style={styles.itemSeparatorView}
      />
    );
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {carts.length === 0 ? (
      <Text style={{ color: '#64676D', fontSize: 18, marginTop:50 }}>
        Your cart is empty...
      </Text>
    ) : (
      <SafeAreaView style={styles.flatlist}>
      <FlatList
        data={carts}
        ItemSeparatorComponent={ItemSeparatorView}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      </SafeAreaView>
    )}
  </View>
  )
}

export default CartList

const styles = StyleSheet.create({

  itemSeparatorView:{
    height: 0.5,
    width: '100%', 
    backgroundColor: '#C8C8C8'

  }
})