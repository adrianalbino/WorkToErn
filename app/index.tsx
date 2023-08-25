import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  Pressable,
} from "react-native";
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

import React, { useEffect } from "react";
import { Link, useNavigation } from "expo-router";
import { Formik } from "formik";
import * as Yup from "yup";
import { FontAwesome } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import { width } from "../utils/dimensions";
import useKeyboard from "./hooks/useKeyboard";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Login() {
  async function handleSubmit(values: { email: string; password: string }) {
    try {
      await AsyncStorage.setItem("@isLoggedIn", "true");
      // @ts-ignore
      navigation.navigate("tabs");
    } catch (e) {
      console.log(e);
      // saving error
    }
  }
  const navigation = useNavigation();
  const keyboardOpen = useKeyboard();
  const borderRadius = useSharedValue(0);
  const opacity = useSharedValue(1);

  const config = {
    duration: 1000,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };

  const config2 = {
    duration: 1000,
    easing: Easing.bounce(1000),
  };

  const designStyle = useAnimatedStyle(() => {
    return {
      borderBottomRightRadius: withTiming(borderRadius.value, config),
      opacity: withTiming(opacity.value),
    };
  });

  const loginValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email format")
      .required("Please input your email"),
    password: Yup.string().required("Please input your password"),
  });

  useEffect(() => {
    borderRadius.value = 200;
  }, []);

  useEffect(() => {
    opacity.value = keyboardOpen ? 0 : 1;
  }, [keyboardOpen]);

  useEffect(() => {
    (async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem("@isLoggedIn");
        if (isLoggedIn) {
          // @ts-ignore
          navigation.navigate("tabs");
        }
      } catch (error) {}
    })();
  }, []);

  // const style = useanimate
  return (
    <Formik
      validationSchema={loginValidationSchema}
      onSubmit={handleSubmit}
      initialValues={{ email: "", password: "" }}
    >
      {({ handleSubmit, values, handleChange, errors }) => (
        <View style={styles.container}>
          <Animated.View style={[styles.topDesign, designStyle]} />
          <Text style={styles.logIn}>Log in</Text>
          <View style={styles.inputContainer}>
            <FontAwesome
              name="envelope"
              color={Colors.dark.background}
              size={18}
            />
            <TextInput
              onChangeText={handleChange("email")}
              style={styles.input}
              keyboardType="email-address"
              placeholder="Email"
              value={values.email}
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" color={Colors.dark.background} size={18} />
            <TextInput
              onChangeText={handleChange("password")}
              style={styles.input}
              placeholder="Password"
              value={values.password}
              secureTextEntry
            />
          </View>
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleSubmit()}
          >
            <Text style={{ color: "white" }}>Log in with your email</Text>
          </TouchableOpacity>
          <Text style={styles.loginWith}>Or you can log in with</Text>
          <View style={styles.socialRow}>
            <Pressable
              onPress={() =>
                navigation.navigate("modal", {
                  description: "Sign in with facebook",
                })
              }
              style={styles.facebook}
            >
              <FontAwesome name="facebook-official" color="white" size={22} />
              <Text style={styles.socialLabel}>Facebook</Text>
            </Pressable>
            <Pressable
              onPress={() =>
                navigation.navigate("modal", {
                  description: "Sign in with google",
                })
              }
              style={styles.google}
            >
              <FontAwesome
                name="google-plus-official"
                color="white"
                size={22}
              />
              <Text style={styles.socialLabel}>Google</Text>
            </Pressable>
          </View>
          {!keyboardOpen && (
            <View style={styles.goRegister}>
              <Link href="/register">
                <Text style={{ color: Colors.dark.background }}>
                  New user? Create account
                </Text>
              </Link>
            </View>
          )}
        </View>
      )}
    </Formik>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingHorizontal: 20,
  },
  errorText: {
    color: "red",
    width: "100%",
    marginLeft: 20,
  },
  facebook: {
    backgroundColor: Colors.dark.background,
    width: "45%",
    flexDirection: "row",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  goRegister: {
    position: "absolute",
    bottom: 40,
    borderWidth: 2,
    borderColor: Colors.dark.background,
    paddingHorizontal: 60,
    height: 50,
    justifyContent: "center",
    borderRadius: 20,
  },
  google: {
    backgroundColor: "#BD382F",
    width: "45%",
    flexDirection: "row",
    height: 40,
    marginLeft: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  socialRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  socialLabel: {
    color: "white",
    marginLeft: 20,
  },
  input: {
    marginLeft: 20,
  },
  inputContainer: {
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginVertical: 10,
    height: 50,
  },
  logIn: {
    color: Colors.dark.background,
    width: "100%",
    marginLeft: 20,
    marginBottom: 20,
    fontSize: 22,
    fontWeight: "600",
  },
  loginButton: {
    backgroundColor: Colors.dark.background,
    paddingHorizontal: 80,
    paddingVertical: 15,
    borderRadius: 40,
    marginVertical: 20,
  },
  loginWith: {
    width: "100%",
    color: Colors.dark.background,
    fontWeight: "600",
    marginLeft: 20,
  },
  topDesign: {
    position: "absolute",
    top: 0,
    backgroundColor: Colors.dark.background,
    height: 200,
    width,
  },
});
