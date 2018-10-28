import * as logger from 'js-logger'

/**
 * Game Phaser scene.
 *
 * This is where all the logic for your game goes.
 */
export default class Game extends Phaser.Scene {

    create () {
        logger.info('Game enter');

        let bg = this.add.sprite(0, 0, 'bg');
        bg.setOrigin(0,0);

        let key: any = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.PAGE_DOWN);

        this.input.keyboard.on('keyup', function (event: any) {

            if(event.key === 'PageDown')
            {
                console.log('PageDown');
            }

        });
    }
}
