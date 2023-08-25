import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
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

export default function Register() {
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
      borderBottomLeftRadius: withTiming(borderRadius.value, config),
      opacity: withTiming(opacity.value),
    };
  });

  function handleSubmit(values: { email: string; password: string }) {
    console.log('hello?');
    // @ts-ignore
    navigation.navigate("index");
  }

  const registerValidationSchema = Yup.object().shape({
    fullName: Yup.string().required("Please input your full name"),
    email: Yup.string()
      .email("Please enter a valid email format")
      .required("Please input your email"),
    password: Yup.string().required("Please input your password").min(8),
    confirmPassword: Yup.string()
      .required("Please input your password again")
      .test("passwords-match", "Passwords must match", function (value) {
        return this.parent.password === value;
      }),
  });

  useEffect(() => {
    borderRadius.value = 200;
  }, []);

  useEffect(() => {
    opacity.value = keyboardOpen ? 0 : 1;
  }, [keyboardOpen]);

  // const style = useanimate
  return (
    <Formik
      validationSchema={registerValidationSchema}
      onSubmit={handleSubmit}
      initialValues={{
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }}
    >
      {({ handleSubmit, values, handleChange, errors }) => (
        <View style={styles.container}>
          <Animated.View style={[styles.topDesign, designStyle]} />
          <Text style={styles.logIn}>Create account</Text>
          <View style={styles.inputContainer}>
            <FontAwesome name="user" color={Colors.dark.background} size={18} />
            <TextInput
              onChangeText={handleChange("fullName")}
              style={styles.input}
              placeholder="Full name"
              value={values.fullName}
            />
          </View>
          {errors.fullName && (
            <Text style={styles.errorText}>{errors.fullName}</Text>
          )}
          <View style={styles.inputContainer}>
            <FontAwesome
              name="envelope"
              color={Colors.dark.background}
              size={18}
            />
            <TextInput
              keyboardType="email-address"
              onChangeText={handleChange("email")}
              style={styles.input}
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
          <View style={styles.inputContainer}>
            <FontAwesome name="lock" color={Colors.dark.background} size={18} />
            <TextInput
              onChangeText={handleChange("confirmPassword")}
              style={styles.input}
              placeholder="Confirm Password"
              value={values.confirmPassword}
              secureTextEntry
            />
          </View>
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => handleSubmit()}
          >
            <Text style={{ color: "white" }}>Register</Text>
          </TouchableOpacity>
          {!keyboardOpen && (
            <View style={styles.goRegister}>
              <Link href="/">
                <Text style={{ color: Colors.dark.background }}>
                  Already have an account? Log in
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
    marginTop: 30,
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
    height: 150,
    width,
  },
});
