import React, { useState,useEffect } from "react";
import { useDispatch } from "react-redux";
import { getProducts } from "../redux/actions/productsActions";
import { StyleSheet, Text, View, ScrollView, FlatList,SafeAreaView,ItemSeparatorView } from "react-native";
import ListItem from "./Lists/ListItem";


const List = (props) => {
  const [isFetching, setIsFetching] = useState(false);

  const dispatch = useDispatch();

  // const fetchproducts = () => dispatch(getProducts());

  const fetchData = () => {
    dispatch(getProducts());
    setIsFetching(false);
  };
  
  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  // Render Item;
  const renderItem = ({ item }) => <ListItem {...item}/>;

  return (
        <FlatList
            data={props.products}
            numColumns={2}
            onRefresh={onRefresh}
            refreshing={isFetching}
            keyExtractor={item => item.id.toString()}
            ItemSeparatorComponent={ItemSeparatorView}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
        /> 
  );
};

export default List;

const styles = StyleSheet.create({});
// <ScrollView Vertical showsVerticalScrollIndicator={true}>
//  <View style={{flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap',marginBottom:85}}>
{
  /* {
     itemTshirt.map((d,i)=>{
         return  <ListItem key={i} {...d}/>
     })
 } */
}


       //   <FlatList
        //     data={products}
        //     numColumns={2}
        //     keyExtractor={item => item.id}
        //     renderItem={renderItem}
        //     // renderItem={({item}) => <ListItem {...item}/>}
        //     showsVerticalScrollIndicator={false}
        //     ListFooterComponent={ListItem}
        //   />
        
   ////------------------------     
        
        
//         <ScrollView Vertical showsVerticalScrollIndicator={true}>
//  <View style={{flexDirection: 'row', justifyContent: 'flex-start', flexWrap: 'wrap',marginBottom:85}}>
//    {
//        props.products.map((d,i)=>{
//            return  <ListItem key={i} {...d}/>
//        })
//    } 
//    </View>
//  </ScrollView>