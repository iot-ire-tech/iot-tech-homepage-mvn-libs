#!/bin/sh -x


getRequest () 
{
SERVER=$1
ENDPOINT=$2

echo "INF: ENDPOINT ($ENDPOINT)"

	curl ${SERVER}/${ENDPOINT} -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: http://localhost:8084/iot-base/client/booking/bookingCreate.jsp?clientId=392436&patronId=731667' -H 'Content-Type: application/json; charset=utf-8' -H 'Origin: http://localhost:8084' -H 'Connection: keep-alive'
}

postRequest() {
SERVER=$1
ENDPOINT=$2
	curl ${SERVER}/${ENDPOINT} -H 'User-Agent: Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:63.0) Gecko/20100101 Firefox/63.0' -H 'Accept: application/json, text/javascript, */*; q=0.01' -H 'Accept-Language: en-US,en;q=0.5' --compressed -H 'Referer: http://localhost:8084/iot-base/client/booking/bookingCreate.jsp?clientId=392436&patronId=731667' -H 'Content-Type: application/json; charset=utf-8' -H 'X-Requested-With: XMLHttpRequest' -H 'Connection: keep-alive' -H 'Cookie: JSESSIONID=F175C731CF37D0FB9F22F99050155AD9' --data "$TESTDATA" 
}


clear
SERVER="http://localhost:8084/iot-base"
SERVER_REST="http://localhost:3000/"
ENDPOINT="CustomerId"

number="4319 3605 8884 3736"
number="4319360588843736"

# Test Generic
## Key : Test Token
TESTDATA='
{
	"name": "Anthony Ennis",
	"number": "4319360588843736",
	"csv": "964",
	"expYear": "2022",
	"expMonth": "2",
	"adddress1": "19 kerlogue road",
	"adddress2": "Ringsend",
	"city": "Dublin",
	"state": "Leinster",
	"zip": "4",
	"country": "IE",
	"email": "tonyennis@yahoo.com"
}
'
# Result Passed
## Bene Token Created 
## Payment Passed/Denied due to test key 

# Test DD month
TESTDATA='
{
	"name": "Anthony Ennis",
	"number": "4319360588843736",
	"csv": "964",
	"expYear": "2022",
	"expMonth": "02",
	"adddress1": "19 kerlogue road",
	"adddress2": "Ringsend",
	"city": "Dublin",
	"state": "Leinster",
	"zip": "4",
	"country": "IE",
	"email": "tonyennis@yahoo.com"
}
'
# Rest Passed
## Server Returned { "customerId" : "null" }

## INF : Token ID: (tok_1DTZprFOjjfpNUIxnz49h13L)
## 06-Nov-2018 19:03:36.638 SEVERE [http-nio-8084-exec-48] utils.stripe.Benefactor.create null
##  com.stripe.exception.CardException: Your card was declined. Your request was in test mode, but used a non test (live) card. For a list of valid test cards, visit: https://stripe.com/docs/testing.; code: card_declined; request-id: req_gqIeZEtA99UFVn

# Switched to Live Key and Passed
## { "customerId" : "cus_DvQjAMuGskVpPr" }


# Test Min Payload
TESTDATA='
{
	"name": "Anthony Ennis",
	"number": "4319360588843736",
	"csv": "964",
	"expYear": "2022",
	"expMonth": "02",
	"adddress1": "",
	"adddress2": "",
	"city": "",
	"state": "",
	"zip": "",
	"country": "",
	"email": "tonyennis@yahoo.com"
}
'
# Failed
##  com.stripe.exception.InvalidRequestException: You cannot set 'card[address_line1]' to an empty string. We interpret empty strings as null in requests. You may set 'card[address_line1]' to null to delete the property.



TESTDATA='
{
	"name": "Anthony Ennis",
	"number": "4319360588843736",
	"csv": "964",
	"expYear": "2022",
	"expMonth": "02",
	"adddress1": "null",
	"adddress2": "null",
	"city": "null",
	"state": "null",
	"zip": "null",
	"country": "null",
	"email": "tonyennis@yahoo.com"
}
'

# Passed : Cut down Visa is possible!!!

TESTDATA='
{
	"name": "Anthony Ennis",
	"number": "4319 3605 8884 3736",
	"csv": "964",
	"expYear": "2022",
	"expMonth": "02",
	"adddress1": "null",
	"adddress2": "null",
	"city": "null",
	"state": "null",
	"zip": "null",
	"country": "null",
	"email": "tonyennis@yahoo.com"
}
'
# Passed Spaces in CC number


# Duplicates Passed ?

TESTDATA='
{
	"name": "null",
	"number": "4319 3605 8884 3736",
	"csv": "964",
	"expYear": "2022",
	"expMonth": "02",
	"adddress1": "null",
	"adddress2": "null",
	"city": "null",
	"state": "null",
	"zip": "null",
	"country": "null",
	"email": "tonyennis@yahoo.com"
}
'
# Indeterminant



#########################################################
# Billing
########################################################
# Bill Customer (InCent)

ENDPOINT="PaymentByCustomerId"
TESTDATA='
{
"customerId":"cus_DvRaRShHybqXY8",
"amount":100,
"email":"tonyennis@yahoo.com"
}
'
# Passed
## Server { "status" : "succeeded" }
## Email Sent
## Stripe Payment processed.
## New Entry in payments inbox.


# Add Description to payment to include activity / ts purchased.


#########################################################
# bookableResource
########################################################
ENDPOINT="bookableResource?startDateMins_gte=25691340&endDateMins_lte=25691370"

getRequest $SERVER_REST  $ENDPOINT


#########################################################
# Resource Availability
########################################################
ENDPOINT="resourceAvailabilityDays?resourcePoolId=68538"


getRequest $SERVER_REST  $ENDPOINT


#########################################################
# Facks
# Customer ID
# One created in live mode, cannot be used in test mode!!
#
# Token
#
########################################################