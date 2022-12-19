from flask_wtf import FlaskForm
import sqlalchemy as sa
import wtforms

from pcapi.core.offerers import models as offerers_models
from pcapi.models.validation_status_mixin import ValidationStatus

from . import fields
from . import utils


def _get_tags_query() -> sa.orm.Query:
    return (
        offerers_models.OffererTag.query.join(offerers_models.OffererTagCategoryMapping)
        .join(offerers_models.OffererTagCategory)
        .filter(offerers_models.OffererTagCategory.name == "homologation")
        .order_by(offerers_models.OffererTag.label)
    )


class OffererValidationListForm(FlaskForm):
    class Meta:
        csrf = False

    q = fields.PCOptSearchField("Nom de structure, SIREN, code postal, département, ville, email, nom de compte pro")
    tags = fields.PCQuerySelectMultipleField(
        "Tags", query_factory=_get_tags_query, get_pk=lambda tag: tag.id, get_label=lambda tag: tag.label
    )
    status = fields.PCSelectMultipleField("États", choices=utils.choices_from_enum(ValidationStatus))
    from_date = fields.PCDateField("Demande à partir du", validators=(wtforms.validators.Optional(),))
    to_date = fields.PCDateField("Demande jusqu'au", validators=(wtforms.validators.Optional(),))

    page = wtforms.HiddenField("page", default="1", validators=(wtforms.validators.Optional(),))
    per_page = fields.PCSelectField(
        "Par page",
        choices=(("10", "10"), ("25", "25"), ("50", "50"), ("100", "100")),
        default="100",
        validators=(wtforms.validators.Optional(),),
    )

    def validate_q(self, q: fields.PCOptSearchField) -> fields.PCOptSearchField:
        if q.data and q.data.isnumeric() and len(q.data) not in (2, 3, 5, 9):
            raise wtforms.validators.ValidationError(
                "Le nombre de chiffres ne correspond pas à un SIREN, code postal ou département"
            )
        return q


class UserOffererValidationListForm(FlaskForm):
    class Meta:
        csrf = False

    tags = fields.PCQuerySelectMultipleField(
        "Tags", query_factory=_get_tags_query, get_pk=lambda tag: tag.id, get_label=lambda tag: tag.label
    )
    status = fields.PCSelectMultipleField(
        "États de la demande de rattachement", choices=utils.choices_from_enum(ValidationStatus)
    )
    offerer_status = fields.PCSelectMultipleField(
        "États de la structure", choices=utils.choices_from_enum(ValidationStatus)
    )
    from_date = fields.PCDateField("Demande à partir du", validators=(wtforms.validators.Optional(),))
    to_date = fields.PCDateField("Demande jusqu'au", validators=(wtforms.validators.Optional(),))

    page = wtforms.HiddenField("page", default="1", validators=(wtforms.validators.Optional(),))
    per_page = fields.PCSelectField(
        "Par page",
        choices=(("10", "10"), ("25", "25"), ("50", "50"), ("100", "100")),
        default="100",
        validators=(wtforms.validators.Optional(),),
    )


class CommentForm(FlaskForm):
    comment = fields.PCCommentField("Commentaire interne pour la structure")


class OptionalCommentForm(FlaskForm):
    comment = fields.PCOptStringField("Commentaire interne")


class TopActorForm(FlaskForm):
    # Optional because the request is sent with an empty value when disabled, "on" when enabled
    is_top_actor = wtforms.HiddenField("Top acteur", validators=(wtforms.validators.Optional(),))
