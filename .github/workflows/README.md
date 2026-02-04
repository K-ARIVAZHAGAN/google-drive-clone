# GitHub Actions Workflows

This directory contains automated workflows for the Google Drive Clone project.

## Available Workflows

### 1. Fortify Security Scan (`fortify.yml`)

This workflow performs static application security testing (SAST) using Fortify on Demand.

#### Features:
- **Automated Security Scanning**: Runs static analysis on both backend and frontend code
- **Multiple Triggers**:
  - Push to main, master, or develop branches
  - Pull requests targeting main, master, or develop branches
  - Weekly scheduled scan (Sundays at midnight UTC)
  - Manual trigger via workflow_dispatch
- **SARIF Integration**: Results are uploaded to GitHub Security tab
- **Artifact Storage**: Scan logs are preserved for 30 days

#### Setup Requirements:

To use this workflow, you need to configure the following GitHub Secrets:

1. **FOD_URL**: Your Fortify on Demand URL (e.g., `https://ams.fortify.com`)
2. **FOD_TENANT**: Your FoD tenant ID
3. **FOD_USER**: Your FoD API username/client ID
4. **FOD_PASSWORD**: Your FoD API password/client secret
5. **FOD_RELEASE_ID**: The FoD release ID for your application

#### How to Configure Secrets:

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add each of the required secrets listed above

#### Onboarding to Fortify on Demand:

If you haven't onboarded your application to Fortify on Demand yet:

1. Sign up for Fortify on Demand at [https://www.microfocus.com/en-us/cyberres/application-security/fortify-on-demand](https://www.microfocus.com/en-us/cyberres/application-security/fortify-on-demand)
2. Create a new application in the FoD portal
3. Create a release for your application
4. Generate API credentials (Client ID and Secret)
5. Note down your Release ID and API credentials
6. Configure the GitHub secrets as described above

#### Disabling the Workflow:

If you're not using Fortify on Demand, you can:
- Delete the `fortify.yml` file
- Or rename it to `fortify.yml.disabled` to keep it for future reference

### 2. Node.js Package (`npm-publish.yml`)

This workflow publishes the package to npm when a release is created.

#### Triggers:
- GitHub release creation

#### Requirements:
- `npm_token` secret must be configured for npm authentication
