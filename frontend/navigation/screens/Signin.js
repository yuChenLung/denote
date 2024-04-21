import { useContext, useState } from "react";
import React, { useRef, useEffect } from "react";
import { TextInput, Text, View, Animated } from "react-native";
import Button from "./Button.js";
import styles from "../../styles.js";
import { Pressable } from "react-native";
import { initializeApp } from "firebase/app";
import apiKeys from "../../config/apiKeys";
const firebaseConfig = apiKeys.firebaseConfig;
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../AuthProvider.js";
import { getStorage } from "firebase/storage";

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function Signin({ setShowSignup }) {
  const { user, setUser } = useContext(AuthContext);
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
  });
  const signUp = async () => {
    if (value.email === "" || value.password === "") {
      setValue({
        ...value,
        error: "Email and password are mandatory.",
      });
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      // const accessToken = userCredential.user.accessToken;
      // console.log(value.email)
      // setUser({email: value.email, token: accessToken});
      // navigation.navigate('Sign In');
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  };

  const FadeInView = (props) => {
    const fadeAnim = useRef(new Animated.Value(0)).current; // Initial value for opacity: 0

    useEffect(() => {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    }, [fadeAnim]);

    return (
      <Animated.View // Special animatable View
        style={{
          ...props.style,
          opacity: fadeAnim, // Bind opacity to animated value
        }}
      >
        {props.children}
      </Animated.View>
    );
  };

  return (
    <View>
      <View style={styles.container}>
        {!!value.error && (
          <View>
            <Text style={styles.invalidText}>
              {"Email or password is not correct"}
            </Text>
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={value.email}
          onChangeText={(text) => setValue({ ...value, email: text })}
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={value.password}
          onChangeText={(text) => setValue({ ...value, password: text })}
          secureTextEntry={true}
        />
        <Pressable style={styles.signinButton} onPress={signUp}>
          <Text style={styles.signinButtonText}>{"Log In"}</Text>
        </Pressable>
        <Pressable style={styles.container} onPress={() => setShowSignup(true)}>
          <Text style={styles.createAccountText}>Create an Account</Text>
        </Pressable>
      </View>
    </View>
  );
}
