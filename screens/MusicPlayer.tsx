import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  FlatList,
  Alert,
  Platform,
} from "react-native";
import { Audio } from "expo-av";
import { MediaPlayer } from "../components/MediaPlayer";
import { SearchBar } from "../components/SearchBar";
import { Song } from "../@types";
import { SongItem } from "../components/SongItem";
import { debounce } from "../utils/debounce";
import { searchSongs } from "../utils/searchSongs";

const MusicPlayer: React.FC = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [playingSong, setPlayingSong] = useState<Song | null>(null);
  const [soundObject, setSoundObject] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [resultLimit, setResultLimit] = useState(25);
  const [searchText, setSearchText] = useState("");
  const [loadingSongId, setLoadingSongId] = useState<number | null>(null);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    return soundObject
      ? () => {
          soundObject.unloadAsync();
        }
      : undefined;
  }, [soundObject]);

  const handleSearchSongs = useCallback(
    debounce(async (searchText: string) => {
      setIsLoading(true);
      const results = await searchSongs(searchText, resultLimit);
      setSongs(results);
      setIsLoading(false);
    }, 100),
    [resultLimit]
  );

  const loadMoreResults = useCallback(async () => {
    setIsLoadingMore(true);
    const newResultLimit = resultLimit + 15;
    const results = await searchSongs(searchText, newResultLimit);
    setSongs(results);
    setResultLimit(newResultLimit);
    setIsLoadingMore(false);
  }, [searchText, resultLimit, songs]);

  const handleSliderValueChange = useCallback(
    async (value: number) => {
      if (soundObject && !isNaN(value)) {
        await soundObject.setPositionAsync(value);
      }
    },
    [soundObject]
  );

  const playSong = useCallback(
    async (song: Song) => {
      setLoadingSongId(song.trackId);
      if (soundObject) {
        await soundObject.unloadAsync();
      }
      const newSoundObject = new Audio.Sound();
      try {
        await newSoundObject.loadAsync({ uri: song.previewUrl });
        await newSoundObject.playAsync();
        newSoundObject.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded === true) {
            setPosition(status.positionMillis);
            if (status.durationMillis) setDuration(status.durationMillis);
          } else {
            if (status?.error !== undefined) {
              console.error("Playback error:", status?.error);
              Alert.alert("Error", "An error occurred during audio playback.");
            }
          }
        });
        setIsPlaying(true);
        setLoadingSongId(null);
      } catch (error) {
        setLoadingSongId(null);
        console.error("Audio loading error:", error);
        Alert.alert("Error", "An error occurred while loading the audio.");
      }
      setPlayingSong(song);
      setSoundObject(newSoundObject);
    },
    [soundObject]
  );

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      await soundObject?.pauseAsync();
    } else {
      await soundObject?.playAsync();
    }
    setIsPlaying(!isPlaying);
  }, [isPlaying, soundObject]);

  return (
    <View style={styles.safeArea}>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.container}>
          <SearchBar
            onSearch={handleSearchSongs}
            searchText={searchText}
            setSearchText={setSearchText}
          />
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color="#0000ff" />
            </View>
          ) : songs.length === 0 ? (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Please search for an artist.</Text>
            </View>
          ) : (
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
                  isSelected={
                    playingSong && playingSong.trackId === item.trackId
                  }
                  isLoading={loadingSongId === item.trackId}
                />
              )}
              keyExtractor={(item) => item.trackId.toString()}
              onEndReached={loadMoreResults}
              onEndReachedThreshold={0.5}
              ListFooterComponent={
                isLoadingMore ? (
                  <ActivityIndicator size="small" color="#0000ff" />
                ) : null
              }
            />
          )}
          {playingSong && (
            <MediaPlayer
              song={playingSong}
              isPlaying={isPlaying}
              onTogglePlay={togglePlay}
              handleSliderValueChange={handleSliderValueChange}
              duration={duration}
              position={position}
            />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    fontSize: 18,
    color: "gray",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
  container: {
    flex: 1,
  },
});

export default MusicPlayer;
