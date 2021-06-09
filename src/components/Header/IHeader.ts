import { HomeProps } from "../../constants/Navigation/navigation";

export interface IHeaderStackScreenProps {
  navigation?: any;
  component: React.FC<HomeProps>;
  componentName: string;
  componentTitle: string;
  onPress: () => void;
  children?: Element;
}
