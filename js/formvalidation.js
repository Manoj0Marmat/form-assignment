class FormValidation {
  constructor() {
    //public method can access
    //genrating 4 digit number
    // need to cal sum of all even digits number
    this.generateCaptcha = function () {
      let number = Math.floor(1000 + Math.random() * 9000);
      while (number % 2 != 0) {
        number = Math.floor(1000 + Math.random() * 9000);
      }
      let ans = 0;
      let question = number;
      while (number) {
        if ((number % 10) % 2 == 0) {
          ans += number % 10;
        }
        number = parseInt(number / 10);
      }
      return { ans: ans, question: question };
    };
    //private method can't access
    // used to create 1 digit number to word
    function getOneDigitWord(i) {
      const arr = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
      ];
      return arr[i];
    }
    //private method can't access
    // used to create 2 digit number into word
    function getTwoDigitWord(i) {
      if (i == 10) return "ten";
      else if (i == 11) return "eleven";
      else if (i == 12) return "twelve";
      else if (i == 13) return "thirteen";
      else if (i == 15) return "fifteen";
      else if ((i == 14 || (i >= 16 && i <= 19)) && i != 18) {
        let s = "";
        s += getOneDigitWord(i % 10);
        s += "teen";
        return s;
      } else if (i == 18) return "eighteen";
      else if (i == 20) return "twenty";
      else if (i == 30) return "thirty";
      else if (i == 40) return "fourty";
      else if (i == 50) return "fifty";
      else if (i == 60) return "sixty";
      else if (i == 70) return "seventy";
      else if (i == 80) return "eighty";
      else if (i == 90) return "ninety";
      else {
        let s = "";
        let temp = i % 10;
        s += getTwoDigitWord(i - temp);
        s += " ";
        s += getOneDigitWord(temp);
        return s;
      }
    }
    //private method can't access
    // used to convert any number into word
    function numToWord(num) {
      let s = "";
      if (num <= 9) {
        s += getOneDigitWord(num);
      } else if (num > 9) {
        s += getTwoDigitWord(num % 100);
      } else if (num > 99) {
        let num = num / 100;
        s += getOneDigitWord(temp);
        s += " hundread ";
        s += getTwoDigitWord(num % 100);
      }
      return s;
    }
    //public method can access
    // used to break amount into parts like hundread, thousand, lakh, crore...etc
    this.convertToWord = function (amount) {
      let temp = amount;
      let count = 0;
      //length of amount
      while (temp) {
        ++count;
        temp = parseInt(temp / 10);
      }
      let n = 1;
      if (amount > 99) n = parseInt(count / 2) + 1;
      let arr = [];
      if (amount > 99) {
        // 113924 into 1,13,924
        for (let i = 0; i < n; ++i) {
          if (i < 2) {
            arr[i] = amount % 100;
            amount = parseInt(amount / 100);
            ++i;
            arr[i] = amount % 10;
            amount = parseInt(amount / 10);
          } else {
            arr[i] = amount % 100;
            amount = parseInt(amount / 100);
          }
        }
      } else {
        // 49 and 9 remain same
        arr[0] = amount;
      }

      const numeralArr = ["", "hundread", "thousand", "lakh", "crore"];

      let final = "";
      if (n > 1) {
        for (let i = n - 1; i >= 0; --i) {
          if (arr[i] > 0) {
            final += numToWord(arr[i]);
            final += " ";
            final += numeralArr[i];
            final += " ";
          }
        }
      } else {
        final += numToWord(arr[0]);
      }

      return final;
    };
    // private method can't access
    // checking char in string
    function checkExist(email, char) {
      let i;
      for (i = email.length; i >= 0; --i) {
        if (email[i] == char) break;
      }
      if (i <= 0) return false;

      return true;
    }
    //public method can access
    // class variable name to check name valid
    this.Name = function (name) {
      let n = name.length;
      let wordCount = 1;
      let validChar = true;
      let charCount = 1;
      for (let i in name) {
        if (name[i] == " ") {
          //checking word's char is less than 4
          if (charCount - 1 < 4) validChar = false;
          ++wordCount;
          charCount = 1;
        } else ++charCount;
      }
      //last word char size
      if (charCount - 1 < 4) validChar = false;
      if (wordCount >= 2 && validChar) return true;

      return false;
    };
    //public method can access
    // class variable to check email is valid
    this.Email = function (email) {
      let n = email.length;
      let checkDot = checkExist(email, ".");
      let checkAt = checkExist(email, "@");
      // @ and . not in string then wrong email
      if (!(checkDot && checkAt)) return false;
      for (let i = n - 1; i >= 0; --i) {
        if (email[i] == ".") {
          if (n - i - 1 < 2) return false;
          let j = i - 1;
          // checking distance between . and @
          // bcz email have domain name
          while (email[j] != "@" && j > 0) --j;
          //domain name must have more than 2 char
          // always use @ before . from reverse side
          // . should not at position 0
          if (i - j < 2 || i <= j || j == 0) return false;
          break;
        }
      }

      return true;
    };
    //public method can access
    // class variable to check pan number is valid
    this.Pan = function (pan) {
      let n = pan.length;
      if (n <= 0 || n != 10) return false;
      // first 5 char
      let checkChar = true;
      // second 4 num
      let checkNum = true;
      // third last char
      let checkLastChar = true;
      for (let i = 0; i < n; ++i) {
        if (i <= 4) {
          if (!(pan[i] >= "A" && pan[i] <= "Z")) checkChar = false;
        } else if (i <= 8) {
          if (!(pan[i] >= "0" && pan[i] <= "9")) checkNum = false;
        } else if (i <= 9) {
          if (!(pan[i] >= "A" && pan[i] <= "Z")) checkLastChar = false;
        }
      }
      if (checkChar && checkNum && checkLastChar) return true;

      return false;
    };
    //public method can access
    // class variable amount to check amount is valid
    this.Amount = function (amount) {
      if (amount > 0 && amount <= 999999999) return true;

      return false;
    };
  }
}

const formValidation = new FormValidation();
