
export default function Menu(View, Game, Controller) {
    const menu = document.querySelector('.menu')
    const btn_block = document.querySelector('.main__btn-block')
    const btn = document.querySelectorAll('.main__btn')
    const stats = document.querySelector('.stats')
    const control = document.querySelector('.control')
    const back = document.querySelectorAll('.btn__footer')
    const score_stat = document.getElementById('score_stat')
    const line_stat = document.getElementById('line_stat')
    const level_stat = document.getElementById('level_stat')

    btn.forEach(e => e.addEventListener('click', (e) => {
        switch (e.target.id) {
            case 'newGame':
                menu.classList.toggle('invisible')
                const view = new View(root, 640, 640, 20, 10);
                const game = new Game();
                const controller = new Controller(game, view);

                window.game = game;
                window.view = view;
                window.controller = controller;
                break;

            case 'control':
                switchScreen(control)
                break;

            case 'stats':
                if (localStorage.getItem("tetris_stat") != undefined) {
                    let record = JSON.parse(localStorage.getItem("tetris_stat"));
                    record.score != undefined ? score_stat.innerHTML = record.score : score_stat.innerHTML = '0';
                    record.lines != undefined ? line_stat.innerHTML = record.lines : line_stat.innerHTML = '0';
                    record.level != undefined ? level_stat.innerHTML = record.level : level_stat.innerHTML = '0';
                }
                switchScreen(stats)
                break;

            default:
                break;
        }
    }))

    back.forEach(e => e.addEventListener('click', (e) => {
        e.target.parentNode.classList.toggle('invisible')
        btn_block.classList.toggle('invisible')
    }))


    function switchScreen(screen) {
        btn_block.classList.toggle('invisible')
        screen.classList.toggle('invisible')
    }
}
