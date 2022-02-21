import React from 'react'
import { StyleSheet, Text, View,FlatList,SafeAreaView } from 'react-native'
import { useSelector } from 'react-redux';

import ListItem from "../../components/Lists/WishListItem";


const WishlistScreen = () => {

  // Getting the wished items
  const { wishlists } = useSelector(state => state.productsReducer);

  const renderItem = ({ item }) => <ListItem {...item} />;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    {wishlists.length === 0 ? (
      <Text style={{ color: '#64676D', fontSize: 18, marginTop:50 }}>
        Your wishlist is empty...
      </Text>
    ) : (
      <SafeAreaView style={styles.flatlist}>
      <FlatList
        data={wishlists}
        extraData={wishlists}
        // numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />
      </SafeAreaView>
    )}
  </View>
  )
}

export default WishlistScreen

const styles = StyleSheet.create({
  flatlist:{
    marginTop:10
  }
})