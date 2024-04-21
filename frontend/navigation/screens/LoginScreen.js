import React, { useContext, useState } from "react";
import { Platform } from "react-native";
import styles from "../../styles.js";
import {
  Text,
  View,
  KeyboardAvoidingView,
  Image,
  Pressable,
} from "react-native";
import { AuthContext } from "../AuthProvider.js";
import Signup from "./Signup.js";
import Signin from "./Signin.js";
import { useHeaderHeight } from "@react-navigation/elements";

export default function LoginScreen() {
  const [showSignup, setShowSignup] = useState(false);
  const height = useHeaderHeight();
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : ""}
      enabled
      style={styles.invertContainer}
    >
      <View style={styles.login}>
        <View style={styles.tinyLogoContainer}>
          <Image
            style={styles.tinyLogo}
            source={require("../../assets/logo2.png")}
          />
        </View>
      </View>
      {/* <View style={styles.login2}><Text style={styles.login3}>Scan your Credit Card to Sign In!</Text></View>
      <View style={styles.qrcodebottom}></View>
      <View style={styles.qrcodebottom2}></View> */}

      <View style={styles.container}>
        {showSignup ? (
          <Signup setShowSignup={setShowSignup} />
        ) : (
          <View>
            <Signin setShowSignup={setShowSignup} />
          </View>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}
