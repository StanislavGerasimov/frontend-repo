import { Component, OnInit } from '@angular/core';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../shared/models';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [CommonModule],
  // providers: [provideHttpClient()],
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
})
export class ShowsComponent implements OnInit {
  shows: Show[] = [];

  constructor(private showService: ShowService) {}

  ngOnInit(): void {
    this.showService.getShows().subscribe((data) => {
      this.shows = data;
    });
  }
}
