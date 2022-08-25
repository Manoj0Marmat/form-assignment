# Assignment Pixel6

## **C++ only used for writing logics not used in project.** Converted C++ logic in JS.

---
# Live Demo https://pixel6-form-assignment.netlify.app
# Youtube Video Demo https://youtu.be/VN_qTJ9Jiq0
---

## Home Page

single button to go on Loan Application Page

<img src="/doc/assets/home.gif" alt="home"/>

## Loan Application Page

- Full Name (only alphabets and spaces allowed, min two words each with min 4 chars)
- Email (Email validation)
- PAN (Pay attention to this format as per below instructions)
  - Alphanumeric
  - Must be in this order and format: ABCDE1234F
- Loan Amount (numeric | maximum of 9 digits)
  - Show the entered amount in words beside the field. Eg if the user enters 456800, you would show ‘Four
    Lakh Fifty Six Thousand Eight Hundred Rs.’
- Add a custom mathematical captcha. It should be different every time the page is loaded/refreshed and there
  should be a button/link for ‘new captcha’ for users if they are not able to solve the old one which when clicked
  replaces the old captcha with a new one. (we would like to see how you handle this)
- Submit (submits only on correct validations)


## Thank You Page

### OTP

- If the number matches the random number generated earlier, replace the OTP form with a 'Validation
  Successful!' and redirect the user to the Pixel6 home page.
- else reset this OTP form and ask the user to reenter. If a user fails to enter the right number in 3 attempts,
  redirect the user to 404 (page not found) page on Pixel6 website.
