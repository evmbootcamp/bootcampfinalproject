const { AuctionModel, AuctionBidModel } = require('./../db');

async function createAuctionInDB(auctionToCreate){    
    const name = auctionToCreate["auctionName"];
    const startBidPrice = auctionToCreate["startBidPrice"];
    const creatorId = auctionToCreate["auctionCreatorId"];
    const winnerId = auctionToCreate["auctionWinnerId"];
    const status = auctionToCreate["auctionStatus"];
    const startTime = auctionToCreate["auctionStartDateTime"];
    const endTime = auctionToCreate["auctionEndDateTime"];
    const description = auctionToCreate["auctionDescription"];
    
    return await AuctionModel.create({
        name: name,
        startBidPrice: startBidPrice,
        description: description,
        creatorId: creatorId,
        winnerId: winnerId,
        status: status,
        startTime: startTime,
        endTime: endTime            
    });
}

async function getAllAuctions() {
    const allAuctions = await AuctionModel.find({}, {         
        __v:0
        // _id: 0, //don't pull _id field
        // startBidPrice: 0,

    }); 
    
    return allAuctions;
}

async function getAllAuctionsCreatedByUser(userId) {
    const allAuctions = await AuctionModel.find({ creatorId: userId }, 
        {         
        __v:0
        // _id: 0,
        // startBidPrice: 0,
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

// find all the auctions won by a bidder
// auctions table stores the winning bidder Id
async function getAllAuctionsWonByABidder(bidderId) {
    return await AuctionModel.find( {
        winnerId: bidderId,
        status: "Closed"
    }, {
        name: 1,
        status: 1,
        startTime: 1,
        endTime:1
    })
}

module.exports = { 
    createAuctionInDB,
    getAllAuctions,
    getAllAuctionsCreatedByUser,
    getAllAuctionsWonByABidder,
    bid 
};