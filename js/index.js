// global

// disable submit buttons
document.getElementById("checkcaptchabutton").classList.add("errorsubmit");
document.getElementById("checkcaptchabutton").disabled = true;
document.getElementById("submitbutton").disabled = true;
let data;
let isRecaptcha = false;
// genreating 1st cpatcha when site load
data = formValidation.generateCaptcha();
let question = data.question;
let s = "";
while (question) {
  s += question % 10;
  s += "  ";
  question = parseInt(question / 10);
}
document.getElementById("captchalabel").innerText = s;
