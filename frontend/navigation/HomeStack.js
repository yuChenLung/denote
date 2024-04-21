import React, { useEffect, useContext } from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./screens/HomeScreen";
import ExtraScreen from "./screens/ExtraScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { View } from "react-native";
import styles from "../styles";

export default function HomeStack() {
  const Tab = createMaterialBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="white"
      inactiveColor="#777aa0"
      style={styles.tabNavigator}
      screenOptions={{
        tabBarInactiveTintColor: "green",
        tabBarActiveTintColor: "red",
        tabBarStyle: {
          position: "absolute",
          borderTopColor: "#fff",
        },
      }}
    >
      <Tab.Screen
        name="Requests"
        component={ExtraScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="file-question"
              color={color}
              size={26}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={UserProfileScreen}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="person" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
