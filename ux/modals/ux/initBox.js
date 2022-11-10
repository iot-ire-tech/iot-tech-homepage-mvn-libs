/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */




// Modals
var cardSignUpHdr = "<i class=\"address book outline icon\"></i> Info Point: Credit Card Details";
var quickSignUpHdr = "<i class=\"address book outline icon\"></i> Info Point: Customer Details";
var noBoxLeagueHdr = "<i class=\"address book outline icon\"></i> Info Point: Box League Details";
var noActivitiesHdr = "<i class=\"address book outline icon\"></i> Info Point: Box League Details";
var noPlayerSelectedHdr = "<i class=\"address book outline icon\"></i> Info Point: No Player Details Entered";
var resourceAvailabilityHdr = "<i class=\"address book outline icon\"></i> Info Point: Activity Timetable";
var resourceEnquiriesHdr = "<i class=\"address book outline icon\"></i> Info Point: Owner Contact Card";
var supportRequestHdr = "<i class=\"address book outline icon\"></i> Info Point: Support/Enhancement Request";
var inboxHdr = "<i class=\"address book outline icon\"></i> Info Point: Inbox Service";
var tourHdr = "<i class=\"address book outline icon\"></i> Info Point: Learning Service";
var suggestionBoxHdr = "<i class=\"address book outline icon\"></i> Info Point: Customer Service";
var periodicalHdr = "<i class=\"bell icon\"></i> Info Point: Announcement";
var tdr = "IOT Technologies at your service!!!";
var cardSignUpTdr = "IOT Technologies at your service!!!";
var quickSignUpTdr = "IOT Technologies at your service!!!";
var noBoxLeagueTdr = "IOT Technologies at your service!!!";
var noActivitiesTdr = "IOT Technologies at your service!!!";
var noPlayerSelectedTdr = "IOT Technologies at your service!!!";
var resourceAvailabilityTdr = "IOT Technologies at your service!!!";
var supportRequestTdr = "IOT Technologies at your service!!!";
var inboxTdr = "IOT Technologies at your service!!!";
var tourTdr = "IOT Technologies at your service!!!";
var suggestionBoxTdr = "IOT Technologies at your service!!!";
var periodicalTdr = "IOT Technologies at your service!!!";
var quickSignUp;



/*
 * Site Tour - START
 */
tourMessages = `
      <h6>Learning Corner</h6>
      <p>New lesson for today....</p>
      <hr>

      <span id=newMsgContentHook></span>
      <span id=msgResult></span>
`;

inboxMessages = `
      <h6>Message Corner</h6>
      <p>New announcement for today....</p>
      <hr>

      <span id=newMsgContentHook></span>


      <span id=msgResult></span>

`;


suggestionBoxMessages = `
      <h6>Suggestion Box</h6>
      <p><img src="../../resources/media/imgs/quality.png" style="width:8%" ></p>
      <hr>
      <span id=newMsgContentHook class="w3-center"><b>Continuous Improvement is at the heart of what we do, thank your for your feedback</b></span>
      <hr>
      <span id=msgResult></span>
`;

quickSignUp = `
      <h6>Sign Up</h6>
      <p>On successful completion two emails will be set out, please follow instructions.</p>
      <p>Please fill in this form to create an account. All fields are mandatory</p>
      <hr>

      <br>
      <i class="address book icon"></i>
      <div class="ui left pointing label"> Full Name </div>
      <input type="text" placeholder="Enter Your Full Name" id="name" required>
      <span id=msgFullName></span>

      <br>
      <i class="envelope outline icon"></i>
      <div class="ui left pointing label">Username [Email] </div>
      <input type="text" placeholder="Enter Email" id="email" type=email required>
      <span id=msgEmail></span>

      <br>
      <i class="envelope outline icon"></i>
      <div class="ui left pointing label"> Mobile </div>
      <input type="text" placeholder="Enter Mobile" id="mobile" type=phone required>
      <span id=msgMobile></span>


      <br>
      <i class="user secret icon"></i>
      <div class="ui left pointing label"> Password [Greater than 6 chars long] </div>
      <input type="password" placeholder="Enter Password" id="pass" required>
      <span id=msgPass></span>

      <br>
      <i class="user secret icon"></i>
      <div class="ui left pointing label"> Repeat Password </div>
      <input type="password" placeholder="Repeat Password" id="repeatpass" required>
      <span id=msgPassRepeat></span>

      <span id=msgResult></span>

`;
//      <p>By creating an account you agree to our <a href="#" style="color:dodgerblue">Terms & Privacy</a>.</p>

//    <br><br>
//     <i class=\"fa fa-support\"></i>
//    <label> Request Type </label>
//      <br>
//      <select>
//        <option value=\"volvo\">Please Select</option>
//        <option value=\"volvo\">Support Request</option>
//        <option value=\"volvo\">Feature Request</option>
//        <option value=\"volvo\">Feedback</option>
//        <option value=\"volvo\">Other</option>
//      </select>

var noBoxLeagueMsg;
noBoxLeagueMsg = `
  <h6>Set Up</h6>
      <p>It would seem that the box league event has not be setup</p>
      <p>Please contact system administrator to have the event setup</p>
`;
var noActivitiesMsg;
noActivitiesMsg = `
  <h6>Set Up</h6>
      <p>It would seem that the box league has not be setup</p>
      <p>Please contact squash administrator to have the activities such as Box A, B, C, etc setup</p>
`;
var noPlayerSelectedMsg;
noPlayerSelectedMsg = `
  <h6>Result Details</h6>
      <p>It would seem that you have not entered your and/or your opponents results</p>
      <p>Please update before saving results</p>
`;
var boxLeagueResultsUpdatedHdr = "Info Point: Squash Box League";
var boxLeagueResultsUpdatedTdr = "IOT Tech at your service";
var boxLeagueResultsUpdatedMsg;
boxLeagueResultsUpdatedMsg = `
  <h6>Box League Results</h6>
  <p>Thank you for updating the league with your results </p>
  <p>Your box members will recieve an email of the results.</p>
`;