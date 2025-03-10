import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowService } from '../../services/show/show.service';
import { Show } from '../../shared/models';
import { MatDialog } from '@angular/material/dialog';
import { ShowDialogComponent } from '../show-dialog/show-dialog.component';

@Component({
  selector: 'app-shows',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css'],
})
export class ShowsComponent implements OnInit {
  shows: Show[] = [];
  hoveredIndex: number | null = null;

  constructor(private showService: ShowService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadShows();
  }

  loadShows(): void {
    this.showService.getShows().subscribe((data) => {
      this.shows = data;
    });
  }

  openAddShowDialog(): void {
    const dialogRef = this.dialog.open(ShowDialogComponent, {
      width: '400px',
      disableClose: true, // щоб не можна було закрити клікнувши поза формою
    });

    dialogRef.afterClosed().subscribe((result: Show | undefined) => {
      if (result) {
        this.showService.createShow(result).subscribe((newShow) => {
          this.shows.push(newShow);
          this.shows = [...this.shows];
        });
      }
    });
  }
  onRowHover(index: number | null) {
    this.hoveredIndex = index;
  }

  deleteShow(showId: string, index: number): void {
    if (!showId) return; // Перевірка на існування _id

    this.showService.deleteShow(showId).subscribe(() => {
      this.shows.splice(index, 1);
      this.shows = [...this.shows]; // Оновлення списку
    });
  }
}
