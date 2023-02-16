import degit from 'degit'
import path from 'path'

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

export {generateReactApp}
