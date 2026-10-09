const fs = require( 'fs' )
const path = require( 'path' )
const xmlbuilder = require( 'xmlbuilder' )

// 網站完整網址（不含結尾斜線），由環境變數 SITE_URL 帶入，預設為本地開發網址
const BASE_URL = ( process.env.SITE_URL || 'http://localhost:3000' ).replace( /\/+$/ , '' )
const ROOT_FOLDER = './.output/public'
const CUSTOMIZE_PAGES_ATTR = [
  {
    path: '',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/en',
    changefreq: 'weekly',
    priority: '1.0',
  },
  {
    path: '/blog',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: '/en/blog',
    changefreq: 'weekly',
    priority: '0.8',
  },
  {
    path: '/200',
    changefreq: 'never',
    priority: '0.0',
  },
  {
    path: '/404',
    changefreq: 'never',
    priority: '0.0',
  },
]


function collectHtmlFiles( dir , filesList = [] ) {
  const files = fs.readdirSync( dir )

  files.map( file => {
    const filePath = path.join( dir , file )
    const fileStat = fs.statSync( filePath )

    // is folder
    if( fileStat.isDirectory() ) {
      collectHtmlFiles( filePath , filesList )
    }
    // is html
    else if( path.extname( file ) === '.html' ) {
      filesList.push( filePath )
    }
  })
  return filesList
}

// create xml
console.log( 'Create xml...' )
const xml = xmlbuilder.create( 'urlset' , { version: '1.0', encoding: 'UTF-8' })
  .att( 'xmlns' , 'http://www.sitemaps.org/schemas/sitemap/0.9' )

// get all html
console.log( 'Get all html file...' )
const htmlFiles = collectHtmlFiles( ROOT_FOLDER )

// write xml
console.log( 'Wriet xml...' )
htmlFiles.map( htmlFile => {

  const url = ( BASE_URL + '/' + path.relative( ROOT_FOLDER , htmlFile ) )
    .replace( '/index.html' , '' )
    .replace( '.html' , '' )

  const useCustomize = CUSTOMIZE_PAGES_ATTR.find( ({ path }) => ( BASE_URL + path ) === url )

  // use customize page attribute
  if( useCustomize ) {
    const { changefreq , priority } = useCustomize
    xml.ele( 'url' )
      .ele( 'loc' , url ).up()
      .ele( 'changefreq' , changefreq ).up()
      .ele( 'priority' , priority )
  }
  // use defaulte attribute
  else {
    xml.ele( 'url' )
      .ele( 'loc' , url ).up()
      .ele( 'changefreq' , 'monthly' ).up()
      .ele( 'priority' , '0.5' )
  }
})

// xml end
const sitemapXml = xml.end({ pretty: false })

// generate xml
console.log( `Generate 'sitemap.xml'...` )
fs.writeFile( path.join( ROOT_FOLDER , 'sitemap.xml' ) , sitemapXml , 'utf8' , error => {
  if( error ) {
    console.error( error )
  }
  else {
    console.log( '\x1b[32m%s\x1b[0m' , `'sitemap.xml' is generate !` )
  }
})


// 展示用 DEMO 網站：頁面已設定 noindex，不在 robots.txt 宣告 sitemap
// 注意：不要改成 `Disallow: /`，否則爬蟲讀不到頁面上的 noindex，網址仍可能被收錄
const robotsTxtContent = (
`User-Agent: *
Disallow:`
)

// generate robots.txt
console.log( `Generate 'robots.txt'...` )
fs.writeFile( path.join( ROOT_FOLDER , 'robots.txt' ) , robotsTxtContent , 'utf8' , error => {
  if( error ) {
    console.error( error )
  }
  else {
    console.log( '\x1b[32m%s\x1b[0m' , `'robots.txt' is generate !` )
  }
})