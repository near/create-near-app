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

* Set the flag (something like http://127.0.0.1:4040/api/loader) at localhost:3000/flags

## Breakdown

### App.js

- Configure custom elements in the VM
- Add a route to the gateway

### ViewPage.js

- Access query params and render widget




## Custom Elements

### Camera : react-webcam

[react-webcam](https://github.com/mozmorris/react-webcam)
components/custom/Camera
[https://everything.dev/efiz.near/widget/Camera](efiz.near/widget/Camera)


### MonacoEditor : monaco-editor/react

[monaco-editor/react]()
components/custom/MonacoEditor
[https://everything.dev/efiz.near/widget/MonacoEditor](efiz.near/widget/MonacoEditor)

TODO: Can switch to https://github.com/react-monaco-editor/react-monaco-editor


### KeypomScanner : keypom

[keypom]()
components/custom/KeypomScanner
[https://everything.dev/scanner](efiz.near/widget/KeypomScanner)



## Contributing

### Extending the gateway with a custom component:

- [ ] Install library
- [ ] Create component in /components/common
- [ ] Add component as custom element in App.js



