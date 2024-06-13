# WtguiMenu

```ts
import { WtguiMenu } from '@wtfsystems/wtgui'
```

## Properties

| Name         | Required           | Type     | Purpose                      |
|--------------|:------------------:|----------|------------------------------|
| title        | :white_check_mark: | string   | Sets the display title for the menu |
| font         | :white_check_mark: | string   | Sets the menu font (CSS value) |
| scale        | :white_check_mark: | number   | Sets the menu scale.  Valid options are 1, 2, 3 or 4 |
| color        | :x:                | string   | Sets the menu color (CSS value) |
| focus-color  | :x:                | string   | Sets the focus color (CSS value) |
| border-size  | :x:                | number   | Sets the thickness of the border |
| border-color | :x:                | string   | Sets the color of the border (CSS value) |
| opaquency    | :x:                | number   | Sets the menu opaquency.  Valid range is 0.0 - 1.0 |


## Example
```vue{4}
<wtgui-menu title="Test Menu B" color="yellow" border-color="yellow" :scale="1"
  font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">

<!-- menu items go here -->

</wtgui-menu>
```
