var uxPlanWidget = function () {
    this.counter = 0;
    this.dataMap = new Map();
    this.addInit = false;

    this.init = function () {
        this.counter++;

        // TODO plans, add interval "one time" in which ux is chopped.

        // this.html = '            <span id="existingPlansHook"></span>'

        this.html = '      '
        this.html += '      <div class="w3-center">'
        this.html += '      <span id="addPlanItemMsg2Hdr"></span>'
        this.html += '      <span id="addPlanItemMsg2"></span>'
        this.html += '      </div>'
        this.html += '                <br>'
        this.html += '            <label><b>Name</b></label>'
        this.html += '            <input id=planName name=plan class="w3-input w3-hover-grey" type="text" required title="Give the plan a flashy name!"/> <br>'
        this.html += '            <label><b>Description </b></label>'
        this.html += '            <input id=planDescription name=plan class="w3-input w3-hover-grey" type="text" required'
        this.html += '                   title="Customer will use this description as their guide, think sales when pitching this plan!"/> <br>'


        this.html += '            <label><b>Unit Cost</b></label>'
        this.html += '            <input id=planCost name=plan class="w3-input w3-hover-grey" step=0.10 min=0 type="number" placeholder="0.00"'
        this.html += '              required title="To be distributed across whatever billing period you setup"/> <br>'
        this.html += '            <label><b>Billing Cycle</b></label>'
        this.html += '            <select id=planInterval class="w3-select" title="Is it to be a monthly plan, or a short lived daily plan?" required>'
        this.html += '                <option value="" disabled selected>Please Select</option>'
        this.html += '                <option value=day>Daily</option>'
        this.html += '                <option value=week>Weekly</option>'
        this.html += '                <option value=month>Monthly</option>'
        this.html += '                <option value=year>Yearly</option>'
        this.html += '            </select>'
        this.html += ''
        this.html += '            <label><b>Iterations </b></label>'
        this.html += '            <input id=planFrequency name=plan class="w3-input w3-hover-grey" type="number" min=1 max=12'
        this.html += '            title="how long will this plan run for, 6 months, 1 year?" required/> <br>'
        this.html += '     <span id=planFrequencyMsg class="w3-tag w3-yellow"></span> <br>'
        this.html += ''
        this.html += '            <fieldset>'
        this.html += '                <legend><b>Trail Period</b></legend>'
        this.html += '                <label>Is this subscription to include a trail period? </label> <br>'
        this.html += '                <input id=planTrialPeriod name=plan class="w3-input w3-hover-grey" type=checkbox'
        this.html += '                       title="Gifts are always nice to recieve, think happy customer!"/>'
        this.html += '                <br>'
        this.html += '                    <label><b>Number Of Days? [before which you can cancel subscription]</b></label> <br>'
        this.html += '                    <input id=trialPeriodDays name=plan disabled="" class="w3-input w3-hover-grey" type=number min="1" max=30'
        this.html += '                    title="30 day trail period is norm"/>'
        this.html += '                    <br>'
        this.html += '            </fieldset>'
        this.html += '      <div class="w3-center">'
        this.html += '      <span id="planConfirmationMsg"></span>'
        this.html += '            </div>'

        this.html += '            <br>'
        this.html += '            <br>'
        this.html += '            <div class="w3-row">'
        this.html += '            <div class="w3-half">'
        this.html += '      <span  id="addPlanItemMsg"></span>'
        this.html += '                    <br>'
        this.html += '      <span  >Sequence: Add one or more plan(s), then save the plan(s) to model</span>'
        this.html += '                    <br>'
        this.html += '      <button class="w3-button w3-round w3-blue  w3-padding w3-left addPlanItem">Add New Plan</button>'
        this.html += '            </div>'
        this.html += '            <div class="w3-half">'
        this.html += '      <span id="saveProductPlanMsg"></span>'
        this.html += '                    <br>'
        this.html += '      <button class="w3-button w3-round w3-blue w3-padding w3-right saveProductPlan">Save</button>'
        this.html += '            </div>'
        this.html += '            </div>'

        return this.html;
    }
};

clientSide:{
    function widgetPlans(optionsHtml) {
        var counter = 0

        var html = "<select id=selectPlans   size=10  class='w3-select ' style='overflow: auto; max-height: 600px;height: 600px; ; font-size: " + selectFontsize + ";' required>";
        html += "<option disabled selected>Please Select</option>";
        html += optionsHtml
        html += "</select>";
        return html;
    }

}
//# sourceURL=api_plan_widget.js