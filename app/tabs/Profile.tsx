import { ScrollView, StyleSheet, Image } from 'react-native';
import FontAwesome from "@expo/vector-icons/FontAwesome";

import EditScreenInfo from '../../components/EditScreenInfo';
import { Text, View } from '../../components/Themed';
import { formatAMPM } from '../../utils/helpers';
import Divider from '../../components/Divider';
import Colors from '../../constants/Colors';

export default function Profile() {
  
  return (
    <ScrollView>
      <View style={styles.header}>
        <Image source={{uri: 'https://randomuser.me/api/portraits/men/76.jpg'}} style={styles.image} />
        <View style={styles.headerTextContainer}>
          <Text style={styles.name}>Adrian Joseph Albino</Text>
          <Text style={styles.location}>
            <FontAwesome name="map-pin" />
            {' '} Toledo City, Cebu
          </Text>
          <Text style={styles.time}>
            {formatAMPM()} local time
          </Text>
        </View>
      </View>
      <Divider />
      <Text style={styles.sectionLabel}>Profile Summary</Text>
      <Text style={styles.jobTitle}>Experienced Lover Boy</Text>
      <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
      <Divider />
      <Text style={styles.sectionLabel}>Earnings</Text>
      <View style={styles.historySummary}>
        <View>
          <Text style={styles.earningsText}>$50k+</Text>
          <Text>Total Earnings</Text>
        </View>
        <View>
          <Text style={styles.earningsText}>10</Text>
          <Text>Total Jobs</Text>
        </View>
        <View>
          <Text style={styles.earningsText}>2000</Text>
          <Text>Total Hours</Text>
        </View>
      </View>
      <Divider />
      <Text style={styles.sectionLabel}>Work History</Text>
      <Text style={styles.jobsCompleted}>Jobs Completed: 10</Text>
      <View style={styles.job}>
        <Text style={styles.jobTitleHistory}>Need a plumber for an urgent sink fixing</Text>
        <View style={styles.rating}>
            <FontAwesome name="star" color={Colors.dark.background}  />
            <FontAwesome name="star" color={Colors.dark.background} style={styles.star} />
            <FontAwesome name="star" color={Colors.dark.background} style={styles.star} />
            <FontAwesome name="star" color={Colors.dark.background} style={styles.star} />
            <FontAwesome name="star" color={Colors.dark.background} style={styles.star} />
            <Text style={{marginLeft: 5}}>5.00 Aug 26, 2022 - Sep 27, 2023</Text>
        </View>
        <Text style={styles.feedback}>"Adrian was an excellent plumber. Quick to identify the problem and come up with a fix."</Text>
      </View>
      <View style={styles.job}>
        <Text style={styles.jobTitleHistory}>Emergency plumbing repair for a leaky faucet</Text>
        <View style={styles.rating}>
            <FontAwesome name="star" color={Colors.dark.background}  />
            <FontAwesome name="star" color={Colors.dark.background} style={styles.star} />
            <FontAwesome name="star" color={Colors.dark.background} style={styles.star} />
            <FontAwesome name="star" color={Colors.dark.background} style={styles.star} />
            <FontAwesome name="star" color={Colors.dark.background} style={styles.star} />
            <Text style={{marginLeft: 5}}>5.00 Jan 10, 2022 - Jan 12, 2022</Text>
        </View>
        <Text style={styles.feedback}>"Adrian was an excellent plumber. Quick to identify the problem and come up with a fix."</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  description: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  feedback: {
    fontStyle: 'italic',
    marginBottom: 20,
  },
  earningsText: {
    color: Colors.dark.background,
    fontWeight: 'bold',
    fontSize: 20
  },
  header: {
    padding: 20,
    flexDirection: 'row',
  },
  headerTextContainer: {
    paddingLeft: 10,
  },
  historySummary: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 75,
  },
  job: {
    paddingHorizontal: 20,
  },
  jobsCompleted: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '500'
  },
  jobTitle: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontSize: 18,
    fontWeight: '600',
  },
  jobTitleHistory: {
    color: Colors.dark.background,
    fontSize: 18,
  },
  location: {
    marginTop: 10,
  },
  name: {
    color: Colors.dark.background,
    fontSize: 24,
    fontWeight: '700'
  },
  rating: {
    alignItems: 'center',
    paddingVertical: 10,
    flexDirection: 'row'
  },
  time: {
    marginTop: 10,
  },
  sectionLabel: {
    paddingHorizontal: 20,
    paddingTop: 20,
    fontSize: 22,
    fontWeight: '700',
  },
  star: {
    marginLeft: 5,
  },
});
