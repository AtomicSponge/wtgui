# WTGuiInputSetting

```ts
import { WTGuiInputSetting } from '@wtfsystems/wtgui'
```

## Properties

| Name        | Required           | Type   | Purpose                           |
|-------------|:------------------:|--------|-----------------------------------|
| label       | :white_check_mark: | string | Text to display on the label      |
| sound-open  | :x:                | string | Sound file to play on open        |
| sound-close | :x:                | string | Sound file to play on close press |

## Modal
Bind to a ref to track the input value.  See example below.

## Example
```vue{2,7}
<script>
const inputValue = ref('?')
</script>

<WTGuiInputSetting
      label="Select this >"
      v-model="inputValue"/>
```
