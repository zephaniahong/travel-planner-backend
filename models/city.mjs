export default function initCityModel(sequelize, DataTypes) {
  return sequelize.define(
    'city',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.STRING,
      },
      lat: {
        type: DataTypes.INTEGER,
      },
      lng: {
        type: DataTypes.INTEGER,
      },
      countryId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'countries',
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
