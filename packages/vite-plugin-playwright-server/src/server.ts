import { Options } from './index';
import type { Browser, BrowserType, BrowserServer } from 'playwright-core';
import path from 'path';
import os from 'os';
import fs from 'fs';

const STORE_FILE = path.join(os.tmpdir(), '.vite-plugin-playwright-server');

// hide dynamic import from ts transform to prevent it turning into a require
// see https://github.com/microsoft/TypeScript/issues/43329#issuecomment-811606238
// also use timestamp query to avoid caching on reload
const dynamicImportDefault = new Function('path', 'return import(path)');

function save(options: Options, server: BrowserServer) {
	fs.writeFileSync(STORE_FILE, JSON.stringify({ options, ws: server.wsEndpoint() }));
	fs.chmodSync(STORE_FILE, 0o600); // no outside access
}

function load(): { options: Options; ws: string } {
	return JSON.parse(fs.readFileSync(STORE_FILE, 'utf-8'));
}

async function importChromium(options: Options): Promise<BrowserType> {
	const useCore = !!options?.launchOptions?.executablePath;
	const playwrightPackage = useCore ? 'playwright-core' : 'playwright-chromium';
	const playwright = await dynamicImportDefault(playwrightPackage);
	return playwright.chromium;
}

export async function start(options: Options): Promise<BrowserServer> {
	const chromium = await importChromium(options);
	const server: BrowserServer = await chromium.launchServer(options.launchOptions);
	save(options, server);
	return server;
}

export async function getBrowser(): Promise<Browser> {
	const { ws: wsEndpoint, options } = load();
	const chromium = await importChromium(options);
	const { slowMo, logger, timeout } = options.launchOptions;
	return chromium.connect({ wsEndpoint, logger, slowMo, timeout });
}
