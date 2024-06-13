# paystack_utils.py
from paystackapi.paystack import Paystack
from paystackapi.transaction import Transaction
from django.conf import settings
import uuid

paystack = Paystack(secret_key=settings.PAYSTACK_SECRET_KEY)

def initialize_transaction(email, amount):
    response = Transaction.initialize(reference=str(uuid.uuid4()), 
                                      amount=amount, 
                                      email=email)
    return response
