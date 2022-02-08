const fs = require('fs')
const path = require('path')
const cheerio = require('cheerio')

module.exports = class htmlWebpackPlugin {
  constructor (options) {
    this.options = options
  }
  apply(compiler) {
    debugger
    console.log(this)
    compiler.hooks.done.tap(
      'html webpack plugin',
      stats => {
        console.log(this)
        debugger
        const assetsList = Object.keys(stats.compilation.assets)
        const srcripsList = assetsList.map(entry => {
          return `<script src="${entry}"></script>`
        })
        const addPath = this.options.addPath
        const addData = this.options.addData
        const filePath = path.resolve(__dirname, addPath)
        let html = fs.readFileSync(filePath, 'utf8')

        const $ = cheerio.load(html, {
          decodeEntities: false
        })

        $('body').append( srcripsList.join('') )

        html = $.html()

        html = html.replace(/\{\{title\}\}/g, addData.title)
        
        // const template = `
        //   <body>
        //     ${srcripsList.join('')}
        //   </body>
        // `
        // html = html.replace(/\<body\>([\s\S]*)\<\/body\>/g, template)
        const writeFilePath = path.resolve(__dirname, './dist/index.html')
        fs.writeFileSync(writeFilePath, html, 'utf8')
      }
    )
  }
}
