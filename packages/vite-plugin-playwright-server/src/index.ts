import type { Plugin } from 'vite';
import { Api, start } from './server';
import type { LaunchOptions } from 'playwright-core';
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

	const api: Api = {
		browser: undefined, // will be set on buildStart
		async stop() {}
	};
	return {
		name: 'vite-plugin-playwright-server',
		apply: 'serve',
		async buildStart() {
			Object.assign(api, await start(options));
		},
		async buildEnd() {
			await api.stop();
		},
		api
	};
}
