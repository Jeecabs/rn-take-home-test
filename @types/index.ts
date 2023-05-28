/**
 * Interface defining the props required for the MediaPlayer component.
 */
export interface MediaPlayerProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  handleSliderValueChange: (value: number) => void;
  duration: number; // 0 to 1 (percentage)
  position: number; // 0 to 1 (percentage)
}

/**
 * Interface defining the props required for the SongItem component.
 */
export interface SongItemProps {
  song: Song;
  onPress: () => void;
  isPlaying: boolean | null;
  isSelected: boolean | null;
}

/**
 * Type representing a song.
 */
export type Song = {
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl100: string;
  artworkUrl30: string;
  artworkUrl60: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  country: string;
  currency: string;
  discCount: number;
  discNumber: number;
  isStreamable: boolean;
  kind: string;
  previewUrl: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackNumber: number;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
};
