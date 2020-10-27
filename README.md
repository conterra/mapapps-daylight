# Daylight
This bundle enables the user to display the effect of light of certain time of day. Additionally, the shadow of 3D-Objects can be simulated.
![Screenshot App](https://github.com/conterra/mapapps-daylight/blob/master/screenshot.PNG)

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_daylight/index.html

## Installation Guide
**Requirement: map.apps 4.9.0**
**Restrictions: Only works in 3D view**

### Configurable Components of dn_daylight:
#### Config:
``` 
dn_daylight": {
   "Config": {
        "timeSliderSteps": null,
        "playSpeed": 2,
        "dateOrSeason": "date",
        "visibleElements": {
              "playButtons": true,
              "shadowsToggle": true,
              "datePicker": true,
              "timezone": false
        }
   }
}
```

##### Properties

 | Property                       | Type    | Possible Values      | Default               | Description                                                            |
 |--------------------------------|---------|----------------------|-----------------------|------------------------------------------------------------------------|
 | dateOrSeason                   | String  | "date"/"season"      | "date"                | Controls whether the widget displays a date or a season picker.        |
 | playSpeed                      | Number  |                      | 2                 | Controls the speed of the daytime and date animation.                  |
 | timeSliderSteps                | Number or Number[]  |          |                       | Sets steps, or intervals, on the time slider                           |
 | visibleElements: {             |         |                      |                       | This property provides the ability to display or hide the individual elements of the widget. | 
 |          playButtons           | Boolean | true/false           | true                  |                                                                        |
 |          shadowsToggle         | Boolean | true/false           | true                  |                                                                        |
 |          datePicker            | Boolean | true/false           | true                  |                                                                        |
 |          timezone              | Boolean | true/false           | false                 |                                                                        |
 |                  }             |         |                      |                       |                                                                        |                                           |


For more information concerning the properties refer to the documentation of the esri widget: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Daylight.html
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
