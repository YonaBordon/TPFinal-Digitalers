const validateProduct = (req, res, next) => {
	const { name, price, description, image } = req.body;

	if (!name || !price) {
		return res.status(400).json({
			msg: 'Faltan campos por completar',
		});
	}

	// Check if price is a number
	if (typeof price !== 'number') {
		return res.status(400).json({
			msg: 'El precio debe ser un número',
		});
	}

	// Check if price is a positive number
	if (price < 0) {
		return res.status(400).json({
			msg: 'El precio debe ser un número positivo',
		});
	}

	// check if image is a base64 string
	if (image && !image.match(/^data:image\/(png|jpg|jpeg|gif);base64,/)) {
		return res.status(400).json({
			msg: 'La imagen debe ser un base64',
		});
	}

	// check image base64 size 10mb
	if (image && image.length > 10000000) {
		return res.status(400).json({
			msg: 'La imagen debe pesar menos de 10mb',
		});
	}

	next();
};

module.exports = validateProduct;
