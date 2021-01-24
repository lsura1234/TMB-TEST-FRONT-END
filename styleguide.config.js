const path = require('path')

const getComponentName = componentPath => {
  const dir = path.dirname(componentPath)
  const arrDir = dir.split('/')
  const name = arrDir[arrDir.length - 1]
  return name
}

module.exports = {
  require: [
    'glud-component/build/style.css',
    '@fortawesome/fontawesome-free/css/all.min.css'
  ],
  getComponentPathLine(componentPath) {
    const name = getComponentName(componentPath)
    if (name === 'components') return ''
    return `import ${name} from '../components/${name}'`
  }
}
