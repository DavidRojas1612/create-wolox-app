import degit from 'degit'

async function generateProjectApp(projectName, projectTemplate) {
  const PATH_PROJECT = `./${projectName}`
  const emitter = degit(
    `Wolox/wolox-frontend-templates.git/${projectTemplate}#main`,
    {
      cache: false,
      force: true,
      verbose: true,
    },
  )

  return emitter.clone(PATH_PROJECT)
}

export {generateProjectApp}
