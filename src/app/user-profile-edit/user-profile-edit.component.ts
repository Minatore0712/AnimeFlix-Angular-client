import { Component, OnInit, Input, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GetUserService, EditUserService } from '../fetch-api-data.service';

@Component({
  selector: 'app-user-profile-edit',
  templateUrl: './user-profile-edit.component.html',
  styleUrls: ['./user-profile-edit.component.scss']
})
export class UserProfileEditComponent implements OnInit {
  @Input() userData = { Username: '', Email: '', Birthday: '' };
  user: any = {};

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: { onSuccess: () => void },
    public fetchApiData: GetUserService,
    public fetchApiData2: EditUserService,
    public dialogRef: MatDialogRef<UserProfileEditComponent>,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
  }


  editUser(): void {
    this.fetchApiData2.editUser(this.userData).subscribe(() => {
      this.dialogRef.close();
      this.snackBar.open('Profile updated!', 'OK', {
        duration: 2000,
      });
      this.data.onSuccess();
    }, response => {
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    });
  }

}
