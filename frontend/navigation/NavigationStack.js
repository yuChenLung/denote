import React, { useContext, useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeStack from "./HomeStack";
import AuthStack from "./AuthStack";
import { AuthContext } from "./AuthProvider";
import { ActivityIndicator } from "react-native";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/database";

export default function NavigationStack() {
  const { user, setUser, requests, setRequests } = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [loading, setLoading] = useState(true);

  //handle user state changes
  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(function (newUser) {
      const ref = firebase.database().ref("requests");
      if (user) ref.child(user.uid).off("child_added");

      console.log("user: ", newUser);
      setUser(newUser);
      if (!newUser) {
        setLoading(false);
        return;
      }
      // ref.child(user.uid).push({what: "what"});
      ref.child(newUser.uid).on("value", (snapshot) => {
        console.log(snapshot.val());
        ref
          .child(newUser.uid)
          .get()
          .then((snapshot) => {
            if (snapshot.exists()) {
              const newRequests = Object.values(snapshot.val());
              setRequests(newRequests);
            } else {
              console.log("No data available");
              setRequests({});
            }
          })
          .catch((error) => {
            console.error(error);
          });
      });
      if (initializing) setInitializing(false);
      setLoading(false);
    });
    return subscriber; // unsubscribe on unmount
  }, []);

  if (loading) {
    return <ActivityIndicator />;
  }

  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      {user ? <HomeStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
