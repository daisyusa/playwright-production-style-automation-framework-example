import { test as base } from '@playwright/test';
import { RequestHandler } from './request-handler';

export type TestOptions = { api: RequestHandler};

export const test = base.extend<TestOptions>({
    api: async({}, use) =>{
        const requestHandler = new RequestHandler()
        await use(requestHandler);
    }
})