import React, { useState, useEffect,useMemo } from "react";
import { StyleSheet, View,Text } from "react-native";
// import Category from "../../components/Category";
import { useSelector, useDispatch } from "react-redux";

import TshirtList from "../../components/List";
import { SearchBar } from "react-native-elements";
import {  getProducts } from "../../redux/actions/productsActions";
import { useFocusEffect } from '@react-navigation/native';

const HomeScreen = () => {
  
// Thirrja e te dhenave
const dispatch = useDispatch();
const {products}  = useSelector((state) => state.productsReducer);


  const useFetching = (getProducts) => {
    useFocusEffect(
      React.useCallback(() => {
      dispatch(getProducts());
        }, [dispatch,getProducts]
      ))
  }
  useFetching(getProducts);

  

  // Kerkimi i te dhenave

  const [search, setSearch] = useState('');
  const [masterDataSource] = useState(products);
  const [filteredDataSource, setFilteredDataSource] = useState(masterDataSource);
  

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the masterDataSource
      // Update FilteredDataSource
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
      
    } else {
      // Inserted text is blank
      // Update FilteredDataSource with masterDataSource
      setFilteredDataSource(masterDataSource);
      setSearch(text);
    }
  };

 
  return (
    <View
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        paddingHorizontal: 10,
      }}
    >
      <View style={styles.searchBar}>
        <SearchBar
        containerStyle={{
          height: 50,
          backgroundColor: "#fff",
          borderRadius: 25,
          elevation: 3,
          alignItems: "center",
        }}
        inputStyle={{ backgroundColor: "#fff", height: 40, color: "#2d2d2d"}}
        inputContainerStyle={{ backgroundColor: "#fff", height: 40, borderRadius:25}}
        showLoading={false}
        platform={Platform.OS}
        clearIcon={true}
        placeholder="Search T-shirt"
        value={search}
        onChangeText={(text) => searchFilterFunction(text)}
        onClear={(text) => searchFilterFunction('')}
        cancelButtonTitle="Cancel"
      />
      </View>
        {/* <Category/>  */}
        <TshirtList products={filteredDataSource}/>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  searchBar: {
    top: 5,
  },
});
