import ApiError from "../error/ApiError.js";

class UserOfferController {

    async getAllUserOffers() {
        try {
            
        } catch(e) {
            return ApiError.internal("Something went wrong", e)
        }
    }

}

export default new UserOfferController()