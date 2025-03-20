export const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        password: String!
        role: String!
    }
    type Offer {
        id: ID!
        title: String!
        description: String!
        category: String!
    }
    type UserOfferID {
        user_id: ID!
        offer_id: ID!
    }
    type UserOffer {
        id: UserOfferID!
        user: ID
        offer: ID
    }
    input UserInput {
        id: ID
        username: String!
        password: String!
        role: String
    }
    input OfferInput {
        offer_id: ID
        title: String!
        description: String!
        category: String!
    }
    input CheckAuthInput {
        id: ID!
        username: String!
        role: String!
    }
    type Token {
        token: String!
    }
    type Query {
        getAllUsers: [User]
        getOneUser(id: ID!): User
        getAllOffers: [Offer]
        getOneOffer(id: ID!): Offer
        getAllUserOffers: [UserOffer]
        getOneUserOffer(id: ID!): UserOffer
        checkAuth: Token!
    }
    type Mutation {
        register(input: UserInput!): Token!
        login(input: UserInput!): Token!
        addOffer(input: OfferInput!): Offer!
        removeOffer(id: ID!): Boolean!
    }
`