import { Request, Response } from 'express';
import SetHomePageService from '../services/SetHomePageService';
import { container } from 'tsyringe';

export default class PagesController {
  public async setHomePage(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const setHomePage = container.resolve(SetHomePageService);

    const pageParse = JSON.parse(request.body.data);

    const homePage = await setHomePage.execute({
      page: pageParse,
      image: request.file || null,
    });

    return response.json(homePage);
  }
}
