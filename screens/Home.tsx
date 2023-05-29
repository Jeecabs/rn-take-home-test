import React, { useEffect, useCallback, useState, useMemo } from "react";
import { StyleSheet, View, SafeAreaView, StatusBar, Alert } from "react-native";
import { Audio } from "expo-av";
import { MediaPlayer } from "../components/MediaPlayer";
import { SearchBar } from "../components/SearchBar";
import { Song } from "../@types";
import { debounce } from "../utils/debounce";
import { searchSongs } from "../utils/searchSongs";
import { useMusicPlayerStore } from "../state/zustand/store";
import { ColorsScheme, GlobalStyles } from "../style/GlobalStyles";
import { MusicPlayerContentComponent } from "../components/MusicPlayer";
import { INCREMENT_AMOUNT } from "../@constants/HomeScreen";

const Home: React.FC = () => {
  const {
    playback: {
      songs,
      playingSong,
      soundObject,
      isPlaying,
      position,
      duration,
      setSongs,
      startPlayingSong,
      stopPlaying,
      updatePlaybackStatus,
      firstPlay,
      setFirstPlay,
      resumePlayingSong,
    },
    search: {
      resultLimit,
      searchText,
      isLoading,
      isLoadingMore,
      initiateSearch,
      completeSearch,
      initiateLoadMore,
      completeLoadMore,
      setSearchText,
    },
  } = useMusicPlayerStore();

  const appMode = useMemo(() => {
    if (isLoading) {
      return "loading";
    } else if (searchText.length === 0) {
      return "empty";
    } else if (songs.length === 0) {
      return "no-results";
    } else {
      return "display";
    }
  }, [isLoading, searchText, songs]);

  const [loadedSongs, setLoadedSongs] = useState(
    new Map<number, Audio.Sound>()
  );

  // This is run on component dismount to unload all the songs
  useEffect(() => {
    return () => {
      unloadSongs();
    };
  }, []);

  const handleSearchSongs = useCallback(
    debounce(async (searchText: string) => {
      initiateSearch(searchText);
      const results = await searchSongs(searchText, resultLimit);
      setSongs(results);
      completeSearch(results.length);
    }, 100),
    [resultLimit]
  );

  const loadMoreResults = useCallback(async () => {
    initiateLoadMore();
    const newResultLimit = resultLimit + INCREMENT_AMOUNT;
    const results = await searchSongs(searchText, newResultLimit);
    setSongs(results);
    completeLoadMore(newResultLimit);
  }, [searchText, resultLimit, songs]);

  useEffect(() => {
    loadSongs(songs);
  }, [songs]);

  const handleSliderValueChange = useCallback(
    async (value: number) => {
      if (soundObject && !isNaN(value)) {
        await soundObject.setPositionAsync(value);
      }
    },
    [soundObject]
  );

  const loadSongs = useCallback(
    async (songsToLoad: Song[]) => {
      // Map over the songs to load and for each song, check if it's already loaded
      const promises = songsToLoad.map(async (song) => {
        // If the song is already loaded, return it with the sound object from the loadedSongs map
        if (loadedSongs.has(song.trackId)) {
          return Promise.resolve({
            song,
            soundObject: loadedSongs.get(song.trackId),
          });
        }
        // If the song is not loaded, create and load a new sound object
        const newSoundObject = new Audio.Sound();
        return newSoundObject
          .loadAsync({ uri: song.previewUrl })
          .then(() => ({ song, soundObject: newSoundObject }))
          .catch((error) => {
            throw error;
          });
      });

      // Resolve all the promises created above and set the loadedSongs state
      await Promise.all(promises)
        .then((result) => {
          if (result) {
            const newLoadedSongs = new Map(loadedSongs);
            result.forEach(({ song, soundObject }) => {
              if (soundObject) newLoadedSongs.set(song.trackId, soundObject);
            });
            // Update the loadedSongs state with the new map that includes the newly loaded songs
            setLoadedSongs(newLoadedSongs);
          }
        })
        .catch((error) => {
          console.error("Audio loading error:", error);
          Alert.alert("Error", "An error occurred while loading the audio.");
        });
    },
    [loadedSongs]
  );

  const unloadSongs = useCallback(async () => {
    const promises = songs.map((song) => {
      const currentSoundObject = loadedSongs.get(song.trackId);
      if (currentSoundObject) {
        return currentSoundObject.unloadAsync().then(() => song.trackId);
      }
    });
    const result = await Promise.all(promises);

    if (result) {
      const newLoadedSongs = new Map(loadedSongs);
      result.forEach((trackId) => {
        if (trackId) newLoadedSongs.delete(trackId);
      });
      setLoadedSongs(newLoadedSongs);
    }
  }, [loadedSongs]);

  const playSong = useCallback(
    async (song: Song) => {
      if (soundObject) {
        await soundObject.pauseAsync();
      }
      const currentSoundObject = loadedSongs.get(song.trackId);
      if (currentSoundObject) {
        // If it's the first play, autoplay the song. Otherwise, only load the song but don't play it.
        if (firstPlay) {
          await currentSoundObject.playAsync();
          setFirstPlay();
        }
        currentSoundObject.setOnPlaybackStatusUpdate((status) => {
          if (status.isLoaded === true) {
            if (status.durationMillis)
              updatePlaybackStatus(
                status.positionMillis,
                status.durationMillis
              );
          } else {
            if (status?.error !== undefined) {
              console.error("Playback error:", status?.error);
              Alert.alert("Error", "An error occurred during audio playback.");
            }
          }
        });
        startPlayingSong(song, currentSoundObject, firstPlay);
      } else {
        Alert.alert("Error", "The song is not loaded yet.");
      }
    },
    [loadedSongs, soundObject]
  );

  const togglePlay = useCallback(async () => {
    if (isPlaying) {
      await soundObject?.pauseAsync();
      stopPlaying();
    } else {
      await soundObject?.playAsync();
      if (playingSong && soundObject)
        resumePlayingSong(playingSong, soundObject);
    }
  }, [isPlaying, soundObject]);

  return (
    <View style={styles.safeArea} testID="home">
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />

        <View style={styles.container}>
          <SearchBar
            onSearch={handleSearchSongs}
            searchText={searchText}
            setSearchText={setSearchText}
            testID="search-bar"
          />
          <MusicPlayerContentComponent
            appMode={appMode}
            songs={songs}
            isLoadingMore={isLoadingMore}
            playSong={playSong}
            playingSong={playingSong}
            isPlaying={isPlaying}
            loadMoreResults={loadMoreResults}
          />
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
    ...GlobalStyles.container,
    backgroundColor: ColorsScheme.lightGray,
  },
  emptyContainer: {
    ...GlobalStyles.centerContainer,
  },
  emptyText: GlobalStyles.text,
  loadingContainer: {
    ...GlobalStyles.centerContainer,
  },
  errorContainer: {
    ...GlobalStyles.centerContainer,
  },
  errorText: GlobalStyles.errorText,
  container: GlobalStyles.container,
});

export default Home;
