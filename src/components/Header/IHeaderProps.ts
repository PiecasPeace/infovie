import { AboutDrawerProps, HomeProps } from "../../constants/Navigation/navigation";
import { RouteRootStackParamList } from "../../constants/Navigation/route";

export interface IHeaderProps {
  navigation?: any;
  component: Element;
  componentName: string;
  componentTitle: string;
  onPress: () => void;
  children?: Element;
}
