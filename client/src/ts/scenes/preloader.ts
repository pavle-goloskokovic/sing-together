import * as logger from 'js-logger'

/**
 * Preloader Phaser scene.
 *
 * This is where we load all the assets including images, sounds and all relevant data
 * before starting the game.
 */
export default class Preloader extends Phaser.Scene {

    preload () {
        logger.info('Preloader enter');

        // TODO preload assets

        this.load.image('logo', 'assets/images/logo.png');

        this.load.image('bg', 'assets/images/bg.png');

        this.load.image('leaf-black', 'assets/images/leafs/black.png');
        this.load.image('leaf-blue', 'assets/images/leafs/blue.png');
        this.load.image('leaf-yellow', 'assets/images/leafs/yellow.png');
        this.load.image('leaf-green', 'assets/images/leafs/green.png');
        this.load.image('leaf-red', 'assets/images/leafs/red.png');

        this.load.image('heart', 'assets/images/heart.png');
    }

    create () {
        logger.info('Preloader leave');

        this.scene.start('game');
    }

}
