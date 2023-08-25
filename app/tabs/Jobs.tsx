import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { View, Text } from "../../components/Themed";
import Colors from "../../constants/Colors";
import { width } from "../../utils/dimensions";
import { useEffect, useRef, useState } from "react";
import HomeJobsHeader from "../../components/HomeJobsHeader";
import { JOB_LIST } from "../../utils/starterData";
import {
  daysAgo,
  filterByTitleOrDescription,
  sortByDateDescending,
} from "../../utils/helpers";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { sortPseudoMatch } from "../../utils/helpers";
import { JobPosting } from "../../utils/types";
import Divider from "../../components/Divider";

export default function Jobs({}) {
  const [mode, setMode] = useState<"for-you" | "recent">("for-you");
  const [jobList, setJobList] = useState([...JOB_LIST]);
  const [searchKey, setSearchKey] = useState("");
  const navigation = useNavigation();
  const titleRef = useRef<any>(null);

  function handleScroll(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const yPos = event.nativeEvent.contentOffset.y;

    navigation.setOptions({
      title: "Jobs",
      headerTitleStyle: {
        opacity: 0 + yPos / 60,
      },
    });
    titleRef.current?.setNativeProps({ style: { opacity: 1 - yPos / 80 } });
  }

  function handleSetMode(mode: string) {
    if (mode === "for-you") {
      setMode("for-you");
      setJobList([...jobList.sort((a, b) => sortPseudoMatch(a, b))]);
    } else {
      setMode("recent");
      setJobList([...jobList.sort((a, b) => sortByDateDescending(a, b))]);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title: "Jobs",
      headerTitleStyle: {
        opacity: 0,
      },
    });
  }, []);

  useEffect(() => {
    if (searchKey.length > 0) {
      let searchArr: JobPosting[] = [];
      if (mode === "for-you") {
        searchArr = [...JOB_LIST.sort((a, b) => sortPseudoMatch(a, b))];
      } else {
        searchArr = [...JOB_LIST.sort((a, b) => sortByDateDescending(a, b))];
      }
      setJobList([
        ...searchArr.filter((item) =>
          filterByTitleOrDescription(searchKey, item)
        ),
      ]);
    } else {
      if (mode === "for-you") {
        setMode("for-you");
        setJobList([...JOB_LIST.sort((a, b) => sortPseudoMatch(a, b))]);
      } else {
        setMode("recent");
        setJobList([...JOB_LIST.sort((a, b) => sortByDateDescending(a, b))]);
      }
    }
  }, [searchKey]);

  return (
    <FlatList
      ListHeaderComponent={
        <HomeJobsHeader
          mode={mode}
          setMode={handleSetMode}
          searchKey={searchKey}
          setSearchKey={setSearchKey}
        />
      }
      contentContainerStyle={styles.container}
      keyExtractor={(_, index) => index.toString()}
      onScroll={handleScroll}
      data={jobList}
      renderItem={({ item, index }) => (
        <View style={styles.mainContent}>
          <View style={styles.listing}>
            <View style={styles.listingTop}>
              <Text style={styles.listingTitle}>{item.title}</Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "modal" as never,
                    { description: "Remove job listing" } as never
                  )
                }
                style={styles.iconContainer}
              >
                <FontAwesome
                  color={Colors.dark.background}
                  name="close"
                  size={18}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    "modal" as never,
                    { description: "Add job listing to favorites" } as never
                  )
                }
                style={[styles.iconContainer, { marginLeft: 10 }]}
              >
                <FontAwesome
                  color={Colors.dark.background}
                  name="star"
                  size={18}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.listingLabel}>
              {item.jobType} - Posted {daysAgo(item.dateCreated)}d ago
            </Text>
            <View style={styles.listingMiddle}>
              <View style={styles.budgetContainer}>
                <Text style={{ fontWeight: "bold" }}>{item.budget}</Text>
                <Text>Budget</Text>
              </View>
              <View style={styles.levelContainer}>
                <Text style={{ fontWeight: "bold" }}>
                  {item.experienceLevel}
                </Text>
                <Text>Experience Level</Text>
              </View>
            </View>
            <Text style={{ paddingVertical: 20 }}>{item.description}</Text>
            <Text style={{ marginTop: 20 }}>Posted by: {item.postedBy}</Text>
          </View>
          <Divider />
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  budgetContainer: {
    flex: 1,
  },
  levelContainer: {
    flex: 1,
  },
  container: {},
  divider: {
    width,
    height: 0.5,
    backgroundColor: "darkgray",
  },
  listing: {
    padding: 20,
  },
  listingLabel: {
    marginTop: 10,
  },
  listingMiddle: {
    marginTop: 20,
    flexDirection: "row",
  },
  listingTitle: {
    fontWeight: "700",
    color: Colors.dark.background,
    fontSize: 18,
    flex: 1,
  },
  listingTop: {
    flexDirection: "row",
  },
  mainContent: {},
  modeContainer: {
    flexDirection: "row",
    marginVertical: 20,
  },
  modeLabel: {
    padding: 20,
  },
  modeTitle: {
    fontSize: 16,
    paddingLeft: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  iconContainer: {
    borderWidth: 1,
    borderColor: Colors.dark.background,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    borderRadius: 50,
  },
  search: {
    borderWidth: 1,
    borderColor: "gray",
    marginLeft: 10,
    paddingLeft: 20,
    borderRadius: 10,
    flex: 1,
    height: 40,
  },
  searchIconContainer: {
    backgroundColor: Colors.dark.background,
    position: "absolute",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    right: 0,
    width: 50,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchIcon: {},
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
