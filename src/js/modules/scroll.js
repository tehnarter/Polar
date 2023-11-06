const mainItems = document.querySelectorAll('.scroll')
const mainBtn = document.querySelector('.scroll__btn')

for (let item of mainItems) {
	item.addEventListener('click', function () {
		const title = document.querySelector('#' + item.dataset.goto)
		const gotoBlockValue = title.getBoundingClientRect().top + scrollY

		window.scrollTo({
			top: gotoBlockValue,
			left: 0,
			behavior: 'smooth',
		})
	})
}

document.addEventListener('scroll', function () {
	if (scrollY >= 1163) {
		mainBtn.classList.remove('hidden')
	} else {
		mainBtn.classList.add('hidden')
	}
})

mainBtn.addEventListener('click', function () {
	window.scrollTo({
		top: 0,
		left: 0,
		behavior: 'smooth',
	})
})
//  Анімація для блоків при прогортуванні в низ

const animatedBlocks = document.querySelectorAll('.scroll-animated')

function checkAnimation() {
	animatedBlocks.forEach(block => {
		const blockTop = block.getBoundingClientRect().top
		const blockBottom = block.getBoundingClientRect().bottom

		if (blockTop < window.innerHeight && blockBottom > 0) {
			block.classList.add('animate')
		}
	})
}

window.addEventListener('scroll', checkAnimation)
window.addEventListener('load', checkAnimation) // Запустити перевірку анімації при завантаженні сторінки

checkAnimation() // Запустити перевірку анімації на початку
