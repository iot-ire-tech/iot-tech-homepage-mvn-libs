#!/bin/sh



curl https://api.stripe.com/v1/tokens  \
-u sk_test_PWxKayhQchfhGUlEaMT6DE8x: \
-d email=tonyennis@yahoo.com  \
-d card[number]=4242424242424242  \
-d card[exp_month]=12  \
-d card[exp_year]=2019 \
-d card[cvc]=123

