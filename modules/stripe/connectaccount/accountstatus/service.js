/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var business_type = false;

function getAccountRequirementsStatus(accountId) {
    var accountPayload = {
        "accountId": accountId
    };

    var status = {
        "currently_due": false,
        "eventually_due": false,
        "pending_verification": false,
        "disabled_reason": ""
    };

    accountRequirements = postRequest("AccountQueryRequirements", accountPayload);

    if (accountRequirements.eventually_due.length > 0)
        status.eventually_due = true;
    if (accountRequirements.currently_due.length > 0)
        status.currently_due = true;
    if (accountRequirements.pending_verification.length > 0)
        status.pending_verification = true;

    status.disabled_reason = accountRequirements.disabled_reason;

    return status
}

function getAccountCompliance(accountId) {
    var status = getAccountRequirementsStatus(accountId)

    if (status.eventually_due === false && status.currently_due === false && status.pending_verification === false) {
        return true;
    } else
        return false;
}

function getAccountRequirementsWidget(accountId) {
    var htmlRequirments = "";
    var htmlRequirmentsCurrent = "";
    var htmlRequirmentsEventually = "";
    var currentDue = false;
    var eventuallyDue = false;
    var htmlRequirmentsPending = "";
    var pendingDue = false;

    var accountPayload = {
        "accountId": accountId
    };

    accountRequirements = postRequest("AccountQueryRequirements", accountPayload);

    if (accountRequirements.disabled_reason === null) {
        htmlRequirments = "<br><div class='account-stats w3-center w3-padding-large w3-green'><br><h3>Your account has meet all its requirements. <br> Both payments, and payouts are now available on your account!</h3><br></div> "

        $("#requirmentsHook").append(htmlRequirments)

    } else {
        htmlRequirmentsCurrent = "<h3>Currently Due...</h3>"
        accountRequirements.currently_due.forEach(function (item) {
            currentDue = true;
            tmp = item.replace("/\./g", " ")
            tmp = item.split('.').join('  ');
            tmp = item.split('_').join('  ');
            htmlRequirmentsCurrent += "<span>* " + tmp + "</span><br>"
        })

        htmlRequirmentsEventually = "<h3>Eventually Due<h3>"
        accountRequirements.eventually_due.forEach(function (item) {
            eventuallyDue = true;
            htmlRequirmentsEventually += "<span>* " + item + "</span><br>"
        })

        htmlRequirmentsPending = "<h3>Pending Verification....</h3>"
        accountRequirements.pending_verification.forEach(function (item) {
            pendingDue = true;
            tmp = item.replace("/\./g", " ")
            tmp = item.split('.').join('  ');
            tmp = item.split('_').join('  ');
            htmlRequirmentsPending += "<span>* " + tmp + ".....Please rectify here</span> <br>"
        })

        html = "<br><div class='account-stats w3-center w3-yellow'>Your account has not meet all platform requirements yet. </div> "
        html += "<br><div class='account-stats w3-center w3-yellow'>Reason Code: " + accountRequirements.disabled_reason + "</div> "
        html += "<br><div class='account-stats w3-center w3-yellow'>If it is the case that you have just recently uploaded you account documentation in the last hour, then wait as there could be a back log</div> "
        html += "<br><div class='account-stats w3-center w3-yellow'>If this has continued longer that a day, then contact support. With information below</div> "

        if (currentDue) {
            html += htmlRequirmentsCurrent
        }

        if (eventuallyDue)
            html += htmlRequirmentsEventually

        if (pendingDue) {
            html += htmlRequirmentsPending
        }
        html += "<hr>"

        $("#requirmentsHook").append(html)
    }

    return html;
}

