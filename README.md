##  WTGUI

###  WIP

Experimental HTML5 Canvas Menu System

- *GitHub Repository*:  https://github.com/wtfsystems/wtgui
- *NPM Package*:  https://www.npmjs.com/package/@wtfsystems/wtgui
- *API Reference*:  https://www.wtfsystems.net/docs/wtgui/

-----

### Example
https://github.com/wtfsystems/wtgui_example

-----

###  Install

```
npm i @wtfsystems/wtgui
```

Include module:
```
import { WTGui } from '@wtfsystems/wtgui'
```

Include CommonJS:
```
const { WtGui } = require('@wtfsystems/wtgui')
```

-----

###  Configuration

```
WtGui.settings.width = 1024
WtGui.settings.height = 768
WtGui.actions.drawFps(true)
```

-----

###  Building Menus

```
WtGui.addMenu()
WtGui.addItem()
```

-----

###  Starting the Renderer

```
WtGui.startGui(HTMLCanvasElement)
```
