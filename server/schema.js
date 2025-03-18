export const typeDefs = `#graphql
    type User {
        id: ID!
        username: String!
        email: String!
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
    type AuthPayload {
        user: User!
        token: String!
    }
    type Query {
        getAllUsers: [User]
        getOneUser(id: ID!): User
        getAllOffers: [Offer]
        getOneOffer(id: ID!): Offer
        getAllUserOffers: [UserOffer]
        getOneUserOffer(id: ID!): UserOffer
    }
    type Mutation {
        register(input: UserInput!): AuthPayload!
        login(input: UserInput!): AuthPayload!
        addOffer(input: OfferInput!): Offer!
        removeOffer(id: ID!): Boolean!
    }
`