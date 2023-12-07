
import * as sequelize from 'sequelize';

async function up({ context: queryInterface }) {
	await queryInterface.createTable('users', {
		id: {
			type: sequelize.INTEGER,
			allowNull: false,
			primaryKey: true
		},
		name: {
			type: sequelize.STRING,
			allowNull: false
		},
		balance: {
			type: sequelize.FLOAT
		},
		createdAt: {
			type: sequelize.DATE,
			allowNull: false
		},
		updatedAt: {
			type: sequelize.DATE,
			allowNull: false
		}
	});
}

async function down({ context: queryInterface }) {
	await queryInterface.dropTable('users');
}

module.exports = { up, down };