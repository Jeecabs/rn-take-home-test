import React from "react";
import { View, StyleSheet } from "react-native";

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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
});

export default BlurAlternative;
