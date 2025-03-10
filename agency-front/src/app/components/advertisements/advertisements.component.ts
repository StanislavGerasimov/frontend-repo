import { Component, OnInit } from '@angular/core';
import { Advertisement } from '../../shared/models';
import { AdvertisementService } from '../../services/advertisements/advertisement.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AdvertisementDialogComponent } from '../advertisement-dialog/advertisement-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { ShowService } from '../../services/show/show.service';
import { CustomerService } from '../../services/customer/customer.service';
import { AgentService } from '../../services/agent/agent.service';
import { Agent, Show, Customer } from '../../shared/models';

@Component({
  selector: 'app-advertisements',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './advertisements.component.html',
  styleUrl: './advertisements.component.css',
})
export class AdvertisementsComponent implements OnInit {
  advertisements: Advertisement[] = [];
  hoveredIndex: number | null = null;

  shows: any[] = [];
  customers: any[] = [];
  agents: any[] = [];
  constructor(
    private advertisementService: AdvertisementService,
    private showService: ShowService,
    private customerService: CustomerService,
    private agentService: AgentService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.loadAdvertisements();
    this.loadData();
  }

  loadAdvertisements(): void {
    this.advertisementService.getAdvertisements().subscribe((data) => {
      this.advertisements = data;
    });
  }
  loadData(): void {
    this.showService.getShows().subscribe((data) => {
      this.shows = data;
    });

    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });

    this.agentService.getAgents().subscribe((data) => {
      this.agents = data;
    });
  }
  openAddAdvertisementDialog(): void {
    const dialogRef = this.dialog.open(AdvertisementDialogComponent, {
      width: '400px',
      disableClose: true, // щоб не можна було закрити клікнувши поза формою
      data: {
        shows: this.shows,
        customers: this.customers,
        agents: this.agents,
      },
    });

    dialogRef.afterClosed().subscribe((result: Advertisement | undefined) => {
      if (result) {
        this.advertisementService
          .createAdvertisement(result)
          .subscribe((newAdvertisement) => {
            this.advertisements.push(newAdvertisement);
            this.advertisements = [...this.advertisements]; // Оновлення відображення
          });
      }
    });
  }
  onRowHover(index: number | null) {
    this.hoveredIndex = index;
  }

  deleteAdvertisement(advertisementId: string, index: number): void {
    if (!advertisementId) return; // Перевірка, чи _id існує
    this.advertisementService
      .deleteAdvertisement(advertisementId)
      .subscribe(() => {
        this.advertisements.splice(index, 1);
        this.advertisements = [...this.advertisements]; // Оновлення списку для відображення змін
      });
  }

  getShowName(show: Show): string {
    if (!show || !show._id) return 'Невідомо';
    const foundShow = this.shows.find((s) => s._id === show._id);
    return foundShow ? foundShow.name : 'Невідомо';
  }

  getCustomerName(customer: Customer): string {
    if (!customer || !customer._id) return 'Невідомо';
    const foundCustomer = this.customers.find((c) => c._id === customer._id);
    return foundCustomer ? foundCustomer.name : 'Невідомо';
  }

  getAgentName(agent: Agent): string {
    if (!agent || !agent._id) return 'Невідомо';
    const foundAgent = this.agents.find((a) => a._id === agent._id);
    return foundAgent ? foundAgent.name : 'Невідомо';
  }
}
