import { Scene } from 'phaser';

import gameOptions from '../game-oprions';

export class PlayGame extends Scene {
    boardArray: Array<
        Array<{
            tileValue: number;
            tileSprite: Phaser.GameObjects.Sprite;
        }>
    >;

    constructor() {
        super('PlayGame');
    }

    addTile() {
        const emptyTiles = Array();

        for (let y = 0; y < gameOptions.boardSize.rows; ++y) {
            for (let x = 0; x < gameOptions.boardSize.cols; ++x) {
                if (this.boardArray[y][x].tileValue === 0) {
                    emptyTiles.push({
                        col: x,
                        row: y,
                    });
                }
            }
        }

        if (emptyTiles.length > 0) {
            const { col, row } = Phaser.Utils.Array.GetRandom(emptyTiles); // 配列からランダムな要素を返します。

            this.boardArray[row][col].tileValue = 1;
            this.boardArray[row][col].tileSprite.visible = true; // ゲームオブジェクトの表示状態
            this.boardArray[row][col].tileSprite.setFrame(0); // このゲームオブジェクトが、レンダリングに使用するフレームを設定します。
            this.boardArray[row][col].tileSprite.alpha = 0; // 透過度

            // Tweenを作成し、Tween設定オブジェクトを渡すことによって、このTween Managerに追加します。
            this.tweens.add({
                alpha: 1,
                callbackScope: this,
                duration: gameOptions.tweenSpeed,
                onComplete: function () {
                    console.log('tween completed');
                    this.canMove = true;
                },
                targets: [this.boardArray[row][col].tileSprite],
            });
        }
    }

    create() {
        this.boardArray = Array();

        for (let y = 0; y < gameOptions.boardSize.rows; y++) {
            this.boardArray[y] = Array();

            for (let x = 0; x < gameOptions.boardSize.cols; x++) {
                const tilePosition = this.getTilePosition(x, y);
                this.add.image(tilePosition.x, tilePosition.y, 'emptytile');

                let tile = this.add.sprite(
                    tilePosition.x,
                    tilePosition.y,
                    'tiles',
                    0,
                );
                tile.visible = false;

                this.boardArray[y][x] = {
                    tileValue: 0,
                    tileSprite: tile,
                };
            }
        }

        this.addTile();
        this.addTile();

        this.input.keyboard?.on('keydown', this.handleKey, this);
        this.input.on('pointerup', this.handleSwipe, this);
    }

    getTilePosition(col: number, row: number) {
        const posX =
            gameOptions.tileSpacing * (col + 1) +
            gameOptions.tileSize * (col + 0.5);
        const posY =
            gameOptions.tileSpacing * (row + 1) +
            gameOptions.tileSize * (row + 0.5);

        // x, y 座標の位置を定義する
        return new Phaser.Geom.Point(posX, posY);
    }

    handleKey(e: KeyboardEvent) {
        const keyPressed = e.code;

        console.log(`You pressed key ${keyPressed}`);
    }

    handleSwipe(e: Phaser.Input.Pointer) {
        const swipeTime = e.upTime - e.downTime;
        const swipe = new Phaser.Geom.Point(e.upX - e.downX, e.upY - e.downY);

        console.log(`Movement time: ${swipeTime}ms`);
        console.log(`Horizontal distance: ${swipe.x} pixels`);
        console.log(`Vertical distance: ${swipe.y} pixels`);
    }
}
