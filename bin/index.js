#! /usr/bin/env node

import * as prompts from '@clack/prompts'
import {setTimeout} from 'node:timers/promises'
import color from 'picocolors'
import {TEMPLATES_URL} from '../lib/constants.mjs'
import {generateProjectApp} from '../lib/generate.mjs'

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
      {value: 'React', label: 'React'},
      {value: 'NextJS', label: 'Next.js'},
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

  await generateProjectApp(projectName, projectType)

  s.stop('Done. Now run:')

  outro(`
    cd ${projectName}
    npm install
    npm run dev
  `)

  await sleep(1000)
}

main().catch(console.error)
