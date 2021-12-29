import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { Browser, Page } from 'playwright-chromium';
import { getBrowser } from '@svitejs/vite-plugin-playwright-server';

describe('index', () => {
	let page: Page;
	beforeAll(async () => {
		const browser: Browser = await getBrowser();
		page = await browser.newPage();
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
