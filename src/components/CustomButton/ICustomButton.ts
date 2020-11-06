export interface ICustomButtonProps {
  style: object;
  mode: 'text' | 'outlined' | 'contained' | undefined;
  Text: string;
  color: string;
  onPress: () => void;
  icon?: string;
  dark?: boolean;
}
