import {runCommand} from '../utils/commander.mjs'

function npmInstall(projectName, title) {
  return runCommand({
    command: ['npm', ['install'], {cwd: `${process.cwd()}/${projectName}`}],
    loadingMessage: `Installing ${title}`,
    successMessage: `${title} ready!`,
    failureMessage: `${title} installation failed. Turn verbose mode on for detailed logging`,
  })
}

export {npmInstall}
