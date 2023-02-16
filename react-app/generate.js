const degit = require('degit')

const TEMPLATE_REACT_APP = 'Wolox/react-wolox-template.git#main'

async function generateReactApp(projectName) {
  const PATH_PROJECT = `./${projectName}`
  const emitter = degit(TEMPLATE_REACT_APP, {
    cache: false,
    force: true,
    verbose: true,
  })

  return emitter.clone(PATH_PROJECT)
}

module.export = {generateReactApp}
