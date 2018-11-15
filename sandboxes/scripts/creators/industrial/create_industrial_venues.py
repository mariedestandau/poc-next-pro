import re

from models.pc_object import PcObject
from utils.logger import logger
from utils.test_utils import create_venue

def create_industrial_venues(offerers_by_name):
    logger.info('create_industrial_venues')

    venue_by_name = {}
    for (offerer_name, offerer) in offerers_by_name.items():
        geoloc_match = re.match(r'(.*)lat\:(.*) lon\:(.*)', offerer_name)
        venue_by_name[offerer_name] = create_venue(
            offerer,
            address=offerer.address,
            booking_email="fake@email.com",
            city=offerer.city,
            comment="Pas de siret car je suis un mock.",
            latitude=float(geoloc_match.group(2)),
            longitude=float(geoloc_match.group(3)),
            name=offerer.name,
            postal_code=offerer.postalCode,
            siret=None
        )

        venue_by_name["{} (Offre en ligne)".format(offerer_name)] = create_venue(
            offerer,
            is_virtual=True,
            name="{} (Offre en ligne)".format(offerer.name),
            siret=None
        )

    PcObject.check_and_save(*venue_by_name.values())

    return venue_by_name
