export default class View {



    /*---------------------------------------------*/
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'yellow',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    };
    /***********************************************/



    /*---------------------------------------------*/
    constructor(element, width, height, rows, columns) {
        this.element = element;
        this.width = width;
        this.height = height;

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldBorderWidth = 4;
        this.playfieldX = this.playfieldBorderWidth;
        this.playfieldY = this.playfieldBorderWidth;

        this.playfieldWidth = this.width / 2;
        this.playfieldHeight = this.height;

        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;

        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 20;
        this.panelY = 20;
        this.panelWidth = this.width;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
    }
    /***********************************************/



    /*---------------------------------------------*/
    renderMainScreen(state) {
        this.clearScreen();
        this.renderPlayfield(state);
        this.renderPanel(state);

    }
    /***********************************************/



    /*---------------------------------------------*/
    renderStartScreen() {
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseLine = 'middle';
        this.context.fillText('Press ENTER to Start', this.width / 2, this.height / 2);
    }
    /***********************************************/



    /*---------------------------------------------*/
    renderPauseScreen() {
        this.context.fillStyle = 'rgba(0,0,0,0.75)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseLine = 'middle';
        this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);
    }
    /***********************************************/



    /*---------------------------------------------*/
    renderGameOver({ score, lines, level }) {

        this.updateRecord(score, lines, level)
        this.clearScreen(score, lines, level);

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseLine = 'middle';
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
        this.context.fillText(`Lines: ${lines}`, this.width / 2, this.height / 2 + 48);
        this.context.fillText(`Level: ${level}`, this.width / 2, this.height / 2 + 96);
        this.context.fillText('Press ENTER to Restart', this.width / 2, this.height / 2 + 144);

    }
    /***********************************************/



    /*---------------------------------------------*/
    clearScreen() {

        this.context.clearRect(0, 0, this.width, this.height);
    }
    /***********************************************/



    /*---------------------------------------------*/
    renderPlayfield({ playfield }) {

        for (let y = 0; y < playfield.length; y++) {
            const line = playfield[y];

            for (let x = 0; x < line.length; x++) {
                const block = line[x];

                if (block) {

                    this.renderBlock(
                        this.playfieldX + (x * this.blockWidth),
                        this.playfieldY + (y * this.blockHeight),
                        this.blockWidth,
                        this.blockHeight,
                        View.colors[block]
                    );
                }
            }
        }
    }
    /***********************************************/



    /*---------------------------------------------*/
    renderPanel({ level, score, lines, nextPiece }) {
        this.context.textAlign = 'start';
        this.context.textBaseLine = 'top';
        this.context.fillStyle = 'white';
        this.context.font = '14px "Press Start 2P"';

        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
        this.context.fillText('Next:', this.panelX, this.panelY + 96);

        for (let y = 0; y < nextPiece.blocks.length; y++) {
            for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                const block = nextPiece.blocks[y][x];

                if (block) {
                    this.renderBlock(
                        this.panelX + (x * this.blockWidth * 0.5),
                        this.panelY + 100 + (y * this.blockHeight * 0.5),
                        this.blockWidth * 0.5,
                        this.blockHeight * 0.5,
                        View.colors[block]
                    );
                }
            }
        }

        this.context.strokeStyle = 'white';
        this.context.lineWidth = this.playfieldBorderWidth;
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight)
    }


    /***********************************************/



    /*---------------------------------------------*/
    renderBlock(x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black';
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, width);
        this.context.strokeRect(x, y, height, height);
    }
    /***********************************************/



    /*---------------------------------------------*/


    updateRecord(score, lines, level) {
        let obj = {
            score: score,
            lines: lines,
            level: level
        }

        if (localStorage.getItem('tetris_stat') == null) {
            let firstRecord = JSON.stringify(obj);
            localStorage.setItem("tetris_stat", firstRecord);

        } else {
            let prevRecord = JSON.parse(localStorage.getItem("tetris_stat"))

            if (score > prevRecord.score) {
                let newRecord = JSON.stringify(obj);
                localStorage.setItem("tetris_stat", newRecord);
            }
        }

    }

}