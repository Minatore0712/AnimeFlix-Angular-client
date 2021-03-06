import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UserLoginService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss']
})
export class UserLoginFormComponent implements OnInit {

  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: UserLoginService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void { }

   /**
   * Function sending user login form input to database to authenticate user credentials
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(response => {
      this.dialogRef.close();
      console.log("login response:", response);
      localStorage.setItem('user', response.user.Username);
      localStorage.setItem('token', response.token);

      this.snackBar.open('user logged in successfully', 'OK', {
        duration: 2000
      });
      this.router.navigate(['movies']);
    }, response => {
      console.log("navigation:", response);
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
