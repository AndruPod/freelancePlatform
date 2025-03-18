import {Offer, UserOffer} from '../models/models.js';
import ApiError from "../error/ApiError.js";

class OfferController {

    async addOffer(input, {user}) {
        try {
            const {title, description, category} = input;

            const offer = await Offer.create({title, description, category}, {raw: true});
            await UserOffer.create({user_id: user.id, offer_id: offer.id});
            return offer;
        } catch (e) {
            return ApiError.internal(e);
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
            return ApiError.internal("Something went wrong");
        }
    }

    async getAllOffers() {

        try {
            const offers = await Offer.findAndCountAll();
            return offers.rows.map(offer => ({
                id: offer.id,
                title: offer.title,
                description: offer.description,
                category: offer.category,
                })
            );
        } catch(e) {
            return ApiError.internal("Something went wrong");
        }

    }

    async getOneOffer(id) {
        try {

            if(!id) {
                return ApiError.badRequest("Offer ID should be provided");
            }

            const offer = await Offer.findOne({where: {id}});
            if(!offer) {
                return ApiError.badRequest("No offer found");
            }

            return offer;

        } catch(e) {
            return ApiError.internal("Something went wrong");
        }
    }

}

export default new OfferController();