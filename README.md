# Daylight

This bundle enables the user to display the effect of light of certain time of day. Additionally, the shadow of 3D-Objects can be simulated.

![Screenshot App](https://github.com/conterra/mapapps-daylight/blob/master/screenshot.PNG)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_daylight/index.html

## Installation Guide
**Requirement: map.apps 4.9.0**

**Restrictions: Only works in 3D view**

[dn_daylight Documentation](https://github.com/conterra/mapapps-daylight/tree/master/src/main/js/bundles/dn_daylight)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
`mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
Change the mapapps.remote.base in the build.properties file and run:
`mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
