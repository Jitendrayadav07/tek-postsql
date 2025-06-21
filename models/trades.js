module.exports = (sequelize, DataTypes) => {
    const ArenaTrade = sequelize.define('arena_trades', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        block_number: DataTypes.INTEGER,
        timestamp: DataTypes.DATE,
        token_id: DataTypes.NUMERIC,
        from_address: DataTypes.TEXT,
        referrer: DataTypes.TEXT,
        action: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        tx_hash: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        amount: DataTypes.TEXT
    }, {
        freezeTableName: true,
        timestamps: false,
        underscored: true
    });

    return ArenaTrade;
};  