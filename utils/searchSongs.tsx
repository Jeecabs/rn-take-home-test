import { Song } from "../@types";

/**
 * Note: In an ideal world I would be able to paginate the results rather than to just have to load more results.
 * Unfortunately the solution is for the resultLimit to be increased with each successive call due to the user scrolling down the list.
 */
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
