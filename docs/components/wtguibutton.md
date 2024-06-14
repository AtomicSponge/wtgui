# WTGuiButton

```ts
import { WTGuiButton } from '@wtfsystems/wtgui'
```

## Properties

| Name   | Required           | Type     | Purpose                      |
|--------|:------------------:|----------|------------------------------|
| label  | :white_check_mark: | string   | Sets the button label        |
| goto   | :x:                | string   | Go to another menu           |
| action | :x:                | Function | Perform an action            |
| sound  | :x:                | string   | Sound file to play on select |

::: danger
Don't use the `goto` and `action` properties at the same time!  There is no internal check preventing this and doing so will cause strange behavior.
:::

## Menu Example

```vue{4}
<WTGuiButton
  sound="./src/assets/click.wav"
  label="Main Menu"
  goto="/"/>
```

## Action Example

```vue{4}
<WTGuiButton
  sound="./src/assets/click.wav"
  label="Click Me"
  :action="() => { showMessageBox = true }"/>
```
