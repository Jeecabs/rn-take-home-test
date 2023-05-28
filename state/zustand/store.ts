import { create } from "zustand";
import { Song } from "../../@types";
import { Audio } from "expo-av";

type PlaybackAction = {
  songs: Song[];
  playingSong: Song | null;
  soundObject: Audio.Sound | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  firstPlay: boolean;

  setSongs: (songs: Song[]) => void;
  setFirstPlay: () => void;
  startPlayingSong: (
    playingSong: Song,
    soundObject: Audio.Sound,
    isPlaying: boolean
  ) => void;
  resumePlayingSong: (playingSong: Song, soundObject: Audio.Sound) => void;

  stopPlaying: () => void;
  updatePlaybackStatus: (position: number, duration: number) => void;
};

type SearchAction = {
  resultLimit: number;
  searchText: string;
  isLoading: boolean;
  isLoadingMore: boolean;
  initiateSearch: (searchText: string) => void;
  completeSearch: (resultLimit: number) => void;
  initiateLoadMore: () => void;
  completeLoadMore: (resultLimit: number) => void;
  setSearchText: (searchText: string) => void;
};

export type MusicPlayerState = {
  playback: PlaybackAction;
  search: SearchAction;
};

export const useMusicPlayerStore = create<MusicPlayerState>((set) => ({
  playback: {
    songs: [],
    playingSong: null,
    soundObject: null,
    isPlaying: false,
    position: 0,
    duration: 1,
    firstPlay: true,

    // Setters
    setSongs: (songs) =>
      set((state) => ({ playback: { ...state.playback, songs } })),
    setFirstPlay: () =>
      set((state) => ({ playback: { ...state.playback, firstPlay: false } })),
    startPlayingSong: (playingSong, soundObject, isPlaying) =>
      set((state) => ({
        playback: {
          ...state.playback,
          playingSong,
          soundObject,
          isPlaying: isPlaying,
        },
      })),
    resumePlayingSong: (playingSong, soundObject) =>
      set((state) => ({
        playback: {
          ...state.playback,
          playingSong,
          soundObject,
          isPlaying: true,
        },
      })),

    stopPlaying: () =>
      set((state) => ({
        playback: {
          ...state.playback,
          isPlaying: false,
        },
      })),
    updatePlaybackStatus: (position, duration) =>
      set((state) => ({
        playback: {
          ...state.playback,
          position,
          duration,
        },
      })),
  },
  search: {
    resultLimit: 25,
    searchText: "",
    isLoading: false,
    isLoadingMore: false,

    // Setters
    setSearchText: (searchText) =>
      set((state) => ({
        search: {
          ...state.search,
          searchText,
        },
      })),
    initiateSearch: (searchText) =>
      set((state) => ({
        search: {
          ...state.search,
          searchText,
          isLoading: true,
        },
      })),
    completeSearch: (resultLimit) =>
      set((state) => ({
        search: {
          ...state.search,
          resultLimit,
          isLoading: false,
        },
      })),
    initiateLoadMore: () =>
      set((state) => ({
        search: {
          ...state.search,
          isLoadingMore: true,
        },
      })),
    completeLoadMore: (resultLimit) =>
      set((state) => ({
        search: {
          ...state.search,
          resultLimit,
          isLoadingMore: false,
        },
      })),
  },
}));
