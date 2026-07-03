import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import type { Response } from 'supertest';

export interface PostWorld extends World {
  newPostData?: any;
  response?: Response;
}

export class CustomWorld extends World implements PostWorld {
  newPostData?: any;
  response?: Response;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

setWorldConstructor(CustomWorld);