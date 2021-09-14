import React from "react";
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Colors } from "../themes/colors";

const defautProps = {
  main: false,
};

class Navbar extends React.PureComponent {
  render() {
    const { navigation, main } = this.props;
    return (
      <SafeAreaView>
        {main ? (
          <View style={styles.mainNav}>
            <Image source={require("../assets/pp.jpg")} style={styles.mypic} />
            <Image
              source={require("../assets/pwlogo.png")}
              style={styles.logo}
            />
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Search');
              }}
            >
              <Icon
                name={"search-outline"}
                size={40}
                color={"gold"}
                style={styles.search}
              />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.mainNav2}>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Icon name={"chevron-back"} size={45} color={"black"} />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    );
  }
}

Navbar.defautProps = defautProps;

export default Navbar;

const styles = StyleSheet.create({
  logo: {
    width: 55,
    height: 55,
    marginTop: 20,
    borderRadius: 50,
    marginLeft: 30,
  },

  mainNav: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 50,
    alignItems: "center",
  },
  search: {
    marginLeft: 100,
    marginTop: 20,
  },

  mypic: {
    width: 55,
    height: 55,
    marginTop: 20,
    borderRadius: 50,
  },
  mainNav2: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 40,
    alignItems: "center",
    left: -30,
    marginTop: 20,
  },
});
