import React from "react";
import { View, TextInput, StyleSheet, Platform } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  searchText,
  setSearchText,
}) => {
  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchBar}>
      <MaterialIcons name="search" size={24} color="#777" style={styles.searchIcon} />
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search for an artist"
        onSubmitEditing={handleSearch}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 25,
    margin: 10,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  searchInput: {
    flex: 1,
    borderWidth: 0,
    fontSize: 16,
    marginLeft: 10,
    paddingVertical: 8,
  },
  searchIcon: {
    paddingHorizontal: 6,
  },
});
