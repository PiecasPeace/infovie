export interface IImageInterface {
  props: Props;
  url: string;
}

export interface Props {
  source: Source;
  style: Style;
}

export interface Source {
  uri: string;
}

export interface Style {
  height: number;
  width: number;
}
