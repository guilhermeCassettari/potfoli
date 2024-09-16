import { IUploadImage } from '../../upload/interface/IUploadImage';

export interface IHomePage {
  image?: IUploadImage | null;
  impact_phrase: string;
  social_medias: { name: string; url: string }[];
  srcImage: string;
}
