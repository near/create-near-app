# NEAR frontend — Next.js (App Router)

Requires Node.js 22.22.2+ or 24+.

```sh
npm install
npm run dev
```

Open http://localhost:3000 and visit `/hello-near` to read and update a greeting. Connect a wallet on testnet to submit a change.

- Edit `src/app/page.tsx` for the home page and `src/app/hello-near/page.tsx` for the contract interaction.
- Configure the network and contract addresses in `src/config.ts`.
- `src/providers/near-provider.tsx` supplies the wallet context using NEAR Connect and `near-api-js`. The function call key plugin permits `set_greeting` calls on the configured contract with a limited allowance.

```sh
npm run build
npm run lint
```

Run `npm start` to serve the production build.

See the [NEAR frontend quickstart](https://docs.near.org/build/web3-apps/quickstart) and [Hello NEAR example](https://github.com/near-examples/hello-near-examples) for more details.
