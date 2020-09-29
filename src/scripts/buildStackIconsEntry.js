const fs = require('fs')
const path = require('path')

const buildDataObjectString = (obj) => (`const ${obj.name} = {\n  name: '${obj.name}',\n  svg: \`${obj.svg}\`,\n  test: (value) => new RegExp('${obj.test}').test(value)\n}\n`)
const buildTestRegex = (name = '', alias = []) => (new RegExp(alias.reduce((prev, aliasItem) => prev + '|' + aliasItem, name)))
const buildObjectsExportString = (dataArray) => (`export default {\n  ${dataArray.map(obj => obj.name).join(',\n  ')}\n}`)

const buildDataObjects = (dataArray) => dataArray.map(buildDataObjectString).join('\n')
const buildDataArray = (files) => files.map((fileName) => {
  const { name, alias, svg } = require(path.resolve(iconsPath, fileName))

  return { name, svg, test: buildTestRegex(name, alias).source }
})

const iconsPath = path.resolve(__dirname, '../stackIcons')
const files = fs.readdirSync(iconsPath)
  .filter((fileName) => fileName !== 'index.js')

const dataArray = buildDataArray(files)
const entryPointCode = `${buildDataObjects(dataArray)}\n${buildObjectsExportString(dataArray)}\n`
const outputFilePath = path.join(iconsPath, 'index.js')

fs.writeFileSync(outputFilePath, entryPointCode, { encoding: 'utf8' })

process.exit(0)
