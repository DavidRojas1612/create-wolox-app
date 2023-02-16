#! /usr/bin/env node

const prompts = require('@clack/prompts')
const {setTimeout} = require('node:timers/promises')
const color = require('picocolors')
const {generateReactApp} = require('../react-app/generate.js')

const {intro, outro, confirm, select, spinner, isCancel, cancel, text} = prompts
const sleep = setTimeout

async function main() {
  intro(color.inverse(' create-my-wolox-app '))

  const projectName = await text({
    message: 'What is your project named?',
    placeholder: 'my-app',
  })

  if (isCancel(projectName)) {
    cancel('Operation cancelled')
    return process.exit(0)
  }

  const projectType = await select({
    message: 'Pick a project type.',
    options: [
      {value: 'react', label: 'React'},
      {value: null, label: 'Angular', hint: 'coming soon...'},
      {value: null, label: 'Vue', hint: 'coming soon...'},
    ],
  })

  if (isCancel(projectType)) {
    cancel('Operation cancelled')
    return process.exit(0)
  }

  const s = spinner()
  s.start(`Creating your ${projectType} project`)

  await generateReactApp(projectName)

  s.stop('Done. Now run:')

  outro(`
    cd ${projectName}
    npm install
    npm run dev
  `)

  await sleep(1000)
}

main().catch(console.error)
