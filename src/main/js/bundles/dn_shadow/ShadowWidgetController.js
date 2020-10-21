/*
 * Copyright (C) 2019 con terra GmbH (info@conterra.de)
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
import Shadow from "esri/widgets/Daylight";
import moment from "moment";

const _shadowWidget = Symbol("_shadowWidget");
const _initialEnvironment = Symbol("_initialEnvironment");

export default class ShadowWidgetFactory {

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
            if (this._properties.playOnStartup) {
                this[_shadowWidget].play();
            }
        });
    }

    onToolDeactivated() {
        this[_shadowWidget].stop();
        this._resetEnvironment();
    }

    getWidget() {
        const shadowProperties = this.getShadowWidgetProperties();
        return this[_shadowWidget] = new Shadow(shadowProperties);
    }

    _destroyWidget() {
        this[_shadowWidget].destroy();
        this[_shadowWidget] = undefined;
    }

    getShadowWidgetProperties() {
        const properties = this._properties;
        const shadowProperties = {
            dateOrSeason: properties.dateOrSeason,
            mode: properties.mode,
            playSpeedMultiplier: properties.playSpeed,
            visibleElements: properties.visibleElements
        };
        const timeSliderSteps = this._getTimeSliderSteps();
        if (timeSliderSteps) {
            shadowProperties.timeSliderSteps = timeSliderSteps;
        }
        return shadowProperties;
    }


    _getTimeSliderSteps() {
        const properties = this._properties;
        const stepsProperties = properties.timeSliderSteps;
        let timeSliderSteps = null;
        if (stepsProperties) {
            if (stepsProperties.dates) {
                timeSliderSteps = {};
                timeSliderSteps.dates = stepsProperties.map((dateString) => moment(dateString).toDate());
            } else if (stepsProperties.moment) {
                timeSliderSteps = {};
                const dates = [];
                let momentObj = moment();
                stepsProperties.moment.forEach((timeStop) => {
                    if (!timeStop) {
                        // do nothing
                    } else if (typeof timeStop === 'string') {
                        momentObj = moment(timeStop);
                    } else if (Array.isArray(timeStop)) {
                        timeStop.forEach((time) => {
                            momentObj[time.method].apply(momentObj, time.args);
                        });
                    } else {
                        momentObj[timeStop.method].apply(momentObj, timeStop.args);
                    }
                    dates.push(momentObj.toDate());
                });
                timeSliderSteps.dates = dates;
            } else {
                if (stepsProperties.count) {
                    timeSliderSteps = {};
                    const defaultStopCount = 10;
                    timeSliderSteps.count = stepsProperties.count || defaultStopCount;
                } else if (stepsProperties.interval) {
                    timeSliderSteps = {};
                    timeSliderSteps.interval = {
                        value: stepsProperties.interval.value || 1,
                        unit: stepsProperties.interval.unit || "years"
                    }
                }
                if (stepsProperties.timeExtent && timeSliderSteps) {
                    let start = null;
                    let end = null;
                    if (stepsProperties.timeExtent.start) {
                        start = moment(stepsProperties.timeExtent.start);
                    }
                    if (stepsProperties.timeExtent.end) {
                        end = moment(stepsProperties.timeExtent.end);
                    }
                    if (start && end) {
                        timeSliderSteps.timeExtent = {
                            start: start.toDate(),
                            end: end.toDate()
                        }
                    }
                }
            }
        }
        return timeSliderSteps;
    }

    _getDate(config) {
        return moment(config).toDate();
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
