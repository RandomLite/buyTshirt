import React, { useState, useMemo, useEffect } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import TshirtList from "../../components/List";
import { SearchBar } from "react-native-elements";
import { getProducts } from "../../redux/actions/productsActions";
import { useFocusEffect } from '@react-navigation/native';
import { Platform } from 'react-native';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productsReducer);

  // Fetch products on screen focus
  useFocusEffect(
    React.useCallback(() => {
      dispatch(getProducts());
    }, [dispatch])
  );

  // Search handling
  const [search, setSearch] = useState('');
  const masterDataSource = useMemo(() => products, [products]);
  const [filteredDataSource, setFilteredDataSource] = useState([]);

  // Update filtered data whenever products are fetched
  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredDataSource(products);
    }
  }, [products]);

  const searchFilterFunction = (text) => {
    const formattedText = text.toUpperCase();
    if (formattedText.length > 0) {
      const filtered = masterDataSource.filter((item) =>
        item.title ? item.title.toUpperCase().includes(formattedText) : false
      );
      setFilteredDataSource(filtered);
    } else {
      setFilteredDataSource(masterDataSource);
    }
    setSearch(text);
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <SearchBar
          containerStyle={styles.searchBarContainer}
          inputStyle={styles.searchInput}
          inputContainerStyle={styles.searchInputContainer}
          showLoading={false}
          platform={Platform.OS}
          clearIcon={true}
          placeholder="Search T-shirt"
          value={search}
          onChangeText={searchFilterFunction}
          onClear={() => searchFilterFunction('')}
          cancelButtonTitle="Cancel"
        />
      </View>
      <TshirtList products={filteredDataSource} />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    height: "100%",
    paddingHorizontal: 10,
  },
  searchBar: {
    top: 5,
  },
  searchBarContainer: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 3,
    alignItems: "center",
  },
  searchInput: {
    backgroundColor: "#fff",
    height: 40,
    color: "#2d2d2d",
  },
  searchInputContainer: {
    backgroundColor: "#fff",
    height: 40,
    borderRadius: 25,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
