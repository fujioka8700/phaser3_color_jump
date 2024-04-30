import { Scene } from 'phaser';

export class PlayGame extends Scene {
    constructor() {
        super('PlayGame');
    }

    create() {
        console.log('this is my awesome game');
    }
}
