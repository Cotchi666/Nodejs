module.exports = {
  //chay khi dung lenh db migration
    up: async (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.changeColumn('Users', 'image',{
            type: Sequelize.BLOB('long'),
            allowNull: true,
        })
      ])
    },
    // rollback
    down:  (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColumn('Users', 'image',{
                type: Sequelize.STRING,
                allowNull: true,
            })
          ])
    }
  }; 