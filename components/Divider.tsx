import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { width } from '../utils/dimensions'

export default function Divider() {
  return (
          <View style={styles.divider} />
  )
}

const styles = StyleSheet.create({
  divider: {
    width,
    height: 0.5,
    backgroundColor: "darkgray",
  },
})