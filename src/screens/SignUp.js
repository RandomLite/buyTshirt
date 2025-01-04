import React from "react";
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,TextInput,Pressable,Alert,TouchableOpacity } from "react-native";
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import image from "../../assets/istockphoto.jpg";
import { db } from "../services/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import { Touchable } from "react-native-web";
// import { onSignIn } from "../../auth";


const SignUp = ({navigation}) => {
    // const navigation = useNavigation();
    const [name, onChangeName] = React.useState("");
    const [surname, onChangeSurname] = React.useState("");
    const [email, onChangeEmail] = React.useState("");
    const [password, onChangePassword] = React.useState("");
    

    //GET Users from Firebase
    // const [users, setUsers] = useState([]);
    // const productCollectionRef = collection(db, "users");

    // useEffect(() => {
    //   const getOrders = async () => {
    //     const data = await getDocs(productCollectionRef);
    //     setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    //   };

    //   getOrders();
    // }, []);

    // let userBool = users.map((item, i) => {
    //   return (
    //     {
    //     }
    //   );
    // });

    // Create to the firebase firestore
    const productCollectionRef = collection(db, "users");

    const createUser = async () => {
       
      await addDoc(productCollectionRef, { "name":name, "surname":surname, "email":email, "password":password });      
    };

    const registerUserComplete = () =>{
    email!="" && password!=""?
    Alert.alert(
        `${email}`+" is registered sucessfully! ",
        "",
        [
          { text: "Ok", onPress: () =>  createUser() & navigation.navigate("SignInScreen") }
        ]
      ) 
    :
    Alert.alert(
        'Please fill empty fields',
    );
    };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={image}
        resizeMode="cover"
        width="100%"
        style={styles.image}
      ></ImageBackground>

      <View style={styles.sub_container}>
        <View style={styles.welcome_title}>
          <Text style={styles.welcome_text}>Welcome!</Text>
          <Text style={styles.title_text}>Sign Up</Text>
        </View>
        <SafeAreaView>
        <TextInput
            style={styles.input}
            onChangeText={onChangeName}
            placeholder="Name"
            value={name}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeSurname}
            placeholder="Surname"
            value={surname}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="Email"
            value={email}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </SafeAreaView>
        {/* <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="SIGN UP"
        onPress={() => navigation.navigate("SignInScreen")}
      /> */}
        <Pressable
          style={styles.button}
          // onPress={() => alert("Email: "+`${text}`+ "\n"+"Password: "+`${password}`)}
          // onPress={() => navigation.navigate('HomeScreen')}
          onPress={() =>registerUserComplete()}
        >
          <Text style={styles.text}>Sign Up</Text>
        </Pressable>
        <View style={styles.forgotPsw_view}>
          <Text style={styles.forgotPsw}>Forgot password?</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center", marginTop: 15 }}>
            Already have an account?
            <Text
              style={{ color: "rgba(0,119,255,0.83)" }}
              onPress={() => navigation.navigate("SignIn")}
            >
             Sign In
            </Text>
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <TouchableOpacity
            // title="Go to Profile"
            onPress={() => navigation.navigate("HomeScreen")}
          >
           <Text style={styles.text}>Go to Profile</Text>
         </TouchableOpacity>
        </View>
        
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    // flex:10,
    width: "100%",
    height: "100%",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    padding: 0,
  },
  sub_container: {
    flex: 1,
    position: "relative",
    bottom: 0,
    backgroundColor: "#F1F1F1",
    width: "100%",
    marginTop: "45%",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: "5%",
  },
  image: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-start",
    position: "absolute",
    top: 0,
    left: 0,
    height: "70%",
  },
  welcome_title: {
    paddingHorizontal: "4%",
  },
  welcome_text: {
    fontSize: 16,
    color: "rgba(45,45,45,0.75)",
  },
  title_text: {
    fontSize: 24,
    color: "#2d2d2d",
    fontWeight: "bold",
  },

  text: {
    color: "blue",
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    marginTop: 20,
    marginHorizontal: "4%",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#0077FF",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  forgotPsw_view: {
    marginTop: 25,
  },
  forgotPsw: {
    color: "rgba(0,119,255,0.83)",
    textAlign: "center",
  },
});
