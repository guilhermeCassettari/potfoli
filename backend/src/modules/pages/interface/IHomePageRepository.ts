import { IHomePage } from './IHomePage';
import { ISetHomePage } from './ISetHomePage';

export interface IHomePageRepository {
  setHomePage(homePage: ISetHomePage): Promise<Response>;
  hasHomePage(): Promise<IHomePage[]>;
  getHomePage(): Promise<IHomePage>;
}
