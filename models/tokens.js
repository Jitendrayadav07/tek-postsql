module.exports = (sequelize, DataTypes) => {
    const ArenaTradeCoin = sequelize.define('arena-trade-coins', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        a: DataTypes.SMALLINT,
        b: DataTypes.SMALLINT,
        lp_deployed: DataTypes.BOOLEAN,
        lp_percentage: DataTypes.SMALLINT,
        sale_percentage: DataTypes.SMALLINT,
        creator_fee_basis_points: DataTypes.SMALLINT,
        internal_id: DataTypes.NUMERIC,
        supply: DataTypes.NUMERIC,
        system_created: DataTypes.DATE,
        curve_scaler: DataTypes.NUMERIC,
        name: DataTypes.TEXT,
        symbol: DataTypes.TEXT,
        contract_address: DataTypes.TEXT,
        creator_address: DataTypes.TEXT,
        pair_address: DataTypes.TEXT,
        create_token_tx_id: DataTypes.TEXT
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });

    return ArenaTradeCoin;
};