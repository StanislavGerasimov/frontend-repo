import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../../shared/models';
import { MatDialogModule } from '@angular/material/dialog'; // Import MatDialogModule
import { MatFormFieldModule } from '@angular/material/form-field'; // Import MatFormFieldModule
import { MatInputModule } from '@angular/material/input'; // Import MatInputModule
import { ReactiveFormsModule } from '@angular/forms'; // Import ReactiveFormsModule

@Component({
  selector: 'app-customer-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './customer-dialog.component.html',
  styleUrl: './customer-dialog.component.css',
})
export class CustomerDialogComponent {
  customerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CustomerDialogComponent>
  ) {
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', [Validators.required, Validators.pattern(/^\+?\d{10,15}$/)]], // Phone validation
      bankName: ['', Validators.required], // Separate field for bank name
      accountNumber: ['', Validators.required], // Separate field for account number
      contactPerson: ['', Validators.required],
    });
  }
  submit(): void {
    if (this.customerForm.valid) {
      const formValues = this.customerForm.value;

      // Combine "Банк" and "Номер рахунку" into one field
      const customerData = {
        name: formValues.name,
        phone: formValues.phone,
        bankDetails: `${formValues.bankName}, Account Number: ${formValues.accountNumber}`,
        contactPerson: formValues.contactPerson,
      };

      this.dialogRef.close(customerData);
    }
  }
  closeDialog(): void {
    this.dialogRef.close();
  }
}
