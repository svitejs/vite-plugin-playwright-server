import type { Plugin } from 'vite';
import { describe, it, expect, beforeEach } from 'vitest';
import { playwrightServer } from '../src';
import { Api } from '../src/server';

describe('vite-plugin-playwright-server', () => {
	let plugin: Plugin;
	beforeEach(() => {
		plugin = playwrightServer();
	});
	it('should be named', function () {
		expect(plugin).toBeDefined();
		expect(plugin.name).toBe('vite-plugin-playwright-server');
	});

	it('should provide api during build phase', async () => {
		let api: Api;
		try {
			// @ts-expect-error missing plugincontext
			await plugin.buildStart({});
			api = plugin.api;
			expect(api.browser).toBeTruthy();
			expect(typeof api.browser.newPage).toBe('function');
			expect(typeof api.stop).toBe('function');
		} finally {
			try {
				await api.stop();
			} catch (e) {
				console.error('error', e);
				expect(e).toBeUndefined();
			}
		}
	});
});
