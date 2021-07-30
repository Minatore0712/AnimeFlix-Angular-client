import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DeleteUserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-delete',
  templateUrl: './user-profile-delete.component.html',
  styleUrls: ['./user-profile-delete.component.scss']
})
export class UserProfileDeleteComponent implements OnInit {

  constructor(
    public fetchApiData: DeleteUserService,
    public dialogRef: MatDialogRef<UserProfileDeleteComponent>,
    public snackBar: MatSnackBar,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  /**
   * Function to delete user account from database
   */
  deleteUser(): void {
    this.fetchApiData.deleteUser().subscribe(() => {
      this.dialogRef.close();
      localStorage.clear();
      this.snackBar.open('Account deleted', 'OK', {
        duration: 2000
      });
      this.router.navigate(['welcome']);
    }, response => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }

  /**
   * Function closing dialog without deleting user account
   */
  cancel(): void {
    this.dialogRef.close();
  }

}
