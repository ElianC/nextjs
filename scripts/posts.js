const axios = require('axios')
const mime = require('mime-types')
const fs = require('fs')
const path = require('path')
const slugify = require('slugify')
const Parser = require('rss-parser')
const HTMLParser = require('node-html-parser')
const parser = new Parser()
const imageSize = require('image-size')

const basePath = path.join('posts')
const baseImagePath = path.join('public', 'images', 'posts')

;(async () => {
  const { items: articles } = await parser.parseURL('https://rss.app/feeds/Y0Bwf6s28Q51WlQt.xml')
  checkIfFolderExist(basePath)
  checkIfFolderExist(baseImagePath)

  for (const article of articles) {
    try {
      const HTMLElement = HTMLParser.parse(article.content)
      const contentText = HTMLElement.querySelector('div > div')
      const mediaElement = HTMLElement.querySelector('img, video')

      if (Boolean(mediaElement)) {
        const mediaLink = mediaElement.getAttribute('src')

        const { data: image, headers } = await axios({ url: mediaLink, responseType: 'stream' })

        const imageExtension = mime.extension(headers['content-type'])
        const imagePath = path.join(baseImagePath, `${article.guid}.${imageExtension}`)

        await image.pipe(fs.createWriteStream(imagePath))
        image.on('end', () => {
          console.log('hey')
          const type = headers['content-type'].split('/')[0]

          if (type == 'image') {
            var { height, width } = imageSize(imagePath)
          }

          const mediaInfos = {
            file: `${article.guid}.${imageExtension}`,
            type,
            height,
            width,
          }

          writeArticle(article, contentText, mediaInfos)
        })
        image.on('error', (error) => {
          throw error
        })
      } else {
        writeArticle(article, contentText)
      }
    } catch (error) {
      console.log(error)
      fs.writeFileSync('scripts/error.txt', JSON.stringify(error, null, 4))
    }
  }
})()

function checkIfFolderExist(folder) {
  if (!fs.existsSync(folder)){
    fs.mkdirSync(folder)
  }
}

function writeArticle(article, contentText, mediaInfos) {
  try {
    const slug = slugify(article.title, { strict: true, lower: true })

    fs.writeFileSync(
      path.join(process.cwd(), 'posts', `${article.guid}.json`),
      JSON.stringify({
        slug: slug.slice(0, 50),
        contentText: contentText.innerText,
        ...article,
        mediaInfos,
      },
      null, 4)
    )
  } catch (error) {
    throw error
  }
}