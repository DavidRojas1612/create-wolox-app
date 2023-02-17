import {runCommand} from '../utils/commander.mjs'

async function gitInit(projectName) {
  return runCommand({
    command: ['git', ['init'], {cwd: `${process.cwd()}/${projectName}`}],
    loadingMessage: `Initializing a git repository.`,
    successMessage: `Initialized a git repository.`,
    failureMessage: `git init installation failed.`,
  })
    .then(() =>
      runCommand({
        command: [
          'git',
          ['add', '--all'],
          {cwd: `${process.cwd()}/${projectName}`},
        ],
        loadingMessage: 'Adding all files to commit',
        successMessage: 'All files added successfully',
        failureMessage: 'Files additions has failed',
      }),
    )
    .then(() =>
      runCommand({
        command: [
          'git',
          ['commit', '-m', 'Initial bootstrap commit'],
          {cwd: `${process.cwd()}/${projectName}`},
        ],
        loadingMessage: 'Commiting all files',
        successMessage: 'All files commited successfully',
        failureMessage: 'Files commit has failed',
      }),
    )
}

export {gitInit}
