(function () {
    window.addEventListener("load", function() {
        // Variablen initialisieren
        var tickRate = 100;
        var keyBinding = {left: 37, rigt: 39, up: 38, down: 40};
        var gravity = 1;
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
                acceleration: 3,
                resistance: 1,
                speed: 0
            };
        })();

        var intervall = window.setInterval(loop, tickRate);

        // Event Listener für Tastendruck
        document.addEventListener("keypress", function (event) {
            switch(event.keyCode) {
                case keyBinding.left:
                    break;
                case keyBinding.rigt:
                    break;
                case keyBinding.down:
                    break;
                case keyBinding.up:
                    if(player.speed < player.maxSpeed) player.speed += player.acceleration;
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
            //player.speed -= gravity;
            //player.position.y -= player.speed;
            //console.log(player.speed - gravity);
            // if(player.speed > -gravity) player.speed -= gravity;
            // player.position.y -= player.speed;


            //if(player.speed > -gravity) player.speed -= gravity; // Gravity effects
            if(player.speed > 0) player.speed -= player.resistance; // Resistance stops accerleration

            player.position.y -= player.speed;

            field.canvas.clearRect(0,0,600,600);
            field.canvas.drawImage(planet.image, planet.position.x, planet.position.y);
            field.canvas.drawImage(player.image, player.position.x, player.position.y);
        }
    }, false);
})();
