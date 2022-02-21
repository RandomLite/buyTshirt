//@refresh reset
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image } from 'react-native'
import React,{useState,useEffect} from 'react'
import { db } from "../../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot
} from "firebase/firestore";


const OrdersScreen = () => {

  const [orders, setOrders] = useState([]);
  const productCollectionRef = collection(db, "orders");

  useEffect(() => {
    const getOrders = async () => {
      const data = await getDocs(productCollectionRef);
      setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getOrders();
  }, []);

  const deleteOrder = async (id) => {
    const orderDoc = doc(db, "orders", id);
    await deleteDoc(orderDoc);
  };

//Scroll to refresh
const [isFetching, setIsFetching] = useState(false);

  const fetchData = () => {
    const getOrders = async () => {
      const data = await getDocs(productCollectionRef);
      setOrders(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getOrders();
    setIsFetching(false);
  };
  
  const onRefresh = () => {
    setIsFetching(true);
    fetchData();
  };

  // ItemSeparatorView
  const ItemSeparatorView = () => {
    return (
      <View
        style={styles.itemSeparatorView}
      />
    );
  };

  //Item
  const renderItem = ({item}) => 
  <View style={styles.orderItem}>
          <Image
            source={{ uri: item.items.image }}
            // resizeMode="contain"
            resizeMode="cover"
            style={styles.image}
          />
          <View style={styles.orderInfoAndDelete}>
          <View style={styles.orderInfo}>
          <Text style={styles.title}>{item.items.title}</Text>
          <Text style={styles.price}>€{item.items.price}</Text>
          </View>
          <TouchableOpacity
          onPress={() =>deleteOrder(item.id)}
          style={styles.deleteButton}
          >
            <Text style={styles.deleteText}>
            Delete Order
            </Text>
          </TouchableOpacity>
          </View>
    </View>;

  return (
      orders.length===0 ?
      <View style={styles.mainOrder}>
      <Text style={styles.emptyOrders}>
      Your have no orders yet...
      </Text>
      </View>
      :
      <FlatList
      data={orders}
      onRefresh={onRefresh}
      refreshing={isFetching}
      keyExtractor={item => item.id.toString()}
      ItemSeparatorComponent={ItemSeparatorView}
      renderItem={renderItem}
      showsVerticalScrollIndicator={false}
      />     
  )
}

export default OrdersScreen

const styles = StyleSheet.create({
  mainOrder:{
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center"
  },

  emptyOrders:{
    color: '#64676D', 
    fontSize: 18
  },

  orderItem:{
    flexDirection:"row",
    alignItems:"center",
    justifyContent: "space-between",
    margin:10
  },

  image:{
    height:80,
    width:"30%",
    borderRadius: 5
  },
  orderInfoAndDelete:{
    flexDirection: "row",
    justifyContent: "space-between",
    width: "70%",
    paddingHorizontal:15,
    alignItems: "center",
  },

  orderInfo:{
  width:"60%"
  },

  title:{
    color:"#292b2c",
    fontWeight:'600',
    fontSize:15,
    marginBottom:10
  },
  
  price:{
    color:"#007aff"
  },

  deleteButton:{
    // backgroundColor: "#ff3030",
    padding:10,
    marginLeft:5,
    borderRadius: 5
  },

  deleteText:{
    color:"#ff3030"
  },

  itemSeparatorView:{
    height: 0.5,
    width: '100%', 
    backgroundColor: '#C8C8C8'
  }
})