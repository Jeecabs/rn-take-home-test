import React, { useEffect, useRef } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Animated,
  Platform,
  StyleSheet,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SongItemProps } from "../@types";

export const SongItem = React.memo<SongItemProps>(
  ({ song, onPress, isPlaying, isSelected, isLoading }) => {
    const animatedValue = useRef(new Animated.Value(0)).current;
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(animatedValue, {
        toValue: isSelected ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }, [isPlaying]);

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }, []);

    const bgColor = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: ["#fff", "#d1e8ff"],
    });

    return (
      <Animated.View
        style={[
          styles.songItemContainer,
          ,
          {
            backgroundColor: bgColor,
            opacity: opacity,
            borderRadius: 8,
            margin: 4,
            marginHorizontal: 8,
          },
        ]}
      >
        <TouchableOpacity onPress={onPress} style={styles.songItem}>
          <Image source={{ uri: song.artworkUrl100 }} style={styles.albumArt} />
          <View style={styles.songInfo}>
            <Text numberOfLines={1} style={styles.songTitle}>
              {song.trackName}
            </Text>
            <Text numberOfLines={1} style={styles.songArtist}>
              {song.artistName}
            </Text>
            <Text numberOfLines={1} style={styles.songAlbum}>
              {song.collectionName}
            </Text>
          </View>
          {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
          {!isLoading && isPlaying && (
            <MaterialIcons name="music-note" size={24} color="blue" />
          )}
        </TouchableOpacity>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  songItemContainer: {
    backgroundColor: "#fff",
    borderRadius: 8,
    margin: 4,
    marginHorizontal: 8,
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
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  albumArt: {
    width: 60,
    height: 60,
    marginRight: 10,
    borderRadius: 4,
  },
  songInfo: {
    flex: 1,
    paddingRight: 10,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#303030",
  },
  songArtist: {
    fontSize: 14,
    color: "gray",
  },
  songAlbum: {
    fontSize: 12,
    color: "gray",
  },

  selectedSongItem: {
    backgroundColor: "#aaa",
  },
});
