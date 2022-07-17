module.exports = {
    up: async (queryInterface, Sequelize) => {
      return Promise.all([
        queryInterface.changeColum('Users', 'image',{
            type: Sequelize.BLOB('long'),
            allowNull: true,
        })
      ])
    },
    
    down: async (queryInterface, Sequelize) => {
        return Promise.all([
            queryInterface.changeColum('Users', 'image',{
                type: Sequelize.STRING,
                allowNull: true,
            })
          ])
    }
  };