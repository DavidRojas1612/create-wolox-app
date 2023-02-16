import {runCommand} from '../utils/commander.mjs'

function gitInit(projectName) {
  return runCommand({
    command: ['git', ['init'], {cwd: `${process.cwd()}/${projectName}`}],
    loadingMessage: `Initializing a git repository.`,
    successMessage: `Initialized a git repository.`,
    failureMessage: `git init installation failed.`,
  })
}

export {gitInit}
