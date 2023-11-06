const modeToggle = document.getElementById('dark')
const body = document.body

if (localStorage.getItem('dark-mode') === 'enabled') {
	body.classList.add('dark-mode')
	modeToggle.classList.add('night-mode')
}

modeToggle.addEventListener('click', () => {
	if (body.classList.contains('dark-mode')) {
		body.classList.remove('dark-mode')
		localStorage.setItem('dark-mode', 'disabled')
		modeToggle.classList.remove('night-mode')
	} else {
		body.classList.add('dark-mode')
		localStorage.setItem('dark-mode', 'enabled')
		modeToggle.classList.add('night-mode')
	}
})
