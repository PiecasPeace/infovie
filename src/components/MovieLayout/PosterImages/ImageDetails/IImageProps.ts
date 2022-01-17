import { IImageInterface } from "../../MovieDetail/Interfaces/IImageInterface";

export interface IImageModalProps {
  showImage: boolean;
  images: IImageInterface[];
  onClose: () => void;
}