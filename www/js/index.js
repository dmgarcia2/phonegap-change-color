"use strict";

var watchID = null;

var application = {};

application.app = {

    initialize: function() {
        document.addEventListener('deviceready', application.app.onDeviceReady, false);
    },

    onDeviceReady: function() {
        StatusBar.hide();
		FastClick.attach(document.body);
    },

    startWatch: function() {
        if (watchID == null) {
            var options = { frequency : 250 };
            watchID = navigator.accelerometer.watchAcceleration(application.app.onSuccess,
                                                                application.app.onError,
                                                                options);
        }
    },

    stopWatch: function() {
        $('#accelerometer').html('Detenido');

        if (watchID != null) {
            navigator.accelerometer.clearWatch(watchID);
            watchID = null;
            $('#box1').css("background-color", "#fff");
        }
    },

    onSuccess: function(acceleration) {
        $('#accelerometer').html('Acceleration X: ' + acceleration.x + '<br/>' +
                                 'Acceleration Y: ' + acceleration.y + '<br/>' +
                                 'Acceleration Z: ' + acceleration.z + '<br/>' +
                                 'Timestamp: ' + acceleration.timestamp + '<br/>');
        
        var ax = Math.abs(acceleration.x),
            ay = Math.abs(acceleration.y),
            az = Math.abs(acceleration.z),
            radToDegrees = 180 / Math.PI;

        var tiltX = Math.atan(ax / Math.sqrt(Math.pow(ay, 2) + Math.pow(az, 2))) * radToDegrees,
            tiltY = Math.atan(ay / Math.sqrt(Math.pow(ax, 2) + Math.pow(az, 2))) * radToDegrees,
            tiltZ = Math.atan(Math.sqrt(Math.pow(ay, 2) + Math.pow(ax, 2)) / az) * radToDegrees;
        
        var ratio = 127 / 359,
            red = Math.round(tiltX * ratio) + 168,
            green = Math.round(tiltY * ratio) + 168,
            blue = Math.round(tiltZ * ratio) + 168;

        if (red == 256) {
            red = 128;
        }
        if (green == 256) {
            green = 128;
        }
        if (blue == 256) {
            blue = 128;
        }

        $('#box1').css("background-color", "rgb(" + red + ", " + green + ", " + blue + ")");
    },

    onError: function() {
        alert('onError!');
    }

};
