import React from "react";
import { Text, View, TouchableOpacity, Image, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SongItemProps } from "../@types";
import { ColorsScheme, GlobalStyles } from "../style/GlobalStyles";

export const SongItem = React.memo<SongItemProps>(
  ({ song, onPress, isPlaying, isSelected }) => {
    return (
      <View
        style={[
          styles.songItemContainer,
          {
            borderRadius: 8,
            margin: 4,
            marginHorizontal: 8,
          },
          isSelected ? styles.selectedSongItem : {},
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
          {isPlaying && (
            <MaterialIcons name="music-note" size={24} color={ColorsScheme.black} />
          )}
        </TouchableOpacity>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  songItemContainer: {
    ...GlobalStyles.shadow,
    ...GlobalStyles.borderRadius,
    ...GlobalStyles.margin,
    backgroundColor: ColorsScheme.white,
  },
  songItem: {
    ...GlobalStyles.row,
  },
  albumArt: {
    width: 60,
    height: 60,
    ...GlobalStyles.smallMargin,
    borderRadius: 4,
  },
  songInfo: {
    flex: 1,
    paddingRight: 10,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: ColorsScheme.greyHex,
  },
  songArtist: GlobalStyles.text,
  songAlbum: {
    fontSize: 12,
    color: ColorsScheme.greyHex,
  },
  selectedSongItem: {
    backgroundColor: ColorsScheme.lightBlue,
  },
});
