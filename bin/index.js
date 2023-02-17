#! /usr/bin/env node

import * as prompts from '@clack/prompts'
import {setTimeout} from 'node:timers/promises'
import color from 'picocolors'
import {generateProjectApp} from '../lib/generate.mjs'
import {gitInit} from '../lib/initGit.mjs'
import {npmInstall} from '../lib/installDeps.mjs'

const {intro, outro, confirm, select, spinner, isCancel, cancel, text, note} =
  prompts
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
      {value: 'React', label: 'React'},
      // {value: 'NextJS', label: 'Next.js'}, // to fix
      {value: 'Angular/base', label: 'Angular'},
      // {value: null, label: 'Vue', hint: 'coming soon...'},
    ],
  })

  if (isCancel(projectType)) {
    cancel('Operation cancelled')
    return process.exit(0)
  }

  try {
    const s = spinner()
    s.start(`Creating your ${projectType} project`)
    await generateProjectApp(projectName, projectType)
    s.stop(`${projectName} project has been created!!`)

    s.start(`Installing dependencies...`)
    await npmInstall(projectName, 'dependencies')
    s.stop(`${projectName} Ready!!`)

    s.start(`Initializing a git repository.`)
    await gitInit(projectName)
    s.stop('Initialized a git repository.')
  } catch (error) {
    console.log('error', error)
    cancel('Operation cancelled')
    return process.exit(0)
  }

  outro(`
    cd ${projectName}
    npm run dev
  `)

  await sleep(1000)
}

main().catch(console.error)
