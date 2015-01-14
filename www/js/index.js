"use strict";

var application = {};

application.app = {

    watchID: null,

    initialize: function() {
        document.addEventListener('deviceready', application.app.onDeviceReady, false);
    },

    onDeviceReady: function() {
        StatusBar.hide();
		FastClick.attach(document.body);
    },

    startWatch: function() {
        if (application.app.watchID == null) {
            options = { frequency : 1000 };
            application.app.watchID =
                navigator.accelerometer.watchAcceleration(application.app.onSuccess,
                                                          application.app.onError,
                                                          options);
        }
    },

    stopWatch: function() {
        $('#accelerometer').html('Detenido');

        if (application.app.watchID !== null) {
            navigator.accelerometer.stopWatch(application.app.watchID);
            application.app.watchID = null;
        }
    },

    onSuccess: function(acceleration) {
        $('#accelerometer').html('Acceleration X: ' + acceleration.x + '<br/>' +
                                 'Acceleration Y: ' + acceleration.y + '<br/>' +
                                 'Acceleration Z: ' + acceleration.z + '<br/>' +
                                 'Timestamp: ' + acceleration.timestamp + '<br/>');
    },

    onError: function() {
        alert('onError!');
    }

};
