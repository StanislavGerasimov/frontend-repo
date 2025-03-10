import { Component, OnInit } from '@angular/core';
import { Agent } from '../../shared/models';
import { AgentService } from '../../services/agent/agent.service';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AgentDialogComponent } from '../agent-dialog/agent-dialog.component';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-agents',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './agents.component.html',
  styleUrl: './agents.component.css',
})
export class AgentsComponent implements OnInit {
  agents: Agent[] = [];
  hoveredIndex: number | null = null;
  constructor(private agentService: AgentService, private dialog: MatDialog) {}
  ngOnInit(): void {
    this.agentService.getAgents().subscribe((data) => {
      this.agents = data;
    });
  }

  loadAgents(): void {
    this.agentService.getAgents().subscribe((data) => {
      this.agents = data;
    });
  }

  openAddShowDialog(): void {
    const dialogRef = this.dialog.open(AgentDialogComponent, {
      width: '400px',
      disableClose: true, // щоб не можна було закрити клікнувши поза формою
    });

    dialogRef.afterClosed().subscribe((result: Agent | undefined) => {
      if (result) {
        this.agentService.createAgent(result).subscribe((newAgent) => {
          this.agents.push(newAgent);
        });
      }
    });
  }

  onRowHover(index: number | null) {
    this.hoveredIndex = index;
  }

  deleteAgent(agentId: string, index: number): void {
    if (!agentId) return; // Перевірка, чи _id існує
    this.agentService.deleteAgent(agentId).subscribe(() => {
      this.agents.splice(index, 1);
      this.agents = [...this.agents]; // Оновлення списку для відображення змін
    });
  }
}
