const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// users table
const User = new Schema({
    name: String,
    email: {type: String, unique: true},
    password: String    
});

const Auction = new Schema({    
    name: {
        type: String,
        required: true
    },
    startBidPrice: Number,
    creatorId: {
        type: Schema.Types.ObjectId, 
        required: true,
        ref: 'users'
    },
    winnerId: {
        type: Schema.Types.ObjectId, 
        ref: 'users',
        // required: true,
        default: null        
    }, 
    status: String,
    startTime: {
        type: Date, // supports only two formats as inputs from user: "yyyy-mm-dd GMT" or "yyyy/mm/dd GMT"
        default: Date.now 
    },
    endTime: Date // supports only two formats as inputs from user: "yyyy-mm-dd GMT" or "yyyy/mm/dd GMT"   
});

// auctionBids table
// doesn't store the winner of the auction. Auction table stores winner of each auction
// auctionId: fk, bidderId: fk, bidAmount, bidTime
const AuctionBid = new Schema({
    auctionId: {        
        type: Schema.Types.ObjectId,
        ref: 'auctions',
        required: true
    },
    bidderId: {        
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    bidAmount: Number,
    bidTime: Date
});


const UserModel = mongoose.model('users', User);
const AuctionModel = mongoose.model('auctions', Auction);
const AuctionBidModel = mongoose.model('auctionbids', AuctionBid);


module.exports = {
    mongoose,
    UserModel,
    AuctionModel,
    AuctionBidModel
}