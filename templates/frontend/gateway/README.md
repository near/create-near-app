# everything browser

## Setup & Development

Install packages:

```
yarn
```

Start development version:

```
yarn dev
```

This will start both the gateway and http server for loading your local components.

To view your local developments, either visit them through a gateway ${gateway_url}/flags

For example, to use this local gateway, use:

- Set the flag (something like http://127.0.0.1:4040/api/loader) at localhost:3000/flags

## Breakdown

### App.js

- Configure custom elements in the VM
- Add a route to the gateway

### ViewPage.js

- Access query params and render widget

## Contributing

### Extending the gateway with a custom component:

- [ ] Install library
- [ ] Create component in /components/common
- [ ] Add component as custom element in App.js
