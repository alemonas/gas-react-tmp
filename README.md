# README

# BEON's Referral Program Web App

This is a Google Script Web App template project that uses React.js to generate the code for Beon's referral program. It leverages Google Clasp and Parcel for development and deployment.

## Table of Contents

-   [Introduction](#introduction)
-   [Features](#features)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Run](#run)
-   [Deployment](#deployment)
-   [Contributing](#contributing)

## Introduction

This project is designed to create a Google Script Web App that integrates with their referral program. It utilizes React.js, Google Clasp, and Parcel to streamline development and deployment processes. This template provides a starting point with a basic project structure and essential configurations.

## Features

-   React.js integration for building dynamic user interfaces.
-   Integration with Google Script to create a Google Script Web App.
-   Use of Google Clasp to manage and deploy the project to Google Drive.
-   Utilizes Parcel as the build tool for bundling and asset management.

## Prerequisites

Before using this template project, ensure you have the following prerequisites installed on your machine:

-   Node.js (v16 or higher)
-   npm (Node Package Manager)
-   Google Clasp CLI (https://github.com/google/clasp)

## Installation

Clone the repository:

```shell
git clone git@github.com:BEON-Tech/referral-program.git
```

Install dependencies:

```shell
yarn install
```

## Run

Ask for the next environment variables:

```env
GENERATE_SOURCEMAP=false
BEON_API_URL=""
BEON_PLATFORM_URL=""
EXTERNAL_API_KEY=""
```

Run the app:

```shell
yarn dev
```

## Deployment

```
NOTE: To run the following steps you must have permission/access to the Google Apps Script,
in case you don't have access, please contact the team
```

To deploy your Google Script Web App, you need to use Google Clasp:

Authenticate with Google by running the following command and following the instructions:

```shell
yarn glogin
```

Build the app (using parcel):

```shell
yarn build
```

Push the changes to the Google Scripts Web App:

```shell
yarn gpush
```

Open the Google Script app:

```shell
yarn gopen
```

And follow the next guides to deploy and test a web app deployment in Google Script:

[deploy a script](https://developers.google.com/apps-script/guides/web#deploy_a_script_as_a_web_app)
[test a web app deploy](https://developers.google.com/apps-script/guides/web#test_a_web_app_deployment)

```note
NOTE: There is another way to run the google script remotely, but involves some additional steps to do so https://github.com/google/clasp#run
```

## Embed Web App on Google internal site

1. Open the Sites page where you'd like to add the web app.
2. Select Insert > Embed URL.
3. Paste in the web app URL and then click ADD.

more info: https://developers.google.com/apps-script/guides/web#embed_your_web_app_in

## Contributing

To contribute, please follow these steps:

1. Clone the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes.
4. Push your changes.
5. Submit a pull request to the `main` branch of the original repository.
