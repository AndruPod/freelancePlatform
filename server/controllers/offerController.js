import {Offer, UserOffer} from '../models/models.js';
import ApiError from "../error/ApiError.js";

class OfferController {

    async addOffer(input, {user}) {
        try {
            const {title, description, category} = input;

            const offer = await Offer.create({title, description, category, UserId: user.id});
            await UserOffer.create({user_id: user.id, offer_id: offer.id});
            return offer;
        } catch (e) {
            return ApiError.internal("Something went wrong", e);
        }
    }

    async removeOffer(id, {user}) {
        try {

            if(!user) {
                return ApiError.badRequest("You can't do it!");
            }

            await Offer.destroy({where: {id}});
            return true;

        } catch(e) {
            return ApiError.internal("Something went wrong", e);
        }
    }

    async getAllOffers() {

        try {
            const offers = await Offer.findAndCountAll();
            const offerList = offers.rows.map(offer => ({
                id: offer.id,
                title: offer.title,
                description: offer.description,
                category: offer.category,
                })
            );
            return offerList;
        } catch(e) {
            return ApiError.internal("Something went wrong", e);
        }

    }

    async getOneOffer(id) {
        try {

            const offer = await Offer.findOne({where: {id}});
            if(!offer) {
                return ApiError.badRequest("No offer found");
            }

            return offer;

        } catch(e) {
            return ApiError.internal("Something went wrong", e);
        }
    }

}

export default new OfferController();