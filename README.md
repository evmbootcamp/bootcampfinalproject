# Decentralized Online Auction Marketplace
## Primary Requirements
1. Users should be able to signup, sign-in, and logout
2. Users should be able to connect their wallet to their accounts on this site
3. Users should be able to create an auction using the UI
4. Creation of an auction will automatically create a new Auction smart contract and deploy it
5. Bidders can bid on an auction
6. Once an auction ends, the winner is selected and ownership of the contract is trasnferred to the winner

### To run the app:
- navigate to the backend folder and run:
    - npm install
    - add a JWT_SECRET phrase in auth.js
    - add database connection url in server.js
    - node server.js
