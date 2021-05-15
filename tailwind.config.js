module.exports = {
    theme:{
        variants:{
            extend:{
                backgroundColor:['active','group-focus']
            }
        },
        borderWidth: {
            '0':'0px',
            '1':'1px'
        },    
        extend:{
            colors:{
                "site":"#101A23",
                "text-card":"#f1f1f1f1",
                "header":"#1B2631"
            }
        }
    },
    purge: {
        enabled: process.env.NODE_ENV === 'production',
        content: [
          'components/**/*.vue',
          'layouts/**/*.vue',
          'pages/**/*.vue',
          'plugins/**/*.js',
          'nuxt.config.js',
          // TypeScript
          'plugins/**/*.ts',
          'nuxt.config.ts'
        ]
      },
}