# dn_daylight

This bundle enables the user to display the effect of light of certain time of day. Additionally, the shadow of 3D-Objects can be simulated.

## Usage

Simply add the bundle "dn_daylight" to your app.

To make the functions of this bundle available to the user, the following tool can be added to a toolset:

| Tool ID                | Component              | Description              |
| ---------------------- | ---------------------- | ------------------------ |
| daylightToggleTool     | DaylightToggleTool     | Show or hide the widget. |

## Configuration Reference

``` json
"dn_daylight": {
    "Config": {
        "timeSliderSteps": 5,
        "playSpeedMultiplier": 1,
        "dateOrSeason": "date",
        "enableShadows": true,
        "visibleElements": {
             "playButtons": true,
             "shadowsToggle": true,
             "datePicker": true,
             "timezone": false
        }
    }
}
```

For more information concerning the properties refer to the documentation of the esri widget: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Daylight.html

| Property                       | Type                | Possible Values                | Default               | Description                                                                                                                                                                                                             |
|--------------------------------|---------------------|--------------------------------|-----------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| dateOrSeason                   | String              | ```date``` &#124; ```season``` | ```date```            | Controls whether the widget displays a date or a season picker.                                                                                                                                                         |
| enableShadows                  | Boolean             | ```true``` &#124; ```false```  | ```true```            | Controls whether the shadows are enabled on startup.                                                                                                                                                                    |
| playSpeedMultiplier            | Number              |                                | 1                     | Controls the speed of the daytime and date animation.                                                                                                                                                                   |
| timeSliderSteps                | Number or Number[]  |                                | 5                     | Sets steps, or intervals, on the time slider to restrict the times of the day that can be selected when dragging the thumb.                                                                                             |
| visibleElements                | Object              |                                |                       | This property provides the ability to display or hide the individual elements of the widget. More information: https://developers.arcgis.com/javascript/latest/api-reference/esri-widgets-Daylight.html#visibleElements |
