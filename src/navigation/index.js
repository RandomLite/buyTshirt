import * as React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector } from 'react-redux';
import { Platform } from 'react-native';

// Import screens
import HomeScreen from "../screens/Home";
import OrdersScreen from "../screens/Orders";
import WishlistScreen from "../screens/Wishlist";
import AccountScreen from "../screens/Account";
import ItemDetails from "../screens/Home/ItemDetails";
import CartScreen from "../screens/Cart";
import SignInScreen from "../screens/SignIn";  // Sign In Screen
import SignUpScreen from "../screens/SignUp";  // Sign Up Screen

// Navigation Stack Screens
const CartStack = createStackNavigator();
const HomeStack = createStackNavigator();
const OrdersStack = createStackNavigator();
const WishlistStack = createStackNavigator();
const AccountStack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Cart Button
const CartRightNav = (navigation) => {
  const { carts } = useSelector(state => state.productsReducer);
  return (
    <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
      <MaterialCommunityIcons
        name="cart-plus"
        size={30}
        color="#007aff"
        style={{ marginRight: 15 }}
      />
      {carts.length > 0 ? (
        <View style={styles.cartBadge}>
          <Text style={styles.textCartBadge}>{carts.length}</Text>
        </View>
      ) : null}
    </TouchableOpacity>
  );
};

// Home Stack
function HomeStackScreen({ navigation }) {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={() => ({
          headerRight: () => CartRightNav(navigation),
          headerStatusBarHeight: 40,
          headerTitle: "Home"
        })}
      />
      <HomeStack.Screen
        name="ItemDetail"
        component={ItemDetails}
        options={() => ({
          headerRight: () => CartRightNav(navigation),
          headerStatusBarHeight: 40,
          headerTitle: "Details"
        })}
      />
    </HomeStack.Navigator>
  );
}

// Orders Stack
function OrdersStackScreen({ navigation }) {
  return (
    <OrdersStack.Navigator>
      <OrdersStack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={() => ({
          headerRight: () => CartRightNav(navigation),
          headerStatusBarHeight: 40,
          headerTitle: "Orders"
        })}
      />
    </OrdersStack.Navigator>
  );
}

// Wishlist Stack
function WishlistStackScreen({ navigation }) {
  return (
    <WishlistStack.Navigator>
      <WishlistStack.Screen
        name="WishlistScreen"
        component={WishlistScreen}
        options={() => ({
          headerRight: () => CartRightNav(navigation),
          headerStatusBarHeight: 40,
          headerTitle: "Wishlist"
        })}
      />
    </WishlistStack.Navigator>
  );
}

// Account Stack
function AccountStackScreen({ navigation }) {
  return (
    <AccountStack.Navigator>
      <AccountStack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={() => ({
          headerRight: () => CartRightNav(navigation),
          headerStatusBarHeight: 40,
          headerTitle: "Account"
        })}
      />
    </AccountStack.Navigator>
  );
}

// Bottom Tab Navigator
function MainTabNavigation() {
  const { wishlists } = useSelector(state => state.productsReducer);
  
  return (
    <Tab.Navigator
      initialRouteName="TabNav"
      screenOptions={{
        tabBarStyle: {
          paddingVertical: Platform.OS === "ios" ? 10 : 5,
          paddingBottom: Platform.OS === "android" ? 3 : 25,
          width: "auto",
          alignItems: "center",
          padding: 0,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderWidth: 1,
          borderColor: "#e5e5e5",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: "Home",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Orders"
        component={OrdersStackScreen}
        options={{
          tabBarLabel: "Orders",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="receipt" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishlistStackScreen}
        options={{
          tabBarLabel: "Wishlist",
          tabBarBadge: wishlists.length > 0 ? wishlists.length : null,
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountStackScreen}
        options={{
          tabBarLabel: "Account",
          tabBarLabelStyle: { fontSize: 12 },
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// Authentication Stack (Sign In/Sign Up)
const Stack = createStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

// Main App Stack with SignIn as the initial screen
const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ headerShown: false }} // Hide header on the SignIn screen
      />
      <Stack.Screen
        name="MainTabNavigation"
        component={MainTabNavigation}
        options={{ headerShown: false }} // Hide header on the Main Tab Navigation
      />
      <Stack.Screen
        name="SignUpScreen"  // Ensure this screen is defined
        component={SignUpScreen}
        options={{ headerShown: false }} // Hide header on the SignUp screen
      />
    </Stack.Navigator>
  );
};
export default AppStack;

const styles = StyleSheet.create({
  cartBadge: {
    position: "absolute",
    top: -10,
    right: 10,
    backgroundColor: "#ff3030",
    padding: 2,
    borderRadius: 50,
  },
  textCartBadge: {
    width: 15,
    height: 15,
    textAlign: "center",
    color: "#f6f6f6",
  },
});