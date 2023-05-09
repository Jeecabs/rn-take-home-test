import { Song } from "../@types";

export const searchSongs = async (
  searchText: string,
  resultLimit: number
): Promise<Song[]> => {
  const response = await fetch(
    `https://itunes.apple.com/search?term=${encodeURIComponent(
      searchText
    )}&media=music&entity=song&limit=${resultLimit}`
  );
  const data = await response.json();
  return data.results;
};
