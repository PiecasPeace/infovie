export interface ICastProps {
  name: string;
  image: string | null;
  original_name: string;
  credit_id: string | number | undefined | null;
  onPress: () => void;
}
