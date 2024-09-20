const { AuctionModel, AuctionBidModel } = require('./../db');

async function createAuctionInDB(auctionToCreate){    
    const name = auctionToCreate["auctionName"];
    const startBidPrice = auctionToCreate["startBidPrice"];
    const creatorId = auctionToCreate["auctionCreatorId"];
    const winnerId = auctionToCreate["auctionWinnerId"];
    const status = auctionToCreate["auctionStatus"];
    const startTime = auctionToCreate["auctionStartDateTime"];
    const endTime = auctionToCreate["auctionEndDateTime"];
    
    return await AuctionModel.create({
        name: name,
        startBidPrice: startBidPrice,
        creatorId: creatorId,
        winnerId: winnerId,
        status: status,
        startTime: startTime,
        endTime: endTime            
    });
}

async function getAllAuctions() {
    const allAuctions = await AuctionModel.find({}, { 
        _id: 0, //don't pull _id field
        __v:0,
        startBidPrice: 0,

    }); 
    
    return allAuctions;
}

async function getAllAuctionsCreatedByUser(userId) {
    const allAuctions = await AuctionModel.find({ creatorId: userId }, 
        { 
        _id: 0,
        __v:0,
        startBidPrice: 0,
        }
    ); 
    
    return allAuctions;
}

// insert a record in AuctionBids table 
async function bid(auctionId, bidderId, amount, bidTime) {    
    return await AuctionBidModel.create({
        auctionId: auctionId,
        bidderId: bidderId,
        bidAmount: amount,
        bidTime: bidTime
    });

}

module.exports = { 
    createAuctionInDB,
    getAllAuctions,
    getAllAuctionsCreatedByUser,
    bid 
};