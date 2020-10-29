/*
 * Copyright (C) 2020 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import Daylight from "esri/widgets/Daylight";

const _daylightWidget = Symbol("_daylightWidget");
const _initialEnvironment = Symbol("_initialEnvironment");

export default class DaylightWidgetFactory {

    activate() {
        this._getView().then((view) => {
            this[_initialEnvironment] = view.environment;
        });
    }

    deactivate() {
        this._resetEnvironment();
        this._destroyWidget();
    }

    onToolActivated() {
        this._getView().then((view) => {
            view.environment = {
                atmosphere: {
                    // creates a realistic view of the atmosphere
                    quality: "high"
                },
                lighting: {
                    // gets the current date at the user's location
                    // and converts it to the local date in Brest, France
                    date: new Date()
                }
            };
        });
    }

    onToolDeactivated() {
        this._resetEnvironment();
    }

    getWidget() {
        const daylightProperties = this.getDaylightWidgetProperties();
        return this[_daylightWidget] = new Daylight(daylightProperties);
    }

    _destroyWidget() {
        this[_daylightWidget].destroy();
        this[_daylightWidget] = undefined;
    }

    getDaylightWidgetProperties() {
        const properties = this._properties;
        const daylightProperties = {
            dateOrSeason: properties.dateOrSeason,
            mode: properties.mode,
            playSpeedMultiplier: properties.playSpeedMultiplier,
            visibleElements: properties.visibleElements
        };
        const timeSliderSteps = properties.timeSliderSteps;
        if (timeSliderSteps) {
            daylightProperties.timeSliderSteps = timeSliderSteps;
        }
        return daylightProperties;
    }

    _getView() {
        const mapWidgetModel = this._mapWidgetModel;
        return new Promise((resolve, reject) => {
            if (mapWidgetModel.view) {
                resolve(mapWidgetModel.view);
            } else {
                mapWidgetModel.watch("view", ({value: view}) => {
                    resolve(view);
                });
            }
        });
    }

    _resetEnvironment() {
        this._getView().then((view) => {
            view.environment = this[_initialEnvironment];
        })
    }
}
