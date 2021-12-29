import { Options } from './index';
import type { Browser, BrowserType, BrowserServer } from 'playwright-core';

// hide dynamic import from ts transform to prevent it turning into a require
// see https://github.com/microsoft/TypeScript/issues/43329#issuecomment-811606238
// also use timestamp query to avoid caching on reload
const dynamicImportDefault = new Function('path', 'return import(path)');

export interface Api {
	browser?: Browser;
	stop(): Promise<void>;
}
export async function start(options: Options): Promise<Api> {
	const useCore = !!options?.launchOptions?.executablePath;
	const playwrightPackage = useCore ? 'playwright-core' : 'playwright-chromium';
	const playwright = await dynamicImportDefault(playwrightPackage);
	const chromium: BrowserType = playwright.chromium;
	const server: BrowserServer = await chromium.launchServer(options.launchOptions);
	const wsEndpoint = server.wsEndpoint();
	const { slowMo, logger, timeout } = options.launchOptions;
	const browser: Browser = await chromium.connect({ wsEndpoint, logger, slowMo, timeout });
	const api: Api = {
		browser,
		async stop() {
			try {
				await browser?.close();
			} catch (e) {
				console.error('failed to close browser', e);
			}
			try {
				await server.close();
			} catch (e) {
				console.error('failed to close server', e);
			}
		}
	};
	return api;
}
