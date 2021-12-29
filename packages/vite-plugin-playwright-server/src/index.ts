import type { Plugin } from 'vite';
import { start } from './server';
import type { BrowserServer, LaunchOptions } from 'playwright-core';

export interface Options {
	launchOptions: LaunchOptions;
}

const DEFAULT_OPTIONS: Partial<Options> = {
	launchOptions: {
		// TODO defaults?
	}
};

// TODO export promise that resolves with browser in buildStart?

export function playwrightServer(inlineOptions?: Partial<Options>): Plugin {
	// eslint-disable-next-line no-unused-vars
	const options = {
		...DEFAULT_OPTIONS,
		...inlineOptions,
		launchOptions: {
			...DEFAULT_OPTIONS.launchOptions,
			...inlineOptions?.launchOptions
		}
	};

	let browserServer: BrowserServer;
	return {
		name: 'vite-plugin-playwright-server',
		apply: 'serve',
		async buildStart() {
			browserServer = await start(options);
		},
		async buildEnd() {
			await browserServer?.close();
		}
	};
}

export { getBrowser } from './server';
