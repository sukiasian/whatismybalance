module.exports = {
  storage: 'sequelize', 
  storageOptions: {
    sequelize: require('./src/database/Database').default.SEQUELIZE, // Sequelize instance
  },
  migrations: {
    path: './path-to-your-migrations-folder',
    pattern: /\.js$/,
    wrap: (fun) => {
      if (fun.length === 1) return Promise.promisify(fun);
	  
      return fun;
    },
  },
};