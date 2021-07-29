import { Component, OnInit, Input } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditUserPasswordService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-password-edit',
  templateUrl: './user-password-edit.component.html',
  styleUrls: ['./user-password-edit.component.scss']
})
export class UserPasswordEditComponent implements OnInit {

  @Input() userData = { Password: '' };

  constructor(
    public fetchApiData: EditUserPasswordService,
    public dialogRef: MatDialogRef<UserPasswordEditComponent>,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
  }

  editPassword(): void {
    this.fetchApiData.editUserPassword(this.userData).subscribe(response => {
      console.log(response);
      this.dialogRef.close();
      this.snackBar.open('Password changed!', 'OK', {
        duration: 2000
      });
    }, response => {
      this.snackBar.open(response, 'OK', {
        duration: 2000
      });
    });
  }
}
