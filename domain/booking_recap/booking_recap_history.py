from datetime import datetime


class BookingRecapHistory:
    def __init__(self,
                 booking_date: datetime):
        self.booking_date = booking_date


class BookingRecapHistoryWithValidation(BookingRecapHistory):
    def __init__(self, date_used: datetime, **kwargs):
        super().__init__(**kwargs)
        self.date_used = date_used


class BookingRecapHistoryWithPayment(BookingRecapHistoryWithValidation):
    def __init__(self, payment_date: datetime, **kwargs):
        super().__init__(**kwargs)
        self.payment_date = payment_date


class BookingRecapHistoryWithCancellation(BookingRecapHistory):
    def __init__(self, cancellation_date: datetime, **kwargs):
        super().__init__(**kwargs)
        self.cancellation_date = cancellation_date
