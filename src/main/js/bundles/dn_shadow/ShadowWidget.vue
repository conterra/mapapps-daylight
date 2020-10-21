<!--

    Copyright (C) 2019 con terra GmbH (info@conterra.de)

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

            http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.

-->
<template>
    <v-container
        class="pa-1">
        <v-slider
            dense
            :label=timeoutput
            v-bind:max=1440
            v-model="timehour"
            prepend-icon ="icon-time-clock"
            :append-icon="sliderplaybutton ? 'icon-stop': 'icon-play'"
            @click:append="$emit('sliderplay')">
        </v-slider>

        <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
        >
            <template v-slot:activator="{ on }">
                <v-text-field
                    v-model="pickershadowdate"
                    label="YYYY-MM-DD"
                    prepend-icon="event"
                    readonly
                    v-on="on"
                    :append-icon="dateplaybutton ? 'icon-stop': 'icon-play'"
                    @click:append="$emit('dateplay')"
                ></v-text-field>
            </template>
            <v-date-picker v-model="pickershadowdate" @input="menu2 = false" @change="$emit('shadowdatechange')"
            ></v-date-picker>
        </v-menu>

        <v-checkbox
            class="ma-0 pa-0"
            color="primary"
            v-model="checkbox"
            :label="`Show shadow`"
            @change="$emit('shadowswitch')">
        </v-checkbox>
        <v-select
            class="ma-0 pa-0"
            :items="times"
            label="Time of day"
            outlined
            v-model="selected"
            @change="$emit('timechange')">
            <option v-for="time in times" v-bind:value="time.value">
                {{ time.text }}
            </option>
        </v-select>
    </v-container>
</template>
<script>

    export default {
        data: function () {
            let today = new Date();
            return {
                i18n: {
                    type: Object,
                    default: function () {
                        return {}
                    }
                },
                menu2: false,
                timehour: parseInt(today.getHours()) * 60 + today.getMinutes(),
                timeoutput: today.getHours() + ":" + today.getMinutes(),
                pickershadowdate: today.getFullYear() + '-0' + (today.getMonth() + 1) + '-' + today.getDate(),
                checkbox: true,
                selected: "",
                times: [],
                sliderplaybutton: false,
                dateplaybutton: false
            }
        },
        watch: {
            timehour: function (newVal) {
                this.$emit('shadowsliderchange', newVal);
            },
            pickershadowdate: function (newVal) {
                this.$emit('shadowdatechange', newVal);
            }
        },
    };
</script>
