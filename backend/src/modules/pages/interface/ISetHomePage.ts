export interface ISetHomePage {
  id?: string;
  image?: Express.Multer.File | null;
  page: IPage;
}

export interface IPage {
  impact_phrase: string;
  social_medias?: { name: string; url: string }[];
}
