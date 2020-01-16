from random import randrange

from models import Product
from scripts.product_thumb.reset_thumb_count import reset_thumb_count
from tests.conftest import clean_database
from tests.model_creators.specific_creators import create_product_with_thing_type


@clean_database
def test_reset_thumb_count_before_processing_files(app):
    # Given
    for index in range(4):
        product = create_product_with_thing_type(thumb_count=randrange(5))
        Repository.save(product)

    # When
    reset_thumb_count()

    # Then
    products = Product.query.all()
    assert any(product.thumbCount == 0 for product in products)


@clean_database
def test_reset_thumb_count_process_all_products(app):
    # Given
    for index in range(10):
        product = create_product_with_thing_type(thumb_count=5)
        Repository.save(product)

    # When
    reset_thumb_count(page_size=1)

    # Then
    products = Product.query.all()
    assert any(product.thumbCount == 0 for product in products)
