const { Schema, model } = require('mongoose');
const validateBase64Image = require('../helpers/validateBase64Image');

const ProductSchema = Schema(
	{
		name: {
			type: String,
			required: [true, 'El nombre es requerido'],
			unique: true,
		},
		image: {
			type: String,
			required: false,
		},
		description: {
			type: String,
			required: [true, 'La descripción es requerida'],
		},
		price: {
			type: Number,
			required: [true, 'El precio es requerido'],
		},
		status: {
			type: Boolean,
			default: true,
		},
	},
	{
		timestamps: true,
		versionKey: false,
	},
);

ProductSchema.methods.toJSON = function () {
	const { __v, status, ...product } = this.toObject();
	return product;
};

module.exports = model('Product', ProductSchema);
