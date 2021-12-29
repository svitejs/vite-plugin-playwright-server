import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Browser, Page } from 'playwright-chromium';

describe('index', () => {
	let page: Page;
	beforeAll(async () => {
		// TODO how to get browser from playwrightServer plugin api in here
		// needs shared global context in vitest
		// importing from playwrightServer does not work
		const browser: Browser = undefined; //????;
		page = browser.newPage();
		await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
	});
	afterAll(async () => {
		await page?.close();
	});

	it('works', async () => {
		console.log('XXXXXX');
		const el = await page.$('h1');
		console.log('YYYYYYY', el);
		expect(await el.innerHTML()).toBe('Hello Vite!');
	});
});
