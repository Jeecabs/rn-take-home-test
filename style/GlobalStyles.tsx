import { Platform, StyleSheet } from "react-native";

export const ColorsScheme = {
  white: "#fff",
  gray: "gray",
  lightGray: "#f0f0f0",
  red: "red",
  black: "#000",
  transparentBlack: "rgba(0, 0, 0, 0.5)",
  darkGrey: "#aaa",
  greyHex: "#303030",
  lightBlue: "#d1e8ff",
};

export const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    color: ColorsScheme.gray,
  },
  errorText: {
    fontSize: 18,
    color: ColorsScheme.red,
  },
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: ColorsScheme.black,
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  borderRadius: {
    borderRadius: 8,
  },
  margin: {
    margin: 4,
    marginHorizontal: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  smallMargin: {
    marginRight: 10,
  },
  absoluteFill: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  rowSpaceBetween: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
