export interface IUPCInterface {
  bounds: {
    height: number;
    origin: [[{}], [{}]];
    width: number;
  };
  data: string & string[];
  target: number;
  type: string;
}
