from flask_login import current_user
from flask_login import login_required

import pcapi.core.offers.api as offers_api
from pcapi.core.offers.api import create_offer
from pcapi.core.offers.api import list_offers_for_pro_user
import pcapi.core.offers.repository as offers_repository
from pcapi.flask_app import private_api
from pcapi.models import Offer
from pcapi.models import RightsType
from pcapi.models.api_errors import ResourceNotFoundError
from pcapi.repository import offer_queries
from pcapi.routes.serialization.dictifier import as_dict
from pcapi.routes.serialization.offers_recap_serialize import serialize_offers_recap_paginated
from pcapi.routes.serialization.offers_serialize import GetOfferResponseModel
from pcapi.routes.serialization.offers_serialize import ListOffersQueryModel
from pcapi.routes.serialization.offers_serialize import ListOffersResponseModel
from pcapi.routes.serialization.offers_serialize import OfferResponseIdModel
from pcapi.routes.serialization.offers_serialize import PatchAllOffersActiveStatusBodyModel
from pcapi.routes.serialization.offers_serialize import PatchOfferActiveStatusBodyModel
from pcapi.routes.serialization.offers_serialize import PatchOfferBodyModel
from pcapi.routes.serialization.offers_serialize import PostOfferBodyModel
from pcapi.serialization.decorator import spectree_serialize
from pcapi.use_cases.update_an_offer import update_an_offer
from pcapi.use_cases.update_offers_active_status import update_offers_active_status
from pcapi.utils.human_ids import dehumanize
from pcapi.utils.includes import OFFER_INCLUDES
from pcapi.utils.rest import ensure_current_user_has_rights
from pcapi.utils.rest import load_or_404
from pcapi.utils.rest import login_or_api_key_required


@private_api.route("/offers", methods=["GET"])
@login_required
@spectree_serialize(response_model=ListOffersResponseModel)  # type: ignore
def list_offers(query: ListOffersQueryModel) -> ListOffersResponseModel:
    paginated_offers = list_offers_for_pro_user(
        user_id=current_user.id,
        user_is_admin=current_user.isAdmin,
        offerer_id=query.offerer_id,
        venue_id=query.venue_id,
        type_id=query.type_id,
        offers_per_page=query.paginate,
        name_keywords=query.name,
        page=query.page,
        status=query.status,
        creation_mode=query.creation_mode,
        period_beginning_date=query.period_beginning_date,
        period_ending_date=query.period_ending_date,
    )

    return ListOffersResponseModel(**serialize_offers_recap_paginated(paginated_offers))


@private_api.route("/offers/<offer_id>", methods=["GET"])
@login_required
@spectree_serialize(response_model=GetOfferResponseModel)
def get_offer(offer_id: str) -> GetOfferResponseModel:
    offer = load_or_404(Offer, offer_id)
    return GetOfferResponseModel(**as_dict(offer, includes=OFFER_INCLUDES))


@private_api.route("/offers", methods=["POST"])
@login_or_api_key_required
@spectree_serialize(response_model=OfferResponseIdModel, on_success_status=201)  # type: ignore
def post_offer(body: PostOfferBodyModel) -> OfferResponseIdModel:
    offer = create_offer(offer_data=body, user=current_user)
    return OfferResponseIdModel.from_orm(offer)


@private_api.route("/offers/active-status", methods=["PATCH"])
@login_or_api_key_required
@spectree_serialize(response_model=None, on_success_status=204)  # type: ignore
def patch_offers_active_status(body: PatchOfferActiveStatusBodyModel) -> None:
    update_offers_active_status(body.ids, body.is_active)


@private_api.route("/offers/all-active-status", methods=["PATCH"])
@login_or_api_key_required
@spectree_serialize(response_model=None, on_success_status=204)
def patch_all_offers_active_status(body: PatchAllOffersActiveStatusBodyModel) -> None:
    query = offers_repository.get_offers_by_filters(
        user_id=current_user.id,
        user_is_admin=current_user.isAdmin,
        offerer_id=body.offerer_id,
        status=body.status,
        venue_id=body.venue_id,
        type_id=body.type_id,
        name_keywords=body.name,
        creation_mode=body.creation_mode,
        period_beginning_date=body.period_beginning_date,
        period_ending_date=body.period_ending_date,
    )
    offers_api.update_offers_active_status(query, body.is_active)

    return "", 204


@private_api.route("/offers/<offer_id>", methods=["PATCH"])
@login_or_api_key_required
@spectree_serialize(response_model=OfferResponseIdModel)  # type: ignore
def patch_offer(offer_id: str, body: PatchOfferBodyModel) -> OfferResponseIdModel:
    offer = offer_queries.get_offer_by_id(dehumanize(offer_id))

    if not offer:
        raise ResourceNotFoundError

    ensure_current_user_has_rights(RightsType.editor, offer.venue.managingOffererId)
    offer = update_an_offer(offer, modifications=body.dict(exclude_unset=True))

    return OfferResponseIdModel.from_orm(offer)
