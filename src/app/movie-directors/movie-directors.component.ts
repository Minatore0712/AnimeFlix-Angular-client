import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-directors',
  templateUrl: './movie-directors.component.html',
  styleUrls: ['./movie-directors.component.scss']
})
export class MovieDirectorsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      Director: Array<{
        Name: string,
        Bio: string,
        Birth: string,
      }>
    }
  ) { }

}
