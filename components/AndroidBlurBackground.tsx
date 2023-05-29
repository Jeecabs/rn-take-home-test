import React from "react";
import { View, StyleSheet } from "react-native";
import { ColorsScheme } from "../style/GlobalStyles";

export interface BlurAlternativeProps {
  style?: any;
  children?: React.ReactNode;
}

const BlurAlternative: React.FC<BlurAlternativeProps> = ({
  style,
  children,
}) => {
  return <View style={[style, styles.translucentOverlay]}>{children}</View>;
};

const styles = StyleSheet.create({
  translucentOverlay: {
    backgroundColor: ColorsScheme.transparentBlack,
  },
});

export default BlurAlternative;
