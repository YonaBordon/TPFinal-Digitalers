const token = document.cookie.split('=')[1];

if (!token) {
	window.location.href = '/login';
}

function fileToBase64(file) {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = () => resolve(reader.result);
		reader.onerror = (error) => reject(error);
	});
}

const crear = document.querySelector('#crearProducto');
console.log('productos');
// abrimos sweetAlert con form de producto y enviamos
crear.addEventListener('click', async (e) => {
	e.preventDefault();

	// Alerta con html form
	Swal.fire({
		title: 'Crear producto',
		html: `
      <form id="crearProductoForm" class=" d-flex flex-column">
        <input type="text" id="nombre" class="swal2-input" placeholder="Nombre">
        <input type="number" id="precio" class="swal2-input" placeholder="Precio">
        <input type="file" id="imagen" class="swal2-input" placeholder="Imagen">
        <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción"></textarea>
      </form>
    `,
		confirmButtonText: 'Crear',
		focusConfirm: false,
		width: '70%',
		preConfirm: async () => {
			const nombre = document.querySelector('#nombre').value;
			const descripcion = document.querySelector('#descripcion').value;
			const precio = document.querySelector('#precio').value;
			const imagen = document.querySelector('#imagen').files[0];

			const base64Img = await fileToBase64(imagen);

			console.log('base64Img', base64Img);

			return {
				name: nombre,
				description: descripcion,
				price: Number(precio),
				image: base64Img,
			};
		},
	}).then(async (result) => {
		if (result.isConfirmed) {
			try {
				const res = await fetch('/api/products', {
					method: 'POST',
					body: JSON.stringify(result.value),
					headers: {
						'Content-Type': 'application/json',
						'Access-Token': token,
					},
				});

				if (res.ok) {
					Swal.fire({
						title: 'Producto creado',
						text: 'Producto creado con éxito',
						icon: 'success',
						confirmButtonText: 'Aceptar',
					}).then(() => {
						window.location.href = '/manage';
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
		}
	});
});

const editar = document.querySelectorAll('#editarProducto');

editar.forEach((btn) => {
	btn.addEventListener('click', async (e) => {
		e.preventDefault();

		const id = btn.dataset.id;

		try {
			const res = await fetch(`/api/products/${id}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					'Access-Token': token,
				},
			});

			if (res.ok) {
				const { product } = await res.json();
				// Alerta con html form
				Swal.fire({
					title: 'Editar producto',
					html: `
            <form id="editarProductoForm" class=" d-flex flex-column">
              <input type="text" id="nombre" class="swal2-input" placeholder="Nombre" value="${product.name}">
              <input type="number" id="precio" class="swal2-input" placeholder="Precio" value="${product.price}">
              <input type="file" id="imagen" class="swal2-input" placeholder="Imagen">
              <textarea id="descripcion" class="swal2-textarea" placeholder="Descripción">${product.description}</textarea>
            </form>
          `,
					confirmButtonText: 'Editar',
					focusConfirm: false,
					width: '70%',
					preConfirm: async () => {
						const nombre = document.querySelector('#nombre').value;
						const descripcion = document.querySelector('#descripcion').value;
						const precio = document.querySelector('#precio').value;
						const imagen = document.querySelector('#imagen').files[0];

						let base64Img;
						if (imagen) {
							base64Img = await fileToBase64(imagen);
						} else {
							base64Img = product.image;
						}

						return {
							name: nombre,
							description: descripcion,
							price: Number(precio),
							image: base64Img,
						};
					},
				}).then(async (result) => {
					if (result.isConfirmed) {
						try {
							const res = await fetch(`/api/products/${id}`, {
								method: 'PUT',
								body: JSON.stringify(result.value),
								headers: {
									'Content-Type': 'application/json',
									'Access-Token': token,
								},
							});

							if (res.ok) {
								Swal.fire({
									title: 'Producto editado',
									text: 'Producto editado con éxito',
									icon: 'success',
									confirmButtonText: 'Aceptar',
								}).then(() => {
									window.location.href = '/manage';
								});
							}
						} catch (err) {
							console.log(err);
						}
					}
				});
			}
		} catch (err) {
			console.log(err);
		}
	});
});

const eliminar = document.querySelectorAll('#borrarProducto');

eliminar.forEach((btn) => {
	btn.addEventListener('click', async (e) => {
		e.preventDefault();

		const id = btn.dataset.id;

		Swal.fire({
			title: '¿Estás seguro?',
			text: 'No podrás revertir esta acción',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: '#3085d6',
			confirmButtonText: 'Sí, eliminar',
			cancelButtonText: 'Cancelar',
		}).then(async (result) => {
			if (result.isConfirmed) {
				try {
					const res = await fetch(`/api/products/${id}`, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
							'Access-Token': token,
						},
					});

					if (res.ok) {
						Swal.fire({
							title: 'Producto eliminado',
							text: 'Producto eliminado con éxito',
							icon: 'success',
							confirmButtonText: 'Aceptar',
						}).then(() => {
							window.location.href = '/manage';
						});
					}
				} catch (err) {
					console.log(err);
				}
			}
		});
	});
});
