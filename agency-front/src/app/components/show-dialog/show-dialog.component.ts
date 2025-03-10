import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Show } from '../../shared/models';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-show-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './show-dialog.component.html',
  styleUrl: './show-dialog.component.css',
})
export class ShowDialogComponent {
  showForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ShowDialogComponent>
  ) {
    this.showForm = this.fb.group({
      name: ['', Validators.required],
      rating: [
        '',
        [Validators.required, Validators.min(0), Validators.max(10)],
      ],
      pricePerMinute: ['', [Validators.required, Validators.min(0)]],
    });
  }
  submit(): void {
    if (this.showForm.valid) {
      this.dialogRef.close(this.showForm.value);
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
