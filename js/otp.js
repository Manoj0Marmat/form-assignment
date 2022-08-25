class Otp {
  constructor() {
    this.attempt = 2;
    // getting values submitted by form from previous page
    function getQueryString() {
      let result = {},
        queryString = location.search.slice(1),
        re = /([^&=]+)=([^&]*)/g,
        m;

      while ((m = re.exec(queryString))) {
        result[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
      }
      result.fullname = result.fullname.replace("+", " ");
      return result;
    }
    // generating 4 digit otp
    this.generateOtp = function () {
      return Math.floor(1000 + Math.random() * 9000);
    };
    // meesage to show on page with user information
    this.message = function () {
      let data = getQueryString();
      let name = "";
      let temp = data.fullname;
      let i = 0;
      while (temp[i] != " ") {
        name += temp[i];
        ++i;
      }
      return `Dear ${name},
Thank you for your inquiry. A 4 digit verification number has been sent to your email: ${data.email},please enter it in the following box and submit for confirmation:`;
    };
    // verifying submited otp by user
    this.verify = function (value) {
      let otp = data;

      if (this.attempt < 0) {
        // if attempt is finish then redirect to 404 page
        window.location.replace("http://pixel6.co/404");
      } else if (value != otp) {
        // if not match reduce attempt by 1 and show some msg
        document.getElementById("otp").value = null;
        document.getElementById("otpmsg").innerText =
          "Oops! wrong OTP try agian";
        this.attempt -= 1;
        document.getElementById(
          "attemptavailabel"
        ).innerText = `Remaining Attempts ${this.attempt + 1}`;
        document.getElementById("submitbutton").disabled = true;
        document
          .getElementById("submitbutton")
          .classList.remove("successsubmit");
        document.getElementById("submitbutton").classList.add("errorsubmit");
        document.getElementById("checkotp").checked = false;
      } else if (value == otp && this.attempt >= 0) {
        // if match then show successfull msg and redir home page
        document.getElementById("container").innerHTML =
          "<h1>Verified Successfully!</h1>";
        document.getElementById("container").classList.add("verified");
        setTimeout(function () {
          window.location.replace("http://pixel6.co/");
        }, 1000);
      }
    };
  }
}
let otp = new Otp();
