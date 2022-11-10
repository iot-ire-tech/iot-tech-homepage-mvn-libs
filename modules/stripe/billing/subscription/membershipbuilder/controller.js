/*
 *https://stripe.com/docs/billing/subscriptions/products-and-plans
 Plans are at the heart of subscriptions
 * establishing the billing cycle, currency, and base cost.
 - product Id
 - amount
 - interval
 - currenty (hese three attributes are all fixed on a plan once created,)
 Every plan is attached to a product
 * which represents the application or service offered to customers.
 Products can have more than one plan
 * reflecting variations in price and duration—such as monthly and annual pricing at different rates.
 - name
 - type
 - meta


 Eg:
 Product IOT Subscription
 - plan: entry level
 - plan: pro level
 - plan: prem level
 The product will have three different plans now associated with it!

 Product - Squash/Swiming
 - plan: entry level
 - plan: pro level
 - plan: prem level

 # Subscriptions
 If your business offers multiple products, subscribe your customer to multiple plans on a single subscription.
 This generates a single invoice each billing period that combines every plan.
 Only a single payment for that invoice is required, reducing your costs and the number of charges your customer sees.

 Subscription : Mega Deal
 Plan: Squash SummerCamp
 Plan: Swimming Daily
 Plan: Gym Niglty

 */
// Rule
// Currency and interval fields must match across all plans on this subscription
// Subscript must have customer and plans id attached.
// $(document).on('click', '#addPlan', function () {

// 	modelContext.plan.accountId = accountId;
// 	PlanAdd(modelContext.plan)
//
// //	widgetUpdatePlans();
// //	widgetUpdateProducts("planBuilder");
// 	$("#selectPlanListHook").html(widgetUpdatePlans())
// //	$("#selectProduct4PBuilderListHook").html(widgetUpdateProducts("planBuilder"))
//
// // Reset From
// 	$("input[name=plan]").each(function () {
// 		$(this).val("")
// 	})
// 	$("#planInterval").val(1)


// });



//# sourceURL=stripe_membership_builder_ctrl.js