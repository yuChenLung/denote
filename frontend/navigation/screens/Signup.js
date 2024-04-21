import { useEffect, useState, useRef } from "react";
import {
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Animated,
} from "react-native";

import Button from "./Button.js";
import styles from "../../styles.js";
import { Pressable } from "react-native";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set } from "firebase/database";
import apiKeys from "../../config/apiKeys";
const firebaseConfig = apiKeys.firebaseConfig;
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase();
import firebase from "firebase/compat/app";

export default function Signup({ setShowSignup }) {
  const [value, setValue] = useState({
    email: "",
    password: "",
    error: "",
    name: "",
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
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      console.log(userCredential);
      await updateProfile(userCredential.user, {
        displayName: value.name,
        photoURL:
          "https://www.verywellhealth.com/thmb/wQ3EjJ-Qq4GHggSvveQL0eNLnhw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-1293478400-948e20ad838a4d70a03aca2a969c0552.jpg",
      })
        .then(() => {
          // Profile updated!
          // ...
          console.log("Profile updated");
        })
        .catch((error) => {
          // An error occurred
          // ...
          console.log("Profile update error");
        });

      console.log("__");
    } catch (error) {
      console.log(error);
      setValue({
        ...value,
        error: error.message,
      });
    }
  };

  const updateDB = async () => {
    set(ref(db, `users/${value.email}`), {
      email: value.email,
      password: value.password,
    });
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
          <View style={styles.invalidVlie}>
            <Text style={styles.invalidText}>
              {"Invalid email or password"}
            </Text>
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={value.name}
          onChangeText={(text) => setValue({ ...value, name: text })}
        />
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
          <Text style={styles.signinButtonText}>{"Create Account"}</Text>
        </Pressable>
        <Pressable
          style={styles.container}
          onPress={() => setShowSignup(false)}
        >
          <Text style={styles.createAccountText}>Return to Sign In</Text>
        </Pressable>
      </View>
    </View>
  );
}
