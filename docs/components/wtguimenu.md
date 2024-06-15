# WtguiMenu

## Properties

| Name         | Required           | Type     | Purpose                      |
|--------------|:------------------:|----------|------------------------------|
| title        | :white_check_mark: | string   | Sets the display title for the menu |
| font         | :white_check_mark: | string   | Sets the menu font (CSS value) |
| scale        | :white_check_mark: | number   | Sets the menu scale.  Valid options are `1`, `2`, `3` or `4` |
| color        | :x:                | string   | Sets the menu color (CSS value).  Default is `red` |
| title-color  | :x:                | string   | Sets the title color (CSS value).  Default is `red` |
| focus-color  | :x:                | string   | Sets the focus color (CSS value).  Default is `#646cff` |
| border-size  | :x:                | number   | Sets the thickness of the border.  Default is `8` |
| border-color | :x:                | string   | Sets the color of the border (CSS value).  Default is `red` |
| opaquency    | :x:                | number   | Sets the menu opaquency.  Valid range is `0.0 - 1.0` |

## Example
```vue{4}
<wtgui-menu title="Test Menu B" color="yellow" border-color="yellow" :scale="1"
  font="Inter, system-ui, Avenir, Helvetica, Arial, sans-serif">

<!-- menu items go here -->

</wtgui-menu>
```
