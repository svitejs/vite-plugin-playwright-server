# @svitejs/vite-plugin-playwright-server

starts a playwright browser server alongside vite

## Installation

```bash
pnpm i -D @svitejs/vite-plugin-playwright-server
```

## Usage

### add to vite config

```ts
// vite config
import { defineConfig } from 'vite';
import { playwrightServer } from '@svitejs/vite-plugin-playwright-server';

export default defineConfig({
	plugins: [
		playwrightServer({
			/* plugin options */
		})
	]
});
```

## Documentation

- some
- doc
- links

## License

[MIT](./LICENSE)
