import UserController from "../controllers/userController.js";
import OfferController from "../controllers/offerController.js";

export const resolvers = {
    Query: {
        getAllUsers: () => UserController.getAllUsers(),
        getOneUser: (_, {id}) => UserController.getOneUser(id),
        getAllOffers: () => OfferController.getAllOffers(),
        getOneOffer: (_, {id}) => OfferController.getOneOffer(id),
        // getAllUserOffers: () => OfferController.getAllUserOffers(),

    },
    Mutation: {
        register: (_, {input}) => UserController.register(input.username, input.password),
        login: (_, {input}) => UserController.login(input.username, input.password),
        addOffer: (_, {input}, context) => OfferController.addOffer(input, context),
        removeOffer: (_, input, context) => OfferController.removeOffer(input.id, context),
    }
}