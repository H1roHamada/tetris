
export default function MainScreen() {
    const btn_block = document.querySelector('.main__btn-block')
    const btn = document.querySelectorAll('.main__btn')
    const stats = document.querySelector('.stats')
    const back = document.querySelector('.btn__footer')
    let name

    btn.forEach(e => e.addEventListener('click', (e) => {
        name = e.target.id;
        if (name === 'newGame') {
            console.log(name)
        }
        else if (name === 'continues') {
            console.log(name)
        }
        else {
            btn_block.classList.toggle('invisible')
            stats.classList.toggle('invisible')
        }
    }))

    back.addEventListener('click', (e) => {
        e.target.parentNode.classList.toggle('invisible')
        btn_block.classList.toggle('invisible')
    })
}