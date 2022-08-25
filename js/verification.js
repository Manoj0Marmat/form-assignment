// global
let data = otp.generateOtp();
// printing otp on console
console.log(data);
document.getElementById("message").innerText = otp.message();
document.getElementById("submitbutton").disabled = true;
document.getElementById("attemptavailabel").innerText = `Remaining Attempts ${
  otp.attempt + 1
}`;
// showing succes messages
function success(Id, msgId, msg = "") {
  document.getElementById(`${msgId}`).innerText = msg;
}
// showing error messages
function error(Id, msgId, msg = "") {
  document.getElementById(`${msgId}`).innerText = msg;
}
// checking otp submitted by user
function checkOtpInput() {
  let value = document.getElementById("otp").value;
  let check = document.getElementById("checkotp").checked;
  let temp = value;
  let i = 0;
  while (temp) {
    temp = parseInt(temp / 10);
    ++i;
  }
  if (i == 4 && check) {
    document.getElementById("submitbutton").disabled = false;
    document.getElementById("submitbutton").classList.remove("errorsubmit");
    document.getElementById("submitbutton").classList.add("successsubmit");
  } else if (i != 4) {
    document.getElementById("submitbutton").disabled = true;
    document.getElementById("submitbutton").classList.remove("successsubmit");
    document.getElementById("submitbutton").classList.add("errorsubmit");
    error("", "otpmsg", "otp must be 4 digit");
  } else {
    error("", "otpmsg", "");
  }
}
// verifying otp on submit
function onSubmit() {
  let value = document.getElementById("otp").value;
  otp.verify(value);
}
