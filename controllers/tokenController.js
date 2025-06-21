const Response = require("../classes/Response");
const db = require("../config/db");
const { Op, fn, col, literal } = require("sequelize");

const recentTokens = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const offset = parseInt(req.query.offset) || 0;

        // Fetch paginated tokens
        const tokens = await db.token.findAll({
            order: [['internal_id', 'DESC']],
            limit,
            offset
        });

        const tokenIds = tokens.map(t => t.internal_id);

        // Fetch trades for these tokens
        const trades = await db.trade.findAll({
            where: {
                token_id: {
                    [Op.in]: tokenIds
                }
            },
            order: [['id', 'ASC']] // Ensure ordering for latest trade logic
        });

        // Group trades by token_id
        const tradeMap = {};
        for (const trade of trades) {
            const tid = trade.token_id;
            if (!tradeMap[tid]) tradeMap[tid] = [];
            tradeMap[tid].push(trade);
        }

        const responseList = await Promise.all(tokens.map(async (token) => {
            const tokenTrades = tradeMap[token.internal_id] || [];

            const latestTrade = tokenTrades[tokenTrades.length - 1] || null;

            const latest_trade_absolute_order = latestTrade ? latestTrade.id : null;

            const latest_total_volume_eth = tokenTrades.reduce(
                (sum, t) => sum + parseFloat(t.amount || 0) / 1e18, 0
            );

            const latest_transaction_count = tokenTrades.length;

            const latest_holder_count = new Set(tokenTrades.map(t => t.from_address)).size;

            const tokens_by_creator = await db.token.count({
                where: { creator_address: token.creator_address }
            });

            const latest_price_eth = latestTrade?.price
                ? parseFloat(latestTrade.price) / 1e18
                : 0;

            const avax_price = 17.5; // Optionally fetch from API
            const latest_price_usd = latest_price_eth * avax_price;

            return {
                row_id: token.id,
                creator_address: token.creator_address,
                contract_address: token.contract_address,
                token_id: token.internal_id.toString(),
                total_supply_eth: parseFloat(token.supply) / 1e18,
                token_name: token.name,
                token_symbol: token.symbol,
                a: token.a,
                b: token.b,
                curve_scaler: Number(token.curve_scaler),
                lp_deployed: token.lp_deployed,
                lp_percentage: Number(token.lp_percentage) / 100,
                sale_percentage: Number(token.sale_percentage) / 100,
                pair_address: token.pair_address,
                token_contract_address: token.contract_address,
                create_time: Math.floor(new Date(token.system_created).getTime() / 1000),
                transaction_hash: token.create_token_tx_id,
                migration_time: null,
                migration_transaction_hash: null,
                photo_url: "https://static.starsarena.com/uploads/27eefe6e-96a5-2f6b-99c9-dfec03798bf01750485368234.jpeg",
                description: " ",
                creator_twitter_handle: "xavieretards",
                creator_twitter_pfp_url: "https://static.starsarena.com/uploads/4274c8d2-bfc5-7ce0-3e7f-bba483db20151750481877538.png",
                creator_twitter_followers: 197,
                latest_trade_absolute_order,
                latest_price_eth: Number(latest_price_eth.toFixed(12)),
                latest_avax_price: avax_price,
                latest_price_usd: Number(latest_price_usd.toFixed(12)),
                latest_total_volume_eth: Number(latest_total_volume_eth.toFixed(6)),
                latest_total_volume_usd: 0,
                latest_transaction_count,
                latest_holder_count,
                latest_supply_eth: token.supply.toString(),
                tokens_by_creator,
                dexscreener_image_url: null,
                dexscreener_header: null,
                dexscreener_open_graph: null,
                dexscreener_website: null,
                dexscreener_social: null,
                dexscreener_last_updated: null
            };
        }));

        return res.status(200).send(Response.sendResponse(true, {
            offset,
            limit,
            items: responseList
        }, null, 200));
    } catch (err) {
        console.error("Error fetching recent tokens:", err);
        return res.status(500).send(Response.sendResponse(false, null, "Error occurred", 500));
    }
};

module.exports = {
    recentTokens
}