import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: './.vitepress/docs/wtgui',
  base: '/docs/wtgui/',
  title: "WTGui Documentation",
  description: "Experimental Vue3 Menu System",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/api-examples' }
    ],

    sidebar: [
      {
        text: 'Navigation',
        items: [
          { text: 'Get Started', link: '/getstarted' },
          {
            text: 'API Documentation',
            link: '/api-documentation',
            items: [ 
              { text: 'WtguiMenu', link: '/components/wtguimenu' },
              { text: 'WTGuiButton', link: '/components/wtguibutton' },
              { text: 'WTGuiInputSetting', link: '/components/wtguiinputsetting' },
              { text: 'WTGuiLabel', link: '/components/wtguilabel' },
              { text: 'WTGuiMessageBox', link: '/components/wtguimessagebox' },
              { text: 'WTGuiSelect', link: '/components/wtguiselect' }
            ]
          },
          { text: 'Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wtfsystems/wtgui' }
    ]
  }
})
