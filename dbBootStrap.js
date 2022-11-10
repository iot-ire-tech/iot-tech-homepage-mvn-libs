/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var bootStrapDbObj = {

	"proto": "https",
	"host": "api.mlab.com",
	"port": "",
	"db": "",
	"key": "",
	"users": ""
};


class bootStrapDbItem {
	constructor(proto, host, port, key, db, httphdlr) {
		this.proto = proto
		this.host = host
		this.port = port
		this.key = key
		this.db = db
		this.httphdlr = httphdlr

		return this;
	}

	init() {
		try {


// Db EndPoints

// Modules
			this.salesControlEndpoint = "salesControl";
			this.salesControlCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.salesControlEndpoint);
			this.salesControlCtrl.init();

			this.stockControlEndpoint = "stockControl";
			this.stockControlCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.stockControlEndpoint);
			this.stockControlCtrl.init();
			this.stockControlRuleEndpoint = "stockControlRule";
			this.stockControlRuleCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.stockControlRuleEndpoint);
			this.stockControlRuleCtrl.init();

			this.posTopUpEndpoint = "posTopUp";
			this.posTopUpCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.posTopUpEndpoint);
			this.posTopUpCtrl.init();

			this.posRefundEndpoint = "posRefund";
			this.posRefundCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.posRefundEndpoint);
			this.posRefundCtrl.init();

			this.posRecieptEndpoint = "posReciept";
			this.posRecieptCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.posRecieptEndpoint);
			this.posRecieptCtrl.init();


			this.loggingEndpoint = "logs";
			this.loggingCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.loggingEndpoint);
			this.loggingCtrl.init();

			this.moduleBoxLeagueEndPoint = "moduleBoxLeague";
			this.moduleBoxLeagueCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.moduleBoxLeagueEndPoint);
			this.moduleBoxLeagueCtrl.init();

			this.mediaHubVisualEndPoint = "mediaHubVisual";
			this.mediaHubVisualCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.mediaHubVisualEndPoint);
			this.mediaHubVisualCtrl.init();

			this.mediaHubSocialEndPoint = "mediaHubSocial";
			this.mediaHubSocialCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.mediaHubSocialEndPoint);
			this.mediaHubSocialCtrl.init();

			this.costCenterEndPoint = "entityCosts";
			this.costCenterCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.costCenterEndPoint);
			this.costCenterCtrl.init();

			this.entityEndPoint = "entities";
			this.entityCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.entityEndPoint);
			this.entityCtrl.init();

			this.entityBarCodeEndPoint = "barCodes";
			this.entityBarCodeCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.entityBarCodeEndPoint);
			this.entityBarCodeCtrl.init();
			this.entityQrCodeEndPoint = "qRCodes";
			this.entityQrCodeCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.entityQrCodeEndPoint);
			this.entityQrCodeCtrl.init();

			this.entityGeoEndPoint = "entityGeo";
			this.entityGeoCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.entityGeoEndPoint);
			this.entityGeoCtrl.init();

			this.entityMembersEndPoint = "entitiesMembers";
			this.entityMembersCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.entityMembersEndPoint);
			this.entityMembersCtrl.init();

			this.resourceAvailabilityDowEndpoint = "entityAvailabilityDays";
			this.resourceAvailabilityDowCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.resourceAvailabilityDowEndpoint);
			this.resourceAvailabilityDowCtrl.init();


			this.paymentSplitEndpoint = "paymentSplits";
			this.paymentSplitCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.paymentSplitEndpoint);
			this.paymentSplitCtrl.init();

			this.billingRulePatronsEndpoint = "billingRulePatrons";
			this.billingRulePatronCatEndpoint = "billingRulePatronsCat";
			this.billingRuleEntityEndpoint = "billingRuleEntities";
			this.billingRatesEndpoint = "billingRates";
			this.billingUsageEndpoint = "billingUsage";

			this.billingRulePatronsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.billingRulePatronsEndpoint);
			this.billingRulePatronsCtrl.init();
			this.billingRulePatronCatCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.billingRulePatronCatEndpoint);
			this.billingRulePatronCatCtrl.init();
			this.billingRuleEntityCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.billingRuleEntityEndpoint);
			this.billingRuleEntityCtrl.init();
			this.billingRatesCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.billingRatesEndpoint);
			this.billingRatesCtrl.init();
			this.billingUsageCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.billingUsageEndpoint);
			this.billingUsageCtrl.init();



			this.clientEndpoint = "client";
			this.clientAddressEndpoint = "clientAddresses";
			this.clientLocationListsEndpoint = "clientLocations";
			this.clientRegistrationEndpoint = "clientRegistration"; // APP SERVER EP
			this.clientDbEndpoint = "clientDbs";
			this.clientEntitlementsEndpoint = "clientEntitlements";

			this.clientEntitlementsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.clientEntitlementsEndpoint);
			this.clientEntitlementsCtrl.init();
			this.clientDbCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.clientDbEndpoint);
			this.clientDbCtrl.init();
			this.clientCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.clientEndpoint);
			this.clientCtrl.init();
			this.clientAddressCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.clientAddressEndpoint);
			this.clientAddressCtrl.init();
			this.clientLocationCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.clientLocationListsEndpoint);
			this.clientLocationCtrl.init();


			this.patronEndpoint = "patrons";
			this.patronAccountEndpoint = "patronAccounts";
			this.patronAddressEndpoint = "patronAddresses";
			this.patronQrCodeEndpoint = "UploadQRCode";
			this.patronPaymentsEndpoint = "patronCredit";
			this.patronCreditEndpoint = "patronCredit";
			this.patronMediaEndPoint = "patronRichContent";
			this.patronSocialMediaEndPoint = "patronSocialMedia";


			this.patronMediaCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.patronMediaEndPoint);
			this.patronMediaCtrl.init();
			this.patronSocialMediaCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.patronSocialMediaEndPoint);
			this.patronSocialMediaCtrl.init();
			this.patronCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.patronEndpoint);
			this.patronCtrl.init();
			this.patronAccountCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.patronAccountEndpoint);
			this.patronAccountCtrl.init();
			this.patronAddressCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.patronAddressEndpoint);
			this.patronAddressCtrl.init();
			this.patronQrCodeCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.patronQrCodeEndpoint);
			this.patronQrCodeCtrl.init();
			this.patronPaymentsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.patronPaymentsEndpoint);
			this.patronPaymentsCtrl.init();
			this.patronCreditCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.patronCreditEndpoint);
			this.patronCreditCtrl.init();



			this.cardRegistrationEndpoint = "cardRegistration";
			this.cardTopUpEndpoint = "cardTopUp";
			this.cardRefundEndpoint = "cardRefund";
			this.cardRegistrationCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.cardRegistrationEndpoint);
			this.cardRegistrationCtrl.init();
			this.cardTopUpCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.cardTopUpEndpoint);
			this.cardTopUpCtrl.init();
			this.cardRefundCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.cardRefundEndpoint);
			this.cardRefundCtrl.init();

			this.analytics = "analytics";
			this.analyticsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.analytics);
			this.analyticsCtrl.init();

			this.resourceEndpoint = "resources";
			this.resourceSharesEndpoint = "resourceShares";
			this.resourceAvailEndpoint = "resourceAvailabilityDays";
			this.resourceAvailDatesEndpoint = "resourceUnAvailabilityDates";
			this.resourceBookingsEndpoint = "resourceBookings";


			this.resourceCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.resourceEndpoint);
			this.resourceCtrl.init();
			this.resourceShareCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.resourceSharesEndpoint);
			this.resourceShareCtrl.init();
			this.resourceAvailCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.resourceAvailEndpoint);
			this.resourceAvailCtrl.init();
			this.resourceBookingsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.resourceBookingsEndpoint);
			this.resourceBookingsCtrl.init();

			this.bookingsEndpoint = "bookings";
			this.bookingsRepeatEndpoint = "bookingsRepeats";
			this.bookingsRemindersEndpoint = "bookingsReminders";
			this.bookingsCommsEndpoint = "bookingsComms";
			this.bookingsAlertsEndpoint = "bookingsAlerts";
			this.bookingsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.bookingsEndpoint);
			this.bookingsCtrl.init();
			this.bookingsRepeatCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.bookingsRepeatEndpoint);
			this.bookingsRepeatCtrl.init();
			this.bookingsRemindersCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.bookingsRemindersEndpoint);
			this.bookingsRemindersCtrl.init();
			this.bookingsCommsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.bookingsCommsEndpoint);
			this.bookingsCommsCtrl.init();
			this.bookingsAlertsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.bookingsAlertsEndpoint);
			this.bookingsAlertsCtrl.init();

			this.eventEndpoint = "events";
			this.eventTypesEndpoint = "eventTypes";
			this.eventShareEndpoint = "eventShares";
			this.eventCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.eventEndpoint);
			this.eventCtrl.init();
			this.eventTypesCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.eventTypesEndpoint);
			this.eventTypesCtrl.init();
			this.eventShareCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.eventShareEndpoint);
			this.eventShareCtrl.init();
			this.subEventEndpoint = "subevents";
			this.subEventShareEndpoint = "subEventShares";
			this.membersListEndpoint = "membersList";
			this.subEventCostsEndpoint = "/subEventCosts";
			this.subEventMembersEndpoint = "/subEventMembers";
			this.subEventCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.subEventEndpoint);
			this.subEventCtrl.init();


			this.subEventMemberCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.membersListEndpoint);
			this.subEventMemberCtrl.init();
			this.subEventShareCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.subEventShareEndpoint);
			this.subEventShareCtrl.init();
			this.messageEndpoint = "messages";
			this.messageCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.messageEndpoint);
			this.messageCtrl.init();

			this.brandEndpoint = "brandingTargeted";
			this.brandCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.brandEndpoint);
			this.brandCtrl.init();

			this.brandWelcomeEndpoint = "brandingWelcome";
			this.brandWelcomeCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.brandWelcomeEndpoint);
			this.brandWelcomeCtrl.init();

			this.offeringsEndpoint = "offerings";
			this.offeringsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.offeringsEndpoint);
			this.offeringsCtrl.init();
			this.inboxBookingsEndpoint = "/InboxBookings";
			this.inboxShoppingItemsEndpoint = "/InboxShopItems";
			this.outboxShoppingItemsEndpoint = "OutboxShopItems";
			this.inboxAuthenticationEndpoint = "/InboxAuthentication";
			this.inboxServicesEndpoint = "/InboxServices";
			this.outboxShoppingItemsCtrl = new dbHandler(this.proto, this.host, this.port, this.key, this.db, this.httphdlr, this.outboxShoppingItemsEndpoint);
			this.outboxShoppingItemsCtrl.init();
			this.brandUploadEndpoint = "/UploadBranding";
			this.usersUploadEndpoint = "/UploadUsers";
			this.fileUploadEndpoint = "/UploadFile";
// Web Pages
			this.homepageEndpoint = contextPath;
			this.loginEndpoint = contextPath + "/pages/login/login.jsp";
			this.boxLeagueEndpoint = contextPath + "/pages/module_boxleague/boxleague.jsp";
// modules
			this.modboxLeagueEndpoint = "/leagueResults";
			this.modboxLeagueResultsEndpoint = "/leagueResults";
// Lists
			this.availabilityDateListEndpoint = "/availabilityDates";

		} catch (e) {
			throw "ERR: Bootstrap Init Issue"
		}
		// App Server
		return this;
	}
}