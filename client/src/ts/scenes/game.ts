import * as logger from 'js-logger'

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {

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

    create () {
        logger.info('Game enter');

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
