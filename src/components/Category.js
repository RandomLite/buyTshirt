import React,{ useState} from "react";
import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native";

const categoryList = [
  {
    ctgName: "All",
  },
  {
    ctgName: "Woman",
  },
  {
    ctgName: "Man",
  },
  {
    ctgName: "Children",
  },
  {
    ctgName: "All",
  },
  {
    ctgName: "Woman",
  },
  {
    ctgName: "Man",
  },
  {
    ctgName: "Children",
  },
];

const Category = () => {
  const [selected, setSelected] = useState(0);
  return (
    <View
      style={{
        marginTop: 5,
        paddingVertical: 10,
        paddingLeft: 5,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text style={{ fontWeight:"600", fontSize: 18 }}>T-shirt Category</Text>
        <Text>Filter</Text>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categoryList.map((d, item) => {
          return (
            <Pressable
              key={item}
              style={{
                alignItems: "center",
                paddingVertical: 12,
                paddingHorizontal: 15,
                marginRight: 20,
                borderWidth: 1,
                borderColor:item === selected ? '#0057FF' : "rgba(45,45,45,0.3)",
                borderRadius: 6,
                backgroundColor: item === selected ? '#0057FF' : '#fff',
              }}
              onPress={() => setSelected(item)}
            >
              <Text style={{ fontSize: 16, color:item === selected ? '#fff' : "rgba(45,45,45,0.7)" }}>
                {d.ctgName}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
      
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({});
