export interface MediaPlayerProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  handleSliderValueChange: (value: number) => void;
  duration: number;
  position: number;
}

export interface SongItemProps {
  song: Song;
  onPress: () => void;
  isPlaying: boolean | null;
  isSelected: boolean | null;
}

export interface SongItemProps {
  song: Song;
  onPress: () => void;
  isPlaying: boolean | null;
  isSelected: boolean | null;
  isLoading: boolean | null;
}

export type Song = {
  trackId: number;
  trackName: string;
  artistName: string;
  collectionName: string;
  artworkUrl100: string;
  previewUrl: string;
};
