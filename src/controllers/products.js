const { response } = require('express');
const { Product } = require('../models');

const addProduct = async (req, res = response) => {
	const { name, price, description } = req.body;

	const product = new Product({ name, price, description });

	const checkIfExist = await Product.findOne({ name });
	if (checkIfExist) {
		return res.status(400).json({
			msg: 'El producto ya existe',
		});
	}

	await product.save();

	res.json({
		msg: 'Producto creado correctamente',
		product,
	});
};

const getProducts = async (req, res = response) => {
	const { limit = 5, from = 0 } = req.query;
	const query = { status: true };

	const [total, products] = await Promise.all([
		Product.countDocuments(query),
		Product.find(query).skip(Number(from)).limit(Number(limit)),
	]);

	res.json({
		msg: 'Productos obtenidos correctamente',
		total,
		products,
	});
};

const getProduct = async (req, res = response) => {
	const { id } = req.params;

	const poduct = await Product.findById(id);

	res.json({
		msg: 'Producto obtenido correctamente',
		poduct,
	});
};

const updateProduct = async (req, res = response) => {
	const { id } = req.params;
	const { status, ...data } = req.body;

	const updated = await Product.findByIdAndUpdate(id, data, { new: true });

	res.json({
		msg: 'Producto actualizado correctamente',
		updated,
	});
};

const deleteProduct = async (req, res = response) => {
	const { id } = req.params;

	const deleted = await Product.findByIdAndUpdate(id, { status: false }, { new: true });

	res.json({
		msg: 'Producto eliminado correctamente',
		deleted,
	});
};

module.exports = {
	addProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};
