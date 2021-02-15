export interface IUPCItem {
  bounds: {
    height: number;
    origin: [[{}], [{}]];
    width: number;
  };
  data: string & string[];
  target: number;
  type: string;
}
