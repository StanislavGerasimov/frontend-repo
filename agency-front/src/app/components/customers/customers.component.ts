import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Customer } from '../../shared/models';
import { CustomerService } from '../../services/customer/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDialogComponent } from '../customer-dialog/customer-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customers',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css',
})
export class CustomersComponent implements OnInit {
  customers: Customer[] = [];
  hoveredIndex: number | null = null;
  constructor(
    private customerService: CustomerService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }
  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(CustomerDialogComponent, {
      minHeight: '500px',
      width: '400px',
      disableClose: true, // щоб не можна було закрити клікнувши поза формою
    });

    dialogRef.afterClosed().subscribe((result: Customer | undefined) => {
      if (result) {
        this.customerService.createCustomer(result).subscribe((newCustomer) => {
          this.customers.push(newCustomer);
          this.customers = [...this.customers];
        });
      }
    });
  }
  onRowHover(index: number | null) {
    this.hoveredIndex = index;
  }
  deleteCustomer(customerId: string, index: number): void {
    if (!customerId) return;
    this.customerService.deleteCustomer(customerId).subscribe(() => {
      this.customers.splice(index, 1);
      this.customers = [...this.customers];
    });
  }
}
