import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import {
  GetUserService,
  GetAllMoviesService,
  DeleteFavouriteMovieService,
  DeleteUserService,
} from '../fetch-api-data.service';
import { UserProfileEditComponent } from '../user-profile-edit/user-profile-edit.component';
import { UserPasswordEditComponent } from '../user-password-edit/user-password-edit.component';
import { UserProfileDeleteComponent } from '../user-profile-delete/user-profile-delete.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = [];
  favouriteMovies: any = [];


  constructor(
    public fetchApiData: GetUserService,
    public fetchApiData2: GetAllMoviesService,
    public fetchApiData3: DeleteFavouriteMovieService,
    public fetchApiData4: DeleteUserService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

 
  getMovies(): void {
    this.fetchApiData2.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      return this.movies;
    });
    this.getUser();
  }

  
  getUser(): void {
    this.fetchApiData.getUser().subscribe((response: any) => {
      this.user = response;
      this.favouriteMovies = this.movies.filter((movie: any) => this.user.FavouriteMovies.includes(movie._id));
      console.log(this.user);
      console.log(this.favouriteMovies);
      return this.user, this.favouriteMovies;
    });
  }


  deleteFavourite(id: string): void {
    this.fetchApiData3.deleteFavouriteMovie(id).subscribe((response: any) => {
      console.log(response);
      this.getUser();
    });
  }


  openUserProfileEditDialog(): void {
    this.dialog.open(UserProfileEditComponent, {
      width: '280px',
      data: {
        onSuccess: () => this.getUser(),
      }
    });
  }

 
  openUserPasswordEditDialog(): void {
    this.dialog.open(UserPasswordEditComponent, {
      width: '280px',
    });
  }

 
  openUserProfileDeleteDialog(): void {
    this.dialog.open(UserProfileDeleteComponent, {
      width: '350px',
    });
  }

}