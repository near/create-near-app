# Toast

Implemented via Radix primitives: https://www.radix-ui.com/docs/primitives/components/toast

_If the current props and Stitches style overrides aren't enough to cover your use case, feel free to implement your own component using the Radix primitives directly._

## Example

Using the `openToast` API allows you to easily open a toast from any context:

```tsx
import { openToast } from '@/components/lib/Toast';

...

<Button
  onClick={() =>
    openToast({
      type: 'ERROR',
      title: 'Toast Title',
      description: 'This is a great toast description.',
    })
  }
>
  Open a Toast
</Button>
```

You can pass other options too:

```tsx
<Button
  onClick={() =>
    openToast({
      type: 'SUCCESS', // SUCCESS | INFO | ERROR
      title: 'Toast Title',
      description: 'This is a great toast description.',
      icon: 'ph-bold ph-pizza', // https://phosphoricons.com/
      duration: 20000, // milliseconds (pass Infinity to disable auto close)
    })
  }
>
  Open a Toast
</Button>
```

## Deduplicate

If you need to ensure only a single instance of a toast is ever displayed at once, you can deduplicate by passing a unique `id` key. If a toast with the passed `id` is currently open, a new toast will not be opened:

```tsx
<Button
  onClick={() =>
    openToast({
      id: 'my-unique-toast',
      title: 'Toast Title',
      description: 'This is a great toast description.',
    })
  }
>
  Deduplicated Toast
</Button>
```

## Custom Toast

If you need something more custom, you can render a custom toast using `lib/Toast/Toaster.tsx` as an example like so:

```tsx
import * as Toast from '@/components/lib/Toast';

...

<Toast.Provider duration={5000}>
  <Toast.Root open={isOpen} onOpenChange={setIsOpen}>
    <Toast.Title>My Title</Toast.Title>
    <Toast.Description>My Description</Toast.Description>
    <Toast.CloseButton />
  </Toast.Root>

  <Toast.Viewport />
</Toast.Provider>
```
