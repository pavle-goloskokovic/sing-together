import * as logger from 'js-logger'

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {

    private video: HTMLVideoElement;

    startVideo ()
    {
        this.video = document.createElement('video');

        // Get access to the camera!
        if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
        {
            // Not adding `{ audio: true }` since we only want video now
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) =>
                    {
                        this.video.src = window.URL.createObjectURL(stream);
                    }
                );
        }
    }

    snapShot ()
    {
        let canvas = document.createElement('canvas');
        canvas.width = this.video.videoWidth;
        canvas.height = this.video.videoHeight;

        let context = canvas.getContext('2d');
        context.drawImage(this.video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) =>
        {
            this.load.image('snap', window.URL.createObjectURL(blob));

            this.load.once('complete', ()=>
            {
                this.add.image(400, 300, 'snap');

            }, this);

            this.load.start();
        });

        // document.body.appendChild(canvas);
    }

    addLeaf (x:number, y:number, orientation: number, color: string, text: string)
    {
        let leaf = this.add.sprite(x, y, `leaf-${color}`);
        leaf.setOrigin(0.5,0.5);
        leaf.setScale(0.6, orientation * 0.6);

        let title = this.add.text(x, y + orientation*15,
            text,
            {
                fontFamily: "Smart Kid",
                fontSize: 175,
                color: "#fff",
                align: 'center'
            }
        );
        title.setOrigin(0.5, 0.5);
        title.setStroke('#333', 36);

        return {
            leaf: leaf,
            text: title
        }

    }

    setLeaf (leaf: any, color: string, text: string)
    {
        leaf.text.setText(text);
        leaf.leaf.setTexture(`leaf-${color}`);
    }

    setEffect (name: string)
    {
        let xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/nano/effect');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                //var userInfo = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify({
            name: name
        }));
    }

    create () {
        logger.info('Game enter');

        this.startVideo();

        let w = <number>this.sys.game.config.width, h = <number>this.sys.game.config.height;

        let bg = this.add.sprite(0, 0, 'bg');
        bg.setOrigin(0,0);

        let title = this.add.text(w/2, 300,
            "Sing Together",
            {
                fontFamily: "Smart Kid",
                fontSize: 300,
                color: "#fff",
                align: 'center'
            }
        );
        title.setOrigin(0.5, 0.5);
        title.setStroke('#333', 40);

        // leafs

        let leafs: any[] = [];

        let commands = [
            ()=>
            {
                for(let i=0; i<7; i++)
                {
                    title.visible = false;

                    let leaf = this.addLeaf(
                        w/2 + (i-3) * 240,
                        320 + (i%2 === 0 ? -1 : 1)*24,
                        i%2 === 0 ? -1 : 1,
                        'black',
                        '');

                    leafs.push(leaf);
                }

                if(this.video.src)
                {
                    this.video.play();
                }

                this.setEffect('Blank');
            },

            // A solo

            ()=>{
                this.setLeaf(leafs[1], 'blue', 'A');
            },
            ()=>{
                this.setLeaf(leafs[1], 'black', '');
                this.setLeaf(leafs[5], 'blue', 'A');
            },
            ()=>{
                this.setLeaf(leafs[5], 'black', '');
                this.setLeaf(leafs[2], 'blue', 'A');
            },
            ()=>{
                this.setLeaf(leafs[2], 'black', '');
                this.setLeaf(leafs[4], 'blue', 'A');
            },
            ()=>{
                this.setLeaf(leafs[4], 'black', '');
                this.setLeaf(leafs[3], 'blue', 'A');
            },

            // M solo

            ()=>{
                this.setLeaf(leafs[3], 'black', '');
                this.setLeaf(leafs[5], 'yellow', 'M');
            },
            ()=>{
                this.setLeaf(leafs[5], 'black', '');
                this.setLeaf(leafs[1], 'yellow', 'M');
            },
            ()=>{
                this.setLeaf(leafs[1], 'black', '');
                this.setLeaf(leafs[4], 'yellow', 'M');
            },
            ()=>{
                this.setLeaf(leafs[4], 'black', '');
                this.setLeaf(leafs[2], 'yellow', 'M');
            },
            ()=>{
                this.setLeaf(leafs[2], 'black', '');
                this.setLeaf(leafs[3], 'yellow', 'M');
            },

            // M + A => MA

            ()=>{
                this.setLeaf(leafs[3], 'black', '');
                this.setLeaf(leafs[0], 'yellow', 'M');
            },
            ()=>{
                this.setLeaf(leafs[6], 'blue', 'A');
            },
            ()=>{
                this.setLeaf(leafs[0], 'black', '');
                this.setLeaf(leafs[1], 'yellow', 'M');
            },
            ()=>{
                this.setLeaf(leafs[6], 'black', '');
                this.setLeaf(leafs[5], 'blue', 'A');
            },
            ()=>{
                this.setLeaf(leafs[1], 'black', '');
                this.setLeaf(leafs[2], 'yellow', 'M');
            },
            ()=>{
                this.setLeaf(leafs[5], 'black', '');
                this.setLeaf(leafs[4], 'blue', 'A');
            },
            ()=>{
                this.setLeaf(leafs[2], 'black', '');
                this.setLeaf(leafs[4], 'black', '');
                this.setLeaf(leafs[3], 'green', 'MA');
            },

            // MA  + MA => MAMA

            ()=>{
                this.setLeaf(leafs[3], 'black', '');
                this.setLeaf(leafs[0], 'green', 'MA');
            },
            ()=>{
                this.setLeaf(leafs[6], 'green', 'MA');
            },
            ()=>{
                this.setLeaf(leafs[0], 'black', '');
                this.setLeaf(leafs[1], 'green', 'MA');
            },
            ()=>{
                this.setLeaf(leafs[6], 'black', '');
                this.setLeaf(leafs[5], 'green', 'MA');
            },
            ()=>{
                this.setLeaf(leafs[1], 'black', '');
                this.setLeaf(leafs[2], 'green', 'MA');
            },
            ()=>{
                this.setLeaf(leafs[5], 'black', '');
                this.setLeaf(leafs[4], 'green', 'MA');
            },
            ()=>{
                this.setLeaf(leafs[2], 'black', '');
                this.setLeaf(leafs[4], 'black', '');
                this.setLeaf(leafs[3], 'red', 'MAMA');

                // TODO add hear particle here

                // heart particle

                //  First create a particle manager
                //  A single manager can be responsible for multiple emitters
                //  The manager also controls which particle texture is used by _all_ emitter
                let particles = this.add.particles('heart');

                let emitter = particles.createEmitter(null);
                emitter.setPosition(w/2, 350);
                emitter.setSpeed(300);
                emitter.setBlendMode(Phaser.BlendModes.NORMAL);

                let emitter2 = particles.createEmitter(null);
                emitter2.setPosition(w/2, 350);
                emitter2.setSpeed(300);
                emitter2.setBlendMode(Phaser.BlendModes.SCREEN);

                // MAMA on top
                leafs[3].text.depth = 100;
            },
            ()=>
            {
                this.snapShot();
            }


        ];

        let commandIndex = 0;

        this.input.keyboard.on('keyup', function (event: any) {

            if(event.key === 'PageDown')
            {
                console.log('PageDown');

                if(commandIndex < commands.length)
                {
                    commands[commandIndex]();

                    commandIndex++;
                }
            }

        });
    }
}
