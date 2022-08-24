// showing succes messages
function success(Id, msgId, msg = "") {
  document.getElementById(`${msgId}`).innerText = msg;
}
// showing error messages
function error(Id, msgId, msg = "") {
  document.getElementById(`${msgId}`).innerText = msg;
}
// getting all input vlaues
function getValues() {
  let name = document.getElementById("fullname").value;
  let email = document.getElementById("email").value;
  let pan = document.getElementById("pan").value;
  let amount = document.getElementById("amount").value;

  let isName = formValidation.Name(name);
  let isEmail = formValidation.Email(email);
  let isPan = formValidation.Pan(pan);
  let isAmount = formValidation.Amount(amount);
  return { isName: isName, isEmail: isEmail, isPan: isPan, isAmount: isAmount };
}
// checking all input field is valid on form change
function checkSubmit() {
  let value = getValues();
  // all valid then sbmut button work
  if (
    value.isName &&
    value.isEmail &&
    value.isPan &&
    value.isAmount &&
    isRecaptcha
  ) {
    document.getElementById("submitbutton").disabled = false;
    document.getElementById("submitbutton").classList.remove("errorsubmit");
    document.getElementById("submitbutton").classList.add("successsubmit");
  } else {
    document.getElementById("submitbutton").classList.remove("successsubmit");
    document.getElementById("submitbutton").classList.add("errorsubmit");
    document.getElementById("submitbutton").disabled = true;
  }
  //recaptcha button checking
  // if all input field name , email, pan and amount are valid then button workable
  if (value.isName && value.isEmail && value.isPan && value.isAmount) {
    document.getElementById("checkcaptchabutton").disabled = false;
    document
      .getElementById("checkcaptchabutton")
      .classList.remove("errorsubmit");
    document
      .getElementById("checkcaptchabutton")
      .classList.add("successsubmit");
  } else {
    document.getElementById("checkcaptchabutton").classList.add("errorsubmit");
    document.getElementById("checkcaptchabutton").disabled = true;
  }
}
// check captcha on submit
let btn = document.getElementById("checkcaptchabutton");
btn.addEventListener(
  "click",
  function () {
    let value = document.getElementById("recaptcha").value;
    if (value == data.ans) {
      isRecaptcha = true;
      success("recaptcha", "captchamsg", "Success!");
      checkSubmit();
      document.getElementById("captchabutton").disabled = true;
      document.getElementById("checkcaptchabutton").disabled = true;
    } else {
      error("recaptcha", "captchamsg", "Oops, wrong ans try again");
    }
  },
  false
);
// reload chaptcha on clicking reload button
btn = document.getElementById("captchabutton");
btn.addEventListener(
  "click",
  function () {
    data = formValidation.generateCaptcha();
    let question = data.question;
    let s = "";
    while (question) {
      s += question % 10;
      s += "  ";
      question = parseInt(question / 10);
    }
    document.getElementById("captchalabel").innerText = s;
  },
  false
);
// checking name valid or not and showing message
function getFullName() {
  let name = document.getElementById("fullname").value;
  if (formValidation.Name(name)) {
    success("fullname", "fullnamemsg");
  } else {
    error("fullname", "fullnamemsg", "should have min 2 word with 4 char");
  }
}
// checking email valid or not and showing message
function getEmail() {
  let email = document.getElementById("email").value;
  if (formValidation.Email(email)) {
    success("email", "emailmsg");
  } else {
    error("email", "emailmsg", "should have @ . and domain name");
  }
}
// checking pan number is valid or not and showing message
function getPan() {
  let pan = document.getElementById("pan").value;
  if (formValidation.Pan(pan)) {
    success("pan", "panmsg");
  } else {
    error(
      "pan",
      "panmsg",
      "should have 1st 5 char 'A'-'Z', 2nd 5 digit and last 1 char 'A'-'Z'"
    );
  }
}
// checking amount vlaid or not and showing message
function getAmount() {
  let amount = document.getElementById("amount").value;
  if (formValidation.Amount(amount)) {
    success("amount", "amountmsg");
    document.getElementById("amountinword").innerText =
      formValidation.convertToWord(amount);
  } else {
    document.getElementById("amountinword").innerText = "";
    error("amount", "amountmsg", "should have non negative max 9 digit");
  }
}
