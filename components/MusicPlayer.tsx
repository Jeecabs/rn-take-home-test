import React from "react";
import {
  Text,
  View,
  ActivityIndicator,
  FlatList,
  StyleSheet,
} from "react-native";
import { Song } from "../@types";
import { SongItem } from "./SongItem";
import { ColorsScheme, GlobalStyles } from "../style/GlobalStyles";

type MusicPlayerContentProps = {
  appMode: "loading" | "empty" | "display" | "no-results";
  songs: Song[];
  isLoadingMore: boolean;
  playSong: (song: Song) => void;
  playingSong: Song | null;
  isPlaying: boolean;
  loadMoreResults: () => void;
};
const MusicPlayerContent: React.FC<MusicPlayerContentProps> = ({
  appMode,
  songs,
  isLoadingMore,
  playSong,
  playingSong,
  isPlaying,
  loadMoreResults,
}) => {
  switch (appMode) {
    case "loading":
      return (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={ColorsScheme.black} />
        </View>
      );
    case "empty":
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Please search for an artist.</Text>
        </View>
      );
    case "no-results":
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No results found for your search.
          </Text>
        </View>
      );
    case "display":
      if (songs.length > 0)
        return (
          <FlatList
            data={songs}
            renderItem={({ item }) => (
              <SongItem
                song={item}
                onPress={() => playSong(item)}
                isPlaying={
                  playingSong &&
                  playingSong.trackId === item.trackId &&
                  isPlaying
                }
                isSelected={playingSong && playingSong.trackId === item.trackId}
              />
            )}
            keyExtractor={(item) => item.trackId.toString()}
            onEndReached={loadMoreResults}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
              isLoadingMore ? (
                <ActivityIndicator size="small" color={ColorsScheme.black} />
              ) : null
            }
          />
        );
      else return null;
  }
};

export const styles = StyleSheet.create({
  emptyContainer: {
    ...GlobalStyles.centerContainer,
  },
  emptyText: GlobalStyles.text,
  loadingContainer: {
    ...GlobalStyles.centerContainer,
  },
});

export const MusicPlayerContentComponent = React.memo(MusicPlayerContent);
