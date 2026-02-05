# GitHub Actions Workflows

This directory contains automated workflows for the Google Drive Clone project.

## Available Workflows

### Node.js Package (`npm-publish.yml`)

This workflow publishes the package to npm when a release is created.

#### Triggers:
- GitHub release creation

#### Requirements:
- `npm_token` secret must be configured for npm authentication
