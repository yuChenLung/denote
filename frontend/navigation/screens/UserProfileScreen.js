import React, { useContext, useState } from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { Text, View, Image, Pressable, FlatList } from "react-native";
import Button from "./Button.js";
import { Dimensions } from "react-native";
import SideSwipe from "react-native-sideswipe";

export default function UserProfileScreen() {
  const { user, logout } = useContext(AuthContext);
  const [index, setIndex] = useState(0);
  const itemWidth = 50;
  console.log(user);
  const data = [
    { key: "Journaling" },
    { key: "Base Writing Assessment" },
    { key: "Parkinson's Spiral Assessment" },
    { key: "Semantic Analysis" },
  ];
  const images = [{ key: "test" }, { key: "test2" }, { key: "test3" }];
  const contentOffset = 0; //(Dimensions.get("window").width - itemWidth) / 2;
  const listItem2 = (item) => (
    <View>
      <Image
        style={styles.galleryImg}
        source={{
          uri: "https://studio5.ksl.com/wp-content/uploads/2023/07/Journal-2-740x489.jpg",
        }}
      ></Image>
      <Text style={{ color: "black" }}>{item.key}</Text>
    </View>
  );
  const listItem = (item) => (
    <View style={styles.h3container}>
      <Text style={styles.profileSwitchTitle}>{item.key}</Text>
      <View
        style={{
          height: 300,
          backgroundColor: "white",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <FlatList
          style={styles.list}
          data={images}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => listItem2(item)}
          directionalLockEnabled={true}
        ></FlatList>
      </View>
      <View
        style={{
          borderBottomColor: "grey",
          borderBottomWidth: 1,
          marginLeft: 5,
          marginRight: 5,
          marginTop: 10,
          width: 343,
        }}
      />
    </View>
  );
  return (
    <View style={styles.profileContainer}>
      <View
        style={{
          width: 430,
          height: 200,
          backgroundColor: "#1c2161",
          position: "absolute",
          top: 0,
        }}
      ></View>

      <Image
        source={{ uri: user.photoURL }}
        style={{
          height: 200,
          width: 200,
          borderRadius: 200,
          marginTop: -300,
          borderColor: "white",
          borderWidth: 7,
        }}
      ></Image>
      <Text style={styles.profileTitleText}>{user.displayName}'s Space</Text>

      <Text style={{ marginTop: -20, marginBottom: 10 }}>
        User Email: {user && user.email}
      </Text>
      <Pressable
        style={{
          position: "absolute",
          top: 50,
          right: 10,
          backgroundColor: "#fdef4c",
          padding: 10,
          paddingHorizontal: 20,
          margin: 10,
          borderRadius: 100,
        }}
        onPress={logout}
        title="Log Out"
      >
        <Text style={{ fontWeight: "600", color: "#151C47" }}>Log Out</Text>
      </Pressable>
      <View style={{ marginBottom: -350, marginTop: 20 }}>
        <SideSwipe
          index={index}
          itemWidth={340}
          style={{ width: 340, height: "auto" }}
          data={data}
          contentOffset={contentOffset}
          onIndexChange={(index) => setIndex(index)}
          renderItem={({ item }) => listItem(item)}
        />
      </View>
    </View>
  );
}
