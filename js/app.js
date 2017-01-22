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
                acceleration: 5,
                resistance: 1,
                xMotion: 0,
                yMotion: 0
            };
        })();

        var intervall = window.setInterval(loop, tickRate);

        // Event Listener für Tastendruck
        document.addEventListener("keydown", function (event) {
            switch(event.keyCode) {
                case keyBinding.left:
                    if(player.xMotion < player.maxSpeed) player.xMotion += player.acceleration;
                    break;
                case keyBinding.rigt:
                    if(player.xMotion > -player.maxSpeed) player.xMotion -= player.acceleration;
                    break;
                case keyBinding.down:
                    if(player.yMotion > -player.maxSpeed) player.yMotion -= player.acceleration;
                    break;
                case keyBinding.up:
                    if(player.yMotion < player.maxSpeed) player.yMotion += player.acceleration;
                    break;
                break;
            }
        });

        // Motion calculation
        function motion() {
            if(player.xMotion > 0) player.xMotion -= player.resistance;
            if(player.xMotion < 0) player.xMotion += player.resistance;
            if(player.yMotion > 0) player.yMotion -= player.resistance;
            if(player.yMotion < 0) player.yMotion += player.resistance;

            if(player.position.y + player.dimensions.height < planet.dimensions.height)
            if(player.yMotion > -gravity) player.yMotion -= gravity;

            player.position.x -= player.xMotion;
            player.position.y -= player.yMotion;
        }

        // game loop
        function loop() {
            motion();

            field.canvas.clearRect(0,0,600,600);
            field.canvas.drawImage(planet.image, planet.position.x, planet.position.y);
            field.canvas.drawImage(player.image, player.position.x, player.position.y);
        }
    }, false);
})();
