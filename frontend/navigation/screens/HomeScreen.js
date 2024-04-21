import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../AuthProvider";
import styles from "../../styles.js";
import { FontAwesome6 } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import Loader from "react-native-three-dots-loader";
import LoadingDots from "react-native-loading-dots";
import { storage } from "../../firebase/firebaseFunctions";
import "react-native-get-random-values";
import { v4 as uuid } from "uuid";

import {
  ref as refFireBase,
  uploadBytes,
  listAll,
  getDownloadURL,
} from "firebase/storage";
import {
  Text,
  View,
  Image,
  FlatList,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import Lock from "./Lock";
const spiralImageListRef = refFireBase(storage, "spiralImages/");

const styles2 = StyleSheet.create({
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    marginTop: 10,
    borderRadius: 5,
    borderColor: "gray",
    borderWidth: 1,
    // color: "white",
  },
  list: {
    width: 300,
    // backgroundColor: "#131C47",
  },
});

const BACKEND_URL =
  "http://ec2-54-177-39-50.us-west-1.compute.amazonaws.com:3000/";
export default function HomeScreen() {
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [modal, setModal] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [currentType, setCurrentType] = useState("");
  const [image, setImage] = useState(null);
  const data = [
    { key: "Journaling" },
    { key: "Base Writing Assessment" },
    { key: "Parkinson's Spiral Assessment" },
    { key: "Semantic Analysis" },
  ];

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [press, setPress] = useState(false);

  useEffect(() => {
    user.getIdToken().then(async (token) => {
      console.log(token);
    });
    setUserName(user.displayName);
    setProfilePic(user.photoURL);
  }, []); //ComponentDidMountS

  useEffect(() => {
    async function store() {
      console.log("__");
      console.log("image name:" + image);
      const id = uuid();
      const imageName = user.displayName + "-" + id;
      const imageRef = refFireBase(storage, `spiralImages/${imageName}`);
      const imageBlob = await getBlobFroUri(image);

      await uploadBytes(imageRef, imageBlob);
      var firebaseURI = "";
      await listAll(spiralImageListRef).then((response) =>
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            if (url.includes(encodeURIComponent(imageName))) {
              firebaseURI = url;
              console.log("found matching url");
              console.log(firebaseURI);
            }
          });
        })
      );
    }
    if (image != null) {
      store();
    }
  }, [image]); //ComponentDidMount

  const uploadImage = async (uri, name, firebasePath) => {
    const imageRef = storage().ref(`${firebasePath}/${name}`);
    await imageRef.putFile(uri, { contentType: "image/png" }).catch((error) => {
      throw error;
    });
    const url = await imageRef.getDownloadURL().catch((error) => {
      throw error;
    });
    return url;
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const getBlobFroUri = async (uri) => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function (e) {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
    });

    return blob;
  };

  const openModal = async () => {
    await scanForDevices();
    setIsModalVisible(true);
  };

  const logout_exit = () => {
    disconnectFromDevice();
    logout();
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const listItem = (item) => (
    <View style={styles.hcontainer}>
      <View style={styles.h2container}>
        <Text style={styles.galleryText}>{item.key}</Text>
        {item.key == "Journaling" ? (
          <Image
            style={styles.galleryImgMain}
            source={{
              uri: "https://studio5.ksl.com/wp-content/uploads/2023/07/Journal-2-740x489.jpg",
            }}
          ></Image>
        ) : item.key == "Base Writing Assessment" ? (
          <Image
            style={styles.galleryImg}
            source={{
              uri: "https://www.yourvamentor.com/blog/wp-content/uploads/2014/12/draw-the-line.jpg",
            }}
          ></Image>
        ) : item.key == "Parkinson's Spiral Assessment" ? (
          <Image
            style={styles.galleryImg}
            source={{
              uri: "https://news.northeastern.edu/wp-content/uploads/2016/10/writing_1400.jpg",
            }}
          ></Image>
        ) : (
          <Image
            style={styles.galleryImg}
            source={{
              uri: "https://1000awesomethings.com/wp-content/uploads/2011/01/highlight.jpg",
            }}
          ></Image>
        )}
        <Pressable
          onPress={() => {
            setCurrentType(item.key);
            setModal(true);
            console.log("pressed");
          }}
          style={styles.buttonQuill}
        >
          <FontAwesome6 name="feather-pointed" size={30} color="black" />
        </Pressable>
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
    </View>
  );
  return (
    <View style={styles.mainContainer}>
      {modal ? (
        <View
          style={{
            position: "absolute",
            backgroundColor: "black",
            opacity: 0.8,
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height,
            zIndex: 2,
          }}
        ></View>
      ) : null}
      {modal ? (
        <View
          style={{
            position: "absolute",
            width: 300,
            height: 300,
            borderColor: "#1c2161",
            borderWidth: 3,
            backgroundColor: "white",
            zIndex: 3,
            borderRadius: 25,
          }}
        >
          <TouchableOpacity
            style={{
              width: 24,
              height: 24,
              justifyContent: "center",
              alignItems: "center",
              zIndex: 4,
              position: "absolute",
              top: 8,
              right: 8,
            }}
            onPress={() => {
              setModal(false);
              setImageUploaded(false);
            }}
          >
            <Ionicons
              name="close-circle"
              size={24}
              color="#151C47"
              style={{}}
            />
          </TouchableOpacity>
          <View style={{ marginTop: 10 }}>
            <View
              style={{
                padding: 20,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {currentType == "Journaling" ? (
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Add to your Journal
                </Text>
              ) : currentType == "Base Writing Assessment" ? (
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Generate an Assessment
                </Text>
              ) : currentType == "Parkinson's Spiral Assessment" ? (
                <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  Generate an Assessment
                </Text>
              ) : (
                <Text style={{ fontSize: 20, fontWeight: "bold" }}></Text>
              )}
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: 5,
                  marginTop: 25,
                }}
              >
                <FontAwesome6
                  name="feather-pointed"
                  size={60}
                  color="black"
                  style={{ marginLeft: 30 }}
                />
                <View style={styles.loadingScreen}>
                  <View style={styles.dotsWrapper}>
                    <LoadingDots size={8} />
                  </View>
                </View>
                <MaterialIcons
                  name="photo-library"
                  size={80}
                  color="#151C47"
                  style={{ margin: 20 }}
                />
              </View>

              <TouchableOpacity
                style={{
                  borderRadius: 20,
                  borderWidth: 2,
                  backgroundColor: "#1c2161",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 10,
                  width: 220,
                  marginTop: 25,
                }}
                onPress={() => {
                  if (!imageUploaded) {
                    pickImage();
                    setImageUploaded(true);
                  }
                }}
              >
                <Text
                  style={{
                    color: "white",
                  }}
                >
                  {imageUploaded ? "Image Uploaded!" : "Upload an image"}
                </Text>
              </TouchableOpacity>
              {image && <Image source={{ uri: image }} style={styles.image} />}
            </View>
          </View>
        </View>
      ) : null}
      <View style={{}}>
        <Text style={styles.homeTitleText}>Welcome, {user.displayName}</Text>
        <FlatList
          style={styles.list}
          data={data}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => listItem(item)}
          directionalLockEnabled={true}
        />
      </View>

      {/* <Image style={styles.profileImage} source={{ uri: profilePic }} /> */}
    </View>
  );
}
