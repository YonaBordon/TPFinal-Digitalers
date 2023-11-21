const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');
const path = require('path');
class Server {
	constructor() {
		this.port = process.env.PORT || 3000;
		this.app = express();
		this.paths = {
			users: '/api/users',
			products: '/api/products',
		};

		this.connectDB();

		this.middlewares();

		this.routes();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('public'));
		this.app.set('view engine', 'hbs');
		this.app.set('views', path.join(__dirname, '../views'));
	}

	connectDB() {
		dbConnection();
	}

	routes() {
		this.app.get('/', (req, res) => {
			res.render('index', {
				name: 'Carlos Jonatan Bordon',
				title: 'TP2 - Curso de NodeJS',
			});
		});
		this.app.use(this.paths.users, require('../routes/users'));
		this.app.use(this.paths.users, require('../routes/administrators'));
		this.app.use(this.paths.products, require('../routes/products'));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log('Server running on port', this.port);
		});
	}
}

module.exports = Server;
