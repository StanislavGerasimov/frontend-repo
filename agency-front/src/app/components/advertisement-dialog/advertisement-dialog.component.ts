import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-advertisement-dialog',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './advertisement-dialog.component.html',
  styleUrl: './advertisement-dialog.component.css',
})
export class AdvertisementDialogComponent {
  advertisementForm: FormGroup;
  shows: any[] = [];
  customers: any[] = [];
  agents: any[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AdvertisementDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.shows = data.shows || [];
    this.customers = data.customers || [];
    this.agents = data.agents || [];
    this.advertisementForm = this.fb.group({
      show: ['', Validators.required],
      customer: ['', Validators.required],
      agent: ['', Validators.required],
      date: ['', Validators.required],
      duration: ['', [Validators.required, Validators.min(1)]],
    });
  }
  submit(): void {
    if (this.advertisementForm.valid) {
      this.dialogRef.close(this.advertisementForm.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
