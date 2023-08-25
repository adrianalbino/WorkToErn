import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Image } from 'react-native';


import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { useNavigation } from 'expo-router';
import { useRoute } from '@react-navigation/native';
import Colors from '../constants/Colors';

export default function ModalScreen() {
  const route = useRoute<any>();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{route?.params?.description} still in progress!</Text>
      <Image source={require('../assets/images/under_construction.png')} style={styles.image} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.background
  },
  image: {
    width: 200,
    height: 200,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
