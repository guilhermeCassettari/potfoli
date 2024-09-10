import { IUploadImage } from '../../upload/interface/IUploadImage';

export interface IHomePage {
  image?: IUploadImage;
  impact_phrase: string;
  social_medias: { name: string; url: string }[];
}
