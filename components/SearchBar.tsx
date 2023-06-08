import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ColorsScheme, GlobalStyles } from "../style/GlobalStyles";

interface SearchBarProps {
  onSearch: (searchText: string) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
  testID?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  searchText,
  setSearchText,
  testID
}) => {
  const handleSearch = () => {
    onSearch(searchText);
  };

  return (
    <View style={styles.searchBar} >
      <MaterialIcons
        name="search"
        size={24}
        color={ColorsScheme.black}
        style={styles.searchIcon}
      />
      <TextInput
        style={styles.searchInput}
        onChangeText={setSearchText}
        value={searchText}
        placeholder="Search for an artist"
        onSubmitEditing={handleSearch}
        testID={testID}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchBar: {
    ...GlobalStyles.row,
    ...GlobalStyles.shadow,
    borderRadius: 25,
    margin: 10,
    backgroundColor: ColorsScheme.white,
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
