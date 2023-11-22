// Verificamos ruta actual
const path = window.location.pathname;
console.log(path);

// si hay token
const token = document.cookie.split('=')[1];
if (token) {
	// si la ruta es /login o /register
	if (path === '/login' || path === '/register') {
		// redireccionamos al home
		window.location.href = '/';
	}
}

if (path === '/register') {
	const registerForm = document.querySelector('#registerForm');

	registerForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const username = document.querySelector('#username').value;
		const email = document.querySelector('#email').value;
		const password = document.querySelector('#password').value;

		try {
			const res = await fetch('/api/users/register', {
				method: 'POST',
				body: JSON.stringify({ username, email, password }),
				headers: { 'Content-Type': 'application/json' },
			});
			if (res.ok) {
				Swal.fire({
					title: 'Usuario registrado',
					text: 'Usuario registrado con éxito',
					icon: 'success',
					confirmButtonText: 'Aceptar',
				}).then(() => {
					window.location.href = '/login';
				});
			} else {
				const jsonres = await res.json();
				Swal.fire({
					title: 'Error',
					text: `${jsonres.msg}`,
					icon: 'error',
					confirmButtonText: 'Aceptar',
				});
			}
		} catch (err) {
			console.log(err);
		}
	});
} else if (path === '/login') {
	const loginForm = document.querySelector('#loginForm');

	loginForm.addEventListener('submit', async (e) => {
		e.preventDefault();

		const email = document.querySelector('#email').value;
		const password = document.querySelector('#password').value;

		try {
			const res = await fetch('/api/users/login', {
				method: 'POST',
				body: JSON.stringify({ email, password }),
				headers: { 'Content-Type': 'application/json' },
			});
			if (res.ok) {
				const jsonres = await res.json();
				document.cookie = `token=${jsonres.token}`;
				Swal.fire({
					title: 'Usuario logueado',
					text: 'Usuario logueado con éxito',
					icon: 'success',
					confirmButtonText: 'Aceptar',
				}).then(() => {
					window.location.href = '/';
				});
			} else {
				const jsonres = await res.json();
				Swal.fire({
					title: 'Error',
					text: `${jsonres.msg}`,
					icon: 'error',
					confirmButtonText: 'Aceptar',
				});
			}
		} catch (err) {
			console.log(err);
		}
	});
}
