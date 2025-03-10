import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-agent-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './agent-dialog.component.html',
  styleUrl: './agent-dialog.component.css',
})
export class AgentDialogComponent {
  agentForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AgentDialogComponent>
  ) {
    this.agentForm = this.fb.group({
      name: ['', Validators.required],
      commissionRate: [
        '',
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
    });
  }
  submit(): void {
    if (this.agentForm.valid) {
      this.dialogRef.close(this.agentForm.value);
    }
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
}
