# WTGuiInputSetting

```ts
import { WTGuiInputSetting } from '@wtfsystems/wtgui'
```

## Properties

| Name  | Required           | Type   | Purpose                      |
|-------|:------------------:|--------|------------------------------|
| label | :white_check_mark: | string | Text to display on the label |

## Example
```vue
const inputValue = ref('?')

<WTGuiInputSetting
      label="Select this >"
      v-model="inputValue"/>
```
