import { StyleSheet, TouchableOpacity, TextInput, Pressable } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { View, Text } from '../components/Themed';
import React from 'react'
import { width } from '../utils/dimensions';
import Colors from '../constants/Colors';

type Props = {
  mode: 'for-you' | 'recent',
  setMode: (arg: 'for-you' | 'recent') => void;
  searchKey: string;
  setSearchKey: (arg: string) => void;
}

export default function HomeJobsHeader({mode, setMode, searchKey, setSearchKey}: Props) {
  return (
    <>
        <Text style={styles.header}>Jobs</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.iconContainer}>
            <FontAwesome color="gray" name="star" size={18} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput value={searchKey} onChangeText={t => setSearchKey(t)} placeholder="Search for job" style={styles.search} />
            <View style={styles.searchIconContainer}>
              <FontAwesome color="white" name="search" size={18} style={styles.searchIcon} />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.modeContainer}>
          <Pressable
            style={{padding: 20}}
            onPress={() => setMode('for-you')} >
            <Text 
              style={[styles.modeTitle, { color: mode === 'for-you' ? Colors.dark.background : 'black', fontWeight: mode === 'for-you' ? '700' : '300'}]}>
                Best Matches
            </Text>
          </Pressable>
          <Pressable
            style={{padding: 20}}
            onPress={() => setMode('recent')} >
            <Text 
              style={[styles.modeTitle, { color: mode === 'recent' ? Colors.dark.background : 'black', fontWeight: mode === 'recent' ? '700' : '300'}]}>
                Most Recent
            </Text>
          </Pressable>
        </View>
        <View style={styles.divider} />
        <Text style={styles.modeLabel}>{mode === 'for-you' ? 'Browse jobs that best fit your profile and expertise. Jobs listed here are ordered by most relevant.' : 'Brose the most recent jobs posted by differnt clients. Jobs posted here are ordered by time posted'} </Text>
    </>
  )
}

const styles = StyleSheet.create({
  divider: {
    width,
    height: 0.5,
    backgroundColor: 'darkgray'
  },
  header: {
    width: '100%',
    fontSize: 32,
    marginTop: 20,
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: Colors.dark.background,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    borderRadius: 50,
  },
  search: {
    borderWidth: 1,
    borderColor: 'gray',
    marginLeft: 10,
    paddingLeft: 20,
    borderRadius: 10,
    flex: 1,
    height: 40,
  },
  searchIconContainer: {
    backgroundColor: Colors.dark.background,
    position: 'absolute',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    right: 0,
    width: 50,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  modeContainer: {
    flexDirection: 'row',
  },
  modeLabel: {
    padding: 20,
  },
  modeTitle: {
    fontSize: 16,
    paddingLeft: 20,
  },
  searchIcon: {
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
 
  divider: {
    width,
    height: 0.5,
    backgroundColor: 'darkgray'
  },
},
})