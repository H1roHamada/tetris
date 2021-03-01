
export default function Menu(View, Game, Controller) {
    const menu = document.querySelector('.menu')
    const btn_block = document.querySelector('.main__btn-block')
    const btn = document.querySelectorAll('.main__btn')
    const stats = document.querySelector('.stats')
    const control = document.querySelector('.control')
    const back = document.querySelectorAll('.btn__footer')
    let name

    btn.forEach(e => e.addEventListener('click', (e) => {
        name = e.target.id;
        if (name === 'newGame') {
            menu.classList.toggle('invisible')
            const view = new View(root, 480, 640, 20, 10);
            const game = new Game();
            const controller = new Controller(game, view);

            window.game = game;
            window.view = view;
            window.controller = controller;
        }
        else if (name === 'continues') {
            console.log(name)
        }
        else if (name === 'control') {
            btn_block.classList.toggle('invisible')
            control.classList.toggle('invisible')
        }
        else {
            btn_block.classList.toggle('invisible')
            stats.classList.toggle('invisible')
        }
    }))

    back.forEach(e => e.addEventListener('click', (e) => {
        e.target.parentNode.classList.toggle('invisible')
        btn_block.classList.toggle('invisible')
    }))
}