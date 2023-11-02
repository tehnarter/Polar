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
