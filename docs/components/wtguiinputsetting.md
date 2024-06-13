# WTGuiInputSetting

```ts
import { WTGuiInputSetting } from '@wtfsystems/wtgui'
```

## Properties

| Name  | Required           | Type   | Purpose                      |
|-------|:------------------:|--------|------------------------------|
| label | :white_check_mark: | string | Text to display on the label |

## Example
```vue{2,7}
<script>
const inputValue = ref('?')
</script>

<WTGuiInputSetting
      label="Select this >"
      v-model="inputValue"/>
```
