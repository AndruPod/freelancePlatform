import ApiError from "../error/ApiError.js";
import {UserOffer} from "../models/models.js";

class UserOfferController {

    async getAllUserOffers() {
        try {
            const userOffers = await UserOffer.findAll({raw: true});

            return userOffers.map(offer => ({
                id: {
                    user_id: offer.user_id,
                    offer_id: offer.offer_id,
                }
            }));

        } catch(e) {
            return ApiError.internal("Something went wrong", e)
        }
    }

    async getOneUserOffer(id) {
        try {

            if(!id) {
                return ApiError.internal("UserOffer not found");
            }

            const userOffer = await UserOffer.findOne({where: {id}});

            return {id: {user_id: userOffer.user_id, offer_id: userOffer.offer_id}};

        } catch(e) {
            return ApiError.internal("Something went wrong", e)
        }
    }

}

export default new UserOfferController()