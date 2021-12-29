import { defineConfig } from 'vite';
import { playwrightServer } from '@svitejs/vite-plugin-playwright-server';
import * as child_process from 'child_process';

let devServerProcess;
export default defineConfig({
	plugins: [
		// Hack, start a dev server alongside vitests internal vite instance that serves the app under test
		{
			name: 'vite-plugin-devserver',
			buildStart() {
				// @ts-ignore
				devServerProcess = child_process.exec(
					'pnpm run dev -- --port 3000 --strictPort',
					(err) => {
						if (err) {
							console.error('error', err);
						}
					},
					{ stdio: 'ignore' }
				);
			},
			buildEnd() {
				devServerProcess.kill();
			}
		},
		playwrightServer()
	]
});
