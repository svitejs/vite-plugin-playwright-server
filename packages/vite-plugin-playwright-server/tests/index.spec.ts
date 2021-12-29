import { describe, it, expect } from 'vitest';
import { playwrightServer } from '../src';

describe('vite-plugin-playwright-server', () => {
	it('should be named', function () {
		expect(playwrightServer().name).toBe('vite-plugin-playwright-server');
	});
});
