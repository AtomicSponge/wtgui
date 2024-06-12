import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  outDir: './.vitepress/docs/wtgui',
  base: '/docs/wtgui/',
  title: "WTGui Documentation",
  description: "Experimental Vue Menu System",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/api-examples' }
    ],

    sidebar: [
      {
        text: 'Examples',
        items: [
          { text: 'Get Started', link: '/getstarted' },
          { text: 'API Documentation', link: '/api-documentation' },
          { text: 'Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/wtfsystems/wtgui' }
    ]
  }
})