function getAccountStatus(accountId) {


    var accountPayload = {
        "accountId": accountId
    };
    accountRequirements = postRequest("AccountQueryRequirements", accountPayload);
    if (accountRequirements.disabled_reason === "requirements.past_due") {
        return "INF: You account type has items that are passed due. Please update account, or contact support asap"
    }

    // Accoun Type
    accountPayload = {
        "accountId": accountId
    };
    accountDetail = postRequest("AccountGet", accountPayload);

    if (accountDetail.business_type === null) {
        return "INF: You account type is not determined as business or individual/retail. Please update account, or contact support asap"
    }
    business_type = true

    //
    // if (accountDetail.business_type.toString().includes("company"))
    //     onboardingUrl = "<a target=_blank href=" + location.origin + contextPath + "/services/modules/stripe/connectaccount/business/release/profile.jsp?accountId=" + accountId + "> launch</a>"
    // else
    //     onboardingUrl = "<a target=_blank href=" + location.origin + contextPath + "/services/modules/stripe/connectaccount/individual/release/profile.jsp?accountId=" + accountId + "> launch</a>"

    var htmlRequirments = "";
    var htmlRequirmentsCurrent = "";
    var htmlRequirmentsEventually = "";
    var currentDue = false;
    var eventuallyDue = false;
    var htmlRequirmentsPending = "";
    var pendingDue = false;

    htmlRequirmentsCurrent += "<h3>Currently Due...</h3>"
    accountRequirements.currently_due.forEach(function (item) {
        currentDue = true;
        tmp = item.replace("/\./g", " ")
        tmp = item.split('.').join('  ');
        tmp = item.split('_').join('  ');
        if (tmp.includes("external_account"))
            htmlRequirmentsCurrent += "* " + tmp + ".....Please rectify here <a target=_blank href=" + location.origin + contextPath + "/services/modules/stripe/connectaccount/extBankAccount/release/form.jsp?accountId=" + accountId + "> lauch</a><br>"
        else
            htmlRequirmentsCurrent += "* " + tmp + ".....Please rectify here " + onboardingUrl + "<br>"

    })

    htmlRequirmentsEventually += "<h3>Eventually_due<h3>"
    accountRequirements.eventually_due.forEach(function (item) {
        eventuallyDue = true;
        htmlRequirmentsEventually += item + "<br>"

    })
//	htmlRequirments += "<br>Past_due<br>"
//	accountRequirements.past_due.forEach(function (item) {
//		htmlRequirments += item + "<br>"
//
//	})
//
    htmlRequirmentsPending += "<h3>Pending Verification....</h3>"
    accountRequirements.pending_verification.forEach(function (item) {
        pendingDue = true;
        tmp = item.replace("/\./g", " ")
        tmp = item.split('.').join('  ');
        tmp = item.split('_').join('  ');
        if (tmp.includes("external_account"))
            htmlRequirmentsPending += "* " + tmp + ".....Please rectify here <a target=_blank href=" + location.origin + contextPath + "/services/modules/stripe/connectaccount/extBankAccount/release/form.jsp?accountId=" + accountId + "> lauch</a><br>"
        else
            htmlRequirmentsPending += "* " + tmp + ".....Please rectify here " + onboardingUrl + "<br>"

    })

    if (accountRequirements.disabled_reason === null) {
        htmlRequirments = "<br><div class='account-stats w3-center w3-padding-large w3-green'><br><h3>Your account has meet all its requirements. <br> Both payments, and payouts are now available on your account!</h3><br></div> "
        $("#requirmentsHook").append(htmlRequirments)

    } else {


        tmp = "<br><div class='account-stats w3-center w3-yellow'>Your account has not meet all platform requirements yet. Please update this account</div> "
        tmp += "<br><div class='account-stats w3-center w3-yellow'>Reason Code: " + accountRequirements.disabled_reason + "</div> "
        tmp += "<br><div class='account-stats w3-center w3-yellow'>Please update this account, and/or contact support</div> "
        if (currentDue) {
            tmp += htmlRequirmentsCurrent
        }

//		if (eventuallyDue)
//			tmp += htmlRequirmentsEventually

        if (pendingDue) {
            tmp += htmlRequirmentsPending
        }
        tmp += "<hr>"

        $("#requirmentsHook").append(tmp)
    }

}

//# sourceURL=onboarding_account_status_service.js
