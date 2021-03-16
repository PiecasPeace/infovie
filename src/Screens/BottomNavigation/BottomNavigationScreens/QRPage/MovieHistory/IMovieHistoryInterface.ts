export interface HistoryProps {
  history: String[];
  onPress: () => void;
}
export interface HistoryItemProps {
  history: String[];
  index: number;
  buttonStyle: {};
  onPress: () => void;
}
