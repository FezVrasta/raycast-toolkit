# Raycast Toolkit

This is an unofficial package to develop Raycast Extensions that provides additional
hooks and components useful to perform more advanced operations.

## Documentation

> Note: the exported namespaces are suffixed with a dollar sign ($) to avoid to conflict
> with the `@raycast/api` ones.

### Components

#### `Action$.SelectFile`

When this action is called, a Finder file prompt window will be displayed, the user can select
the file they prefer and the `onSelect` callback will be called with the POSIX path of the chosen file.

```tsx
import { ActionPanel } from '@raycast/api';
import { Action$ } from 'raycast-toolkit';

const Example = () => (
  <ActionPanel>
    <Action$.SelectFile
      prompt="Select a .csv file"
      type="csv"
      onSelect={(path) => console.log('Selected file at path:', path)}
    />
  </ActionPanel>
);
```

### Hooks

#### `usePersistentState`

Provides an interface compatible with `useState` but that persists its value on the
Raycast `LocalStorage`.

```tsx
import { usePersistentState } from 'raycast-toolkit';

const [persistentCounter, setPersistentCounter] = usePersistentState(
  'my-state-key', // LocalStorage key
  0 // initial value
);
```
