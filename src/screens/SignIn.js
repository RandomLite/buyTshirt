import React from "react";
import { StyleSheet, Text, View,ImageBackground,SafeAreaView,TextInput,Pressable } from "react-native";
import image from "../../assets/istockphoto.jpg";


const SignIn = ({navigation}) => {
    const [text, onChangeText] = React.useState("");
    const [password, onChangePassword] = React.useState("");
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
          <Text style={styles.title_text}>Sign In</Text>
        </View>
        <SafeAreaView>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            placeholder="Email"
            value={text}
          />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </SafeAreaView>
        <Pressable
          style={styles.button}
          // onPress={() => alert("Email: "+`${text}`+ "\n"+"Password: "+`${password}`)}
          onPress={() => navigation.navigate('LandingScreen')}
        >
          <Text style={styles.text}>SignIn</Text>
        </Pressable>
        <View style={styles.forgotPsw_view}>
          <Text style={styles.forgotPsw}>Forgot password?</Text>
        </View>
        <View>
          <Text style={{ textAlign: "center", marginTop: 15 }}>
            Don't have an account?
            <Text
              style={{ color: "rgba(0,119,255,0.83)" }}
              onPress={() => alert("Go to SignUp pressedd")}
            >
              SignUp
            </Text>
          </Text>
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Pressable
            // title="Go to Profile"
            onPress={() => navigation.navigate('Profile')}
          >
           <Text style={styles.text}>Go to Profile</Text>
         </Pressable>
        </View>
        
      </View>
      {/* <StatusBar style="auto" /> */}
    </View>
  );
};

export default SignIn;

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
