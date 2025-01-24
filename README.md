[![devnet-bundle-snapshot](https://github.com/conterra/mapapps-daylight/actions/workflows/devnet-bundle-snapshot.yml/badge.svg)](https://github.com/conterra/mapapps-daylight/actions/workflows/devnet-bundle-snapshot.yml)
![Static Badge](https://img.shields.io/badge/tested_for_map.apps-4.19.0-%20?labelColor=%233E464F&color=%232FC050)
# Daylight

This bundle enables the user to display the effect of light of certain time of day. Additionally, the shadow of 3D-Objects can be simulated.

![Screenshot App](https://github.com/conterra/mapapps-daylight/blob/main/screenshot.PNG)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_daylight/index.html

## Installation Guide

**Restrictions: Only works in 3D view**

[dn_daylight Documentation](https://github.com/conterra/mapapps-daylight/tree/master/src/main/js/bundles/dn_daylight)

## Quick start

Clone this project and ensure that you have all required dependencies installed correctly (see [Documentation](https://docs.conterra.de/en/mapapps/latest/developersguide/getting-started/set-up-development-environment.html)).

Then run the following commands from the project root directory to start a local development server:

```bash
# install all required node modules
$ mvn initialize

# start dev server
$ mvn compile -Denv=dev -Pinclude-mapapps-deps

# run unit tests
$ mvn test -P run-js-tests,include-mapapps-deps
```
