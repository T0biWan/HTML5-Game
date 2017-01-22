(function () {
    window.addEventListener("load", function() {
        // Variablen initialisieren
        var tickRate = 100;
        var keyBinding = {left: 37, rigt: 39, up: 40, down: 38};
        var gravity = -3;
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
                position: {x: 300, y: 50},
                dimensions: {width: image.width, height: image.height},
                speed: 5
            };
        })();
        var intervall = window.setInterval(loop, tickRate);

        // Event Listener für Tastendruck
        document.addEventListener("keypress", function (event) {
            switch(event.keyCode) {
                case keyBinding.left:
                    player.position.x -= player.speed;
                    //loop();
                    break;
                case keyBinding.rigt:
                    player.position.x += player.speed;
                    //loop();
                    break;
                case keyBinding.down:
                    player.position.y -= player.speed;
                    //loop();
                    break;
                case keyBinding.up:
                    player.position.y += player.speed;
                    //loop();
                    break;

                break;
            }
        });

        // Schwerkraft
        function gravityEffect() {
            if(player.position.y < planet.dimensions.height - player.dimensions.height) {
                player.position.y -= gravity;
            }
        }

        // game loop
        function loop() {
            //gravityEffect();
            field.canvas.clearRect(0,0,600,600);
            field.canvas.drawImage(planet.image, planet.position.x, planet.position.y);
            field.canvas.drawImage(player.image, player.position.x, player.position.y);
        }
    }, false);
})();
