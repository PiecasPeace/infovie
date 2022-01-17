import {FunctionComponent} from 'react';

export interface IHeaderProps {
  navigation?: any;
  component: FunctionComponent<any>;
  componentName: string;
  componentTitle: string;
  onPress: () => void;
  children?: Element;
}
