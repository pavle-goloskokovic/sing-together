import * as logger from 'js-logger'
import * as appConfig from '../app.config'

/**
 * Boot Phaser game scene.
 *
 * This is where we handle all Phaser specific stuff before we start loading assets
 * and start dealing with game specific logic.
 */
export default class Boot extends Phaser.Scene {

    create() {
        logger.info('Boot enter');

        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://localhost:3000/nano');
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log
                ('User\'s name is ' + xhr.responseText);
            }
            else {
                console.log('Request failed.  Returned status of ' + xhr.status);
            }
        };
        xhr.send();

        xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:3000/nano/effect');
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.onload = function() {
            if (xhr.status === 200) {
                //var userInfo = JSON.parse(xhr.responseText);
                console.log(xhr.responseText);
            }
        };
        xhr.send(JSON.stringify({
            name: Math.random() > 0.5 ? 'Forest' : 'Romantic'
        }));

        /*setTimeout(function ()
        {
            xhr = new XMLHttpRequest();
            xhr.open('PUT', 'http://localhost:3000/nano/off');
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onload = function() {
                if (xhr.status === 200) {
                    //var userInfo = JSON.parse(xhr.responseText);
                    console.log(xhr.responseText);
                }
            };
            xhr.send(JSON.stringify({
                name: 'John Smith',
                age: 34
            }));

        }, 5000);*/

        this.sound.mute = appConfig.mute;

        this.sys.canvas.style.zoom = (1/window.devicePixelRatio).toString();

        // TODO update when scale manager gets available
        // // set scale mode
        // this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        //
        // // align
        // this.scale.pageAlignVertically = true;
        // this.scale.pageAlignHorizontally = true;

        this.handleOrientation();

        this.handleFullScreen();

        logger.info('Boot leave');
        this.scene.start('preloader');
    }

    handleOrientation () {
        if (!this.sys.game.device.os.desktop
            && (appConfig.orientation.forceLandscape || appConfig.orientation.forcePortrait)) {

            // TODO update when scale manager gets available
            // this.scale.forceOrientation(
            //     appConfig.orientation.forceLandscape,
            //     appConfig.orientation.forcePortrait
            // );
            // this.scale.enterIncorrectOrientation.add(this.enterIncorrectOrientation, this);
            // this.scale.leaveIncorrectOrientation.add(this.leaveIncorrectOrientation, this);
        }
    }

    enterIncorrectOrientation () {
        // TODO handle incorrect orientation
    }

    leaveIncorrectOrientation () {
        // TODO handle correct orientation
    }

    handleFullScreen () {
        if (!this.sys.game.device.os.desktop){
            // TODO update when scale manager gets available
            // && this.scale.compatibility.supportsFullScreen) {
            //
            // this.game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL ;
            // this.game.scale.fullScreenTarget  = document.getElementById('container');

            //TODO handle full screen
        }
    }
};
