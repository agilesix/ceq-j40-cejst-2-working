# Justice40 Github Actions Workflows

This directory has the github actions workflows for the Justice40 Project.

This project is deployed on an AWS account managed by [GeoPlatform.gov](https://www.geoplatform.gov/), and github actions is used to automate the data pipeline and all deployment steps.

The names of the Github Actions stages in the yaml files should describe what each step does, so it is best to refer there to understand the latest of what everything is doing.

To mitigate the risk of having this README quickly become outdated as the project evolves, avoid documenting anything application or data pipeline specific here. Instead, go back up to the [top level project README](/README.md) and refer to the documentation on those components directly.

## List of Current Workflows

### Check Markdown Links
Runs Linkspector with Reviewdog on pull requests to identify and report on dead hyperlinks within the code.

### CodeQL
Runs Github's CodeQL engine against the code to check for security vulnerabilities.

### Compile Mermaid to MD
Compiles mermaid markdown into images. This action should be deprecated as the action is no longer supported

### Deploy Backend Main
Builds and deploys the backend data pipeline to AWS. This workflow is set to be triggered manually.

### Deploy Frontend Main
Builds and deploys the frontend web client to AWS when changes to the ./client directory are merged into main.

### pages-build-deployment

### Ping Check
Runs a check on the J40 website checking for a return of status 200

### Pull Request Backend
Builds the backend data pipeline when a pull request is opened with changes within the ./data directory 

### Pull Request Frontend
Builds the frontend web client when a pull request is opened with changes within the ./client directory
