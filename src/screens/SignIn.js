import React, { useState, useEffect, useContext } from 'react';
import { UserData, ToastData } from '../context/globalContext';
import { StyleSheet, Text, View, ImageBackground, SafeAreaView, TextInput, Pressable, ActivityIndicator } from 'react-native';
import Toast, { BaseToast, ErrorToast } from 'react-native-toast-message';
import image from '../../assets/istockphoto.jpg';
import { db } from '../services/firebase';
import { collection, getDocs } from 'firebase/firestore';

const SignIn = ({ navigation }) => {
  let { setUserAuth } = useContext(UserData);
  let { setToastConfig } = useContext(ToastData);
  const [isLoading, setIsLoading] = useState(false);
  const [email, onChangeText] = useState('');
  const [password, onChangePassword] = useState('');
  const [users, setUsers] = useState([]);
  
  const productCollectionRef = collection(db, 'users');

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(productCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  const toastConfig = {
    success: (props) => (
      <BaseToast {...props} style={{ borderLeftColor: 'green' }} contentContainerStyle={{ paddingHorizontal: 15 }} text1Style={{ fontSize: 15, color: 'green' }} />
    ),
    error: (props) => (
      <ErrorToast {...props} text1Style={{ fontSize: 17, color: '#ff6600' }} text2Style={{ fontSize: 15 }} />
    ),
  };

  const CheckUser = () => {
    const user = users.find((user) => user.email === email && user.password === password);
  
    if (user) {
      setToastConfig(Toast.show({
        type: 'success',
        text1: `${email} is logged in successfully!`,
      }));
      setIsLoading(true);
      setTimeout(() => {
        setUserAuth(true);
        navigation.navigate('MainTabNavigation'); // Redirect to Main Tab Navigation
      }, 2000);
    } else {
      setToastConfig(Toast.show({
        type: 'error',
        text1: 'Authentication incorrect',
      }));
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" width="100%" style={styles.image}></ImageBackground>

      <View style={styles.sub_container}>
        <View style={styles.welcome_title}>
          <Text style={styles.welcome_text}>Welcome!</Text>
          <Text style={styles.title_text}>Sign In</Text>
        </View>
        <SafeAreaView>
          <TextInput style={styles.input} onChangeText={onChangeText} placeholder="Email" value={email} />
          <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
            secureTextEntry={true}
          />
        </SafeAreaView>
        <Pressable style={styles.button} onPress={CheckUser}>
          {isLoading ? <ActivityIndicator /> : <Text style={styles.text}>SignIn</Text>}
        </Pressable>
        <View style={styles.forgotPsw_view}>
          <Text style={styles.forgotPsw}>Forgot password?</Text>
        </View>
        <View>
          <Text style={{ textAlign: 'center', marginTop: 15 }}>
            Don't have an account?
            <Text style={{ color: 'rgba(0,119,255,0.83)' }} onPress={() => navigation.navigate('SignUpScreen')}>
              SignUp
            </Text>
          </Text>
        </View>
      </View>
      <Toast config={toastConfig} />
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
  },
  sub_container: {
    flex: 1,
    position: 'relative',
    bottom: 0,
    backgroundColor: '#F1F1F1',
    width: '100%',
    marginTop: '45%',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    padding: '5%',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    position: 'absolute',
    top: 0,
    left: 0,
    height: '70%',
  },
  welcome_title: {
    paddingHorizontal: '4%',
  },
  welcome_text: {
    fontSize: 16,
    color: 'rgba(45,45,45,0.75)',
  },
  title_text: {
    fontSize: 24,
    color: '#2d2d2d',
    fontWeight: 'bold',
  },
  text: {
    color: 'blue',
  },
  button: {
    marginTop: 20,
    marginHorizontal: '4%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: '#0077FF',
  },
  input: {
    height: 40,
    margin: 12,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  forgotPsw_view: {
    marginTop: 25,
  },
  forgotPsw: {
    color: 'rgba(0,119,255,0.83)',
    textAlign: 'center',
  },
});