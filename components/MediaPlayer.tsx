import React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import { MaterialIcons } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import BlurAlternative from "./AndroidBlurBackground";
import { MediaPlayerProps } from "../@types";

export const MediaPlayer: React.FC<MediaPlayerProps> = ({
  song,
  isPlaying,
  onTogglePlay,
  handleSliderValueChange,
  duration,
  position,
}) => {
  // Use a conditional rendering to provide the appropriate background for each platform

  if (Platform.OS === "ios")
    return (
      <BlurView intensity={20} style={styles.mediaPlayer}>
        <View style={styles.mediaPlayerInfo}>
          <Image
            source={{ uri: song.artworkUrl100 }}
            style={styles.mediaPlayerAlbumArt}
          />
          <Text style={styles.mediaPlayerTitle}>{song.trackName}</Text>
          <TouchableOpacity onPress={onTogglePlay}>
            <MaterialIcons
              name={isPlaying ? "pause" : "play-arrow"}
              size={48}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onValueChange={handleSliderValueChange}
          onSlidingComplete={handleSliderValueChange}
          minimumTrackTintColor="#FFFFFF"
          maximumTrackTintColor="#000000"
        />
      </BlurView>
    );

  return (
    <BlurAlternative style={styles.mediaPlayer}>
      <View style={styles.mediaPlayerInfo}>
        <Image
          source={{ uri: song.artworkUrl100 }}
          style={styles.mediaPlayerAlbumArt}
        />
        <Text style={styles.mediaPlayerTitle}>{song.trackName}</Text>
        <TouchableOpacity onPress={onTogglePlay}>
          <MaterialIcons
            name={isPlaying ? "pause" : "play-arrow"}
            size={48}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <Slider
        style={styles.slider}
        minimumValue={0}
        maximumValue={duration}
        value={position}
        onValueChange={handleSliderValueChange}
        onSlidingComplete={handleSliderValueChange}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      />
    </BlurAlternative>
  );
};

const styles = StyleSheet.create({
  mediaPlayerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  mediaPlayerAlbumArt: {
    width: 50,
    height: 50,
  },
  mediaPlayerTitle: {
    flex: 1,
    marginLeft: 10,
    color: "white",
    fontSize: 16,
  },
  slider: {
    marginTop: 10,
    width: "100%",
  },
  mediaPlayer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
  },
  mediaPlayerInfo: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
