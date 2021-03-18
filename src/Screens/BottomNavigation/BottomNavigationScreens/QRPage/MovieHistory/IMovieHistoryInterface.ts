export interface HistoryItemProps {
  history: String[];
  index: number;
  onPress: (index:number) => Promise<void>;
}
export interface HistoryProps {
  history: String[];
  onPress: (index:number) => Promise<void>;
}
