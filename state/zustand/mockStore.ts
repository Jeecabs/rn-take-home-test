import { create } from "zustand";
import { MusicPlayerState } from "./store";

// Define a type for the mock state, including any functions you want to mock
type MockState = MusicPlayerState & {
  mockClear: jest.Mock;
  mockImplementation: jest.Mock;
};

export const useMockMusicPlayerStore = create<MockState>((set) => ({

  playback: {
    songs: [],
    playingSong: null,
    soundObject: null,
    isPlaying: false,
    position: 0,
    duration: 0,
    setSongs: jest.fn(),
    startPlayingSong: jest.fn(),
    stopPlaying: jest.fn(),
    updatePlaybackStatus: jest.fn(),
    firstPlay: false,
    setFirstPlay: jest.fn(),
    resumePlayingSong: jest.fn(),
  },
  search: {
    resultLimit: 10,
    searchText: "",
    isLoading: false,
    isLoadingMore: false,
    initiateSearch: jest.fn(),
    completeSearch: jest.fn(),
    initiateLoadMore: jest.fn(),
    completeLoadMore: jest.fn(),
    setSearchText: jest.fn(),
  },
  mockClear: jest.fn(),
  mockImplementation: jest.fn(),
}));
