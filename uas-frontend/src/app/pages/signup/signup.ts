import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  imports: [],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup {

  handleSignup(event: any) {
    event.preventDefault();

    const form = event.target;

    const username = form.username.value;
    const fullname = form.fullname.value;
    const email = form.email.value;
    const password = form.password.value;
    const creditcard = form.creditcard.value;

    // preferences
    const prefs = Array.from(form.prefs)
      .filter((p: any) => p.checked)
      .map((p: any) => p.value);

  // Convert picture to Base64
let pictureBase64 = "";
if (form.picture.files.length > 0) {
  const file = form.picture.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    pictureBase64 = reader.result as string;

    const userData = {
      username,
      fullname,
      email,
      password,
      creditcard,
      prefs,
      picture: pictureBase64
    };

    localStorage.setItem("UAS_user", JSON.stringify(userData));
    alert("Account created successfully!");
  };

  reader.readAsDataURL(file);
  return;
}




    alert("Account created successfully!");
  }

}
