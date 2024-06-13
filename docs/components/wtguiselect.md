# WTGuiSelect

```ts
import { WTGuiSelect } from '@wtfsystems/wtgui'
```

## Properties

| Name        | Required           | Type        | Purpose                          |
|-------------|:------------------:|-------------|----------------------------------|
| label       | :x:                | string      | Display label                    |
| values      | :white_check_mark: | Array\<any> | List of values for the selection |
| default-idx | :x:                | number      | Default index (defaults to 0)    |
| sound       | :x:                | string      | Sound to play on select          |

## Events
| Name     | Type   | Purpose                    |
|----------|--------|----------------------------|
| selected | string | Returns the selected value |

::: tip
The event fires on mount and each time the value changes, so it
will always contain the current selected value.
:::

## Example

```vue{2,9}
<script>
const currentSelection = ref('')
</script>

<WTGuiSelect
  sound="./src/assets/click.wav"
  :values="[1, 2, 3, 4, 5]"
  :default-idx="1"
  @selected="(v:string) => currentSelection = v"/>
```
