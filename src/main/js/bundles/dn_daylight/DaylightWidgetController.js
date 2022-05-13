/*
 * Copyright (C) 2022 con terra GmbH (info@conterra.de)
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

export default class DaylightWidgetController {

    #initialEnvironment = null;

    activate() {
        this._getView().then((view) => {
            this.#initialEnvironment = view.environment;
        });
    }

    deactivate() {
        this._resetEnvironment();
    }

    onToolActivated() {
        const properties = this._properties;

        this._getView().then((view) => {
            view.environment = {
                atmosphere: {
                    quality: "high"
                },
                lighting: {
                    date: new Date(),
                    directShadowsEnabled: properties.enableShadows
                }
            };
        });
    }

    onToolDeactivated() {
        this._resetEnvironment();
    }

    getDaylightWidgetProperties() {
        const properties = this._properties;
        const daylightProperties = {
            dateOrSeason: properties.dateOrSeason,
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
                const watcher = mapWidgetModel.watch("view", ({value: view}) => {
                    watcher.remove();
                    resolve(view);
                });
            }
        });
    }

    _resetEnvironment() {
        this._getView().then((view) => {
            view.environment = this.#initialEnvironment;
        });
    }
}
