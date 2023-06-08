import React from "react";
import { render, waitFor } from "@testing-library/react-native";
import Home from "./Home";
import { useMockMusicPlayerStore } from "../state/zustand/mockStore";

// Mock the Zustand store
jest.mock("../state/zustand/mockStore");

// const mockSearchState = {
//   resultLimit: 25,
//   searchText: "",
//   isLoading: false,
//   isLoadingMore: false,
//   initiateSearch: jest.fn(),
//   completeSearch: jest.fn(),
//   initiateLoadMore: jest.fn(),
//   completeLoadMore: jest.fn(),
//   setSearchText: jest.fn(),
// };
//
// const mockPlaybackState = {
//   songs: [],
//   playingSong: null,
//   soundObject: null,
//   isPlaying: false,
//   position: 0,
//   duration: 1,
//   setSongs: jest.fn(),
//   startPlayingSong: jest.fn(),
//   stopPlaying: jest.fn(),
//   updatePlaybackStatus: jest.fn(),
//   resumePlayingSong: jest.fn(),
//   setFirstPlay: jest.fn(),
// };

describe("<Home />", () => {
  // beforeEach(() => {
  //   useMockMusicPlayerStore.mockImplementation(() => ({
  //     search: mockSearchState,
  //     playback: mockPlaybackState,
  //   }));
  // });
  //
  // afterEach(() => {
  //   jest.clearAllMocks();
  // });

  it("renders correctly", async () => {
    const { getByTestId } = render(<Home />);
    await waitFor(() => {
      expect(getByTestId("home")).toBeTruthy();
      expect(getByTestId("search-bar")).toBeTruthy();
    });
  });
});
