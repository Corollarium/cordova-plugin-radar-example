/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
	// Application Constructor
	initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
	},

	onDeviceReady: function() {
		cordova.plugins.radar.initialize('INSERTYOURKEYHERE');
		cordova.plugins.radar.onEvents(app.onRadarEvents);
		cordova.plugins.radar.onError(app.onRadarErrors);
		cordova.plugins.radar.setUserId('1');
		cordova.plugins.radar.setDescription('User test');
		cordova.plugins.radar.startTracking();

		var form = document.getElementById('form-location');
		if (form.attachEvent) {
			form.attachEvent("submit", app.processLocation);
		} else {
			form.addEventListener("submit", app.processLocation);
		}
	},

	processLocation: function(e) {
		e.preventDefault();
		cordova.plugins.radar.updateLocation(
			{
				latitude: document.getElementById('latitude').value,
				longitude: document.getElementById('longitude').value,
				accuracy: document.getElementById('accuracy').value
			},
			(data) => {
				console.log(data)
			}
		);
		return false;
	},

	onRadarEvents: function(events, user) {
		console.log(events, user);
	},

	onRadarErrors: function(err) {
		console.error(err);
	}

};

app.initialize();
