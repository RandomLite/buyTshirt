import React from "react";
import { StyleSheet, View } from "react-native";
// import { Feather } from '@expo/vector-icons';
import { SearchBar } from "react-native-elements";
import { Platform } from 'react-native';
const SearchBarArea = (props) => {
  // const [text, onChangeText] = React.useState("");
  
  return (
    <View style={{ position: "relative" }}>
      {/* <Feather name="search" size={24} color="black"  style={{position:"absolute"}}/>
            <TextInput
              style={styles.input}
              onChangeText={onChangeText}
              placeholder="Search T-shirt"
              value={text}
            /> */}

      <SearchBar
        containerStyle={{
          height: 50,
          backgroundColor: "#fff",
          borderRadius: 25,
          elevation: 3,
          alignItems: "center",
        }}
        inputStyle={{ backgroundColor: "#fff", height: 40, color: "#2d2d2d"}}
        inputContainerStyle={{ backgroundColor: "#fff", height: 40, borderRadius:25}}
        showLoading={false}
        platform={Platform.OS}
        clearIcon={true}
        placeholder="Search T-shirt"
        onChangeText={props.searchFilterFunction}
        onClear={props.searchFilterFunction===""}
        value={props.value}
        cancelButtonTitle="Cancel"
      />
    </View>
  );
};

export default SearchBarArea;

const styles = StyleSheet.create({
  input: {
    height: 50,
    marginVertical: 15,
    fontSize: 16,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
});
