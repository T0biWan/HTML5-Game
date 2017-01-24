(function () {
    window.addEventListener("load", function() {
        // Variablen initialisieren
        var tickRate = 100;
        var gravity = 1;
        var keys = (function() {
            var binding = {left: 37, right: 39, up: 38, down: 40};
            var pressed = {};

            var codes = Object.values(binding);
            for (var i = 0; i < codes.length; i++) {
                pressed[codes[i]] = false;
            }

            return {
                binding: binding,
                pressed: pressed
            };
        })();
        var field = (function () {
            var image = new Image();
            image.src = "media/images/background.png";

            return {
                canvas: document.getElementById("field").getContext("2d"),
                dimensions: {width: image.width, height: image.height}
            };
        })();
        var planet = (function () {
            var image = new Image();
            image.src = "media/images/planet.png";

            return {
                image: image,
                position: {x: 0, y: 300},
                dimensions: {width: image.width, height: image.height}
            };
        })();
        var player = (function () {
            var image = new Image();
            image.src = "media/images/player.png";

            return {
                image: image,
                position: {x: field.dimensions.width/2, y: field.dimensions.height/2},
                dimensions: {width: image.width, height: image.height},
                maxSpeed: 10,
                acceleration: 5,
                resistance: 1,
                xMotion: 0,
                yMotion: 0
            };
        })();
        var intervall = window.setInterval(loop, tickRate);

        // Event Listener für Tastendruck
        document.addEventListener("keydown", function (event) {
            if(event.keyCode in keys.pressed) keys.pressed[event.keyCode] = true;
        });

        document.addEventListener("keyup", function (event) {
            if(event.keyCode in keys.pressed) keys.pressed[event.keyCode] = false;
        });

        // Motion calculation
        function playerMotion() {
            if(keys.pressed[keys.binding.left] && player.xMotion < player.maxSpeed) player.xMotion += player.acceleration;
            if(keys.pressed[keys.binding.right] && player.xMotion > -player.maxSpeed) player.xMotion -= player.acceleration;
            if(keys.pressed[keys.binding.down] && player.yMotion > -player.maxSpeed) player.yMotion -= player.acceleration;
            if(keys.pressed[keys.binding.up] && player.yMotion < player.maxSpeed) player.yMotion += player.acceleration;

            if(player.xMotion > 0) player.xMotion -= player.resistance;
            if(player.xMotion < 0) player.xMotion += player.resistance;
            if(player.yMotion > 0) player.yMotion -= player.resistance;
            if(player.yMotion < 0) player.yMotion += player.resistance;

            if(playerIsAbovePlanet() && player.yMotion > -gravity) player.yMotion -= gravity;

            teleportPlayerFromSideToSide();
            if(playerCollidesUp()) player.position.y = 0;
            if(playerCollidesDown()) player.position.y = field.dimensions.height - player.dimensions.height;

            player.position.x -= player.xMotion;
            player.position.y -= player.yMotion;
        }

        // Collision detection
        function playerIsAbovePlanet() {
            return player.position.y + player.dimensions.height < planet.dimensions.height;
        }

        function playerIsInsideField() {
            return player.position.y > 0 && player.position.y + player.dimensions.height < field.dimensions.height;
        }

        function teleportPlayerFromSideToSide() {
            if(playerCollidesLeft()) player.position.x = field.dimensions.width - player.dimensions.width;
            if(playerCollidesRight()) player.position.x = 0;
        }

        function playerCollidesLeft() {
            return player.position.x  < 0;
        }

        function playerCollidesRight() {
            return player.position.x + player.dimensions.width > field.dimensions.width;
        }

        function playerCollidesUp() {
            return player.position.y < 0
        }

        function playerCollidesDown() {
            return player.position.y + player.dimensions.height > field.dimensions.height;
        }

        // game loop
        function loop() {
            playerMotion();

            field.canvas.clearRect(0,0,600,600);
            field.canvas.drawImage(planet.image, planet.position.x, planet.position.y);
            field.canvas.drawImage(player.image, player.position.x, player.position.y);
        }
    }, false);
})();

// Kollisionsabfrage verbessern (oben & unten)
// Telleport smoother machen
// Ziel bauen und erkennen wenn getroffen
// Beides direkt in CSS vereinbaren?
// Wenn Ziel nicht getroffen wird => Crash
// Treibstoff einbauen und anzeigen
// playerMotion refactorn
// Allesrefactorn
// Finale Grafiken aussuchen
// Animation machen
// Divs für verschiedene Screens bauen
// CSS