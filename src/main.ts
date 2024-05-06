import { Boot } from './scenes/Boot';
import { Game as MainGame } from './scenes/Game';
import { GameOver } from './scenes/GameOver';
import { MainMenu } from './scenes/MainMenu';
import { Preloader } from './scenes/Preloader';
import { PlayGame } from './scenes/PlayGame';

import { Game, Types } from 'phaser';

import gameOptions from './game-options';

//  Find out more information about the Game Config at:
//  https://newdocs.phaser.io/docs/3.70.0/Phaser.Types.Core.GameConfig
const config: Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width:
        gameOptions.boardSize.cols *
            (gameOptions.tileSize + gameOptions.tileSpacing) +
        gameOptions.tileSpacing,
    height:
        gameOptions.boardSize.rows *
            (gameOptions.tileSize + gameOptions.tileSpacing) +
        gameOptions.tileSpacing,
    parent: 'game-container',
    backgroundColor: '#028af8',
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    scene: [Boot, Preloader, PlayGame, MainMenu, MainGame, GameOver],
};

export default new Game(config);
