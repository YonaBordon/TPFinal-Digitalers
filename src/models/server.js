const express = require('express');
const cors = require('cors');
const coockieParser = require('cookie-parser');
const { dbConnection } = require('../database/config');
const path = require('path');

const { engine } = require('express-handlebars');
class Server {
	constructor() {
		this.port = process.env.PORT || 3000;
		this.app = express();
		this.paths = {
			public: '',
			users: '/api/users',
			products: '/api/products',
		};

		this.connectDB();

		this.middlewares();

		this.routes();
	}

	middlewares() {
		this.app.use(cors());
		this.app.use(coockieParser());
		this.app.use(express.json({ limit: '15mb' }));
		this.app.use(express.urlencoded({ extended: true, limit: '15mb' }));
		this.app.use(express.static('public'));

		this.app.engine(
			'hbs',
			engine({
				extname: '.hbs',
				defaultLayout: 'layout',
				runtimeOptions: {
					allowProtoPropertiesByDefault: true,
					allowProtoMethodsByDefault: true,
				},
				layoutsDir: path.join(this.app.get('views'), 'layouts'),
				partialsDir: path.join(this.app.get('views'), 'partials'),
			}),
		);

		this.app.set('view engine', 'hbs');
		this.app.set('views', path.join(__dirname, '../../views'));
	}

	connectDB() {
		dbConnection();
	}

	routes() {
		this.app.use(this.paths.public, require('../routes/public'));
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
