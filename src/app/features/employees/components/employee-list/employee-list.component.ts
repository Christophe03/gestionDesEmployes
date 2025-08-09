import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employees.models';

@Component({
  selector: 'app-employee-list',
  // not standalone
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
onExport() {
throw new Error('Method not implemented.');
}
onNotifications() {
throw new Error('Method not implemented.');
}
  employees: Array<Employee> = [];
  users: Array<any> = [];

  totalEmployees = 0;
  totalUsers = 0;
  totalMen = 0;
  totalWomen = 0;
  loading = false;
  error?: string;
  private deletingIds = new Set<string>();

  // Recherche & pagination
  searchTerm = '';
  pageIndex = 1;
  pageSize = 10;
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.filteredEmployees.length / this.pageSize));
  }
  get filteredEmployees(): Array<Employee> {
    const term = (this.searchTerm || '').trim().toLowerCase();
    if (!term) return this.employees;
    return this.employees.filter((e: any) =>
      [e.firstName, e.lastName, e.email, e.jobTitle]
        .filter(Boolean)
        .some((v: any) => String(v).toLowerCase().includes(term))
    );
  }
  get pagedEmployees(): Array<Employee> {
    const start = (this.pageIndex - 1) * this.pageSize;
    return this.filteredEmployees.slice(start, start + this.pageSize);
  }

  constructor(private router: Router, private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.fetchEmployees();
  }

  onAdd() {
    this.router.navigate(['/employees/add']);
  }

  // Base implémentations: seront appelées après fetch backend
  setEmployees(employees: Array<any>): void {
    this.employees = employees || [];
    this.updateEmployeeStats();
  }

  setUsers(users: Array<any>): void {
    this.users = users || [];
    this.totalUsers = this.users.length;
  }

  updateEmployeeStats(): void {
    this.totalEmployees = this.filteredEmployees.length;
    this.totalMen = this.countByGender('male');
    this.totalWomen = this.countByGender('female');
  }

  private countByGender(gender: 'male' | 'female'): number {
    const list = (this.employees as unknown as Array<any>) || [];
    return list.filter(e => (e?.gender || e?.sexe) === gender).length;
  }
  
  private fetchEmployees(): void {
    this.loading = true;
    this.error = undefined;
    this.employeeService.getEmployees().subscribe({
      next: (list) => {
        this.loading = false;
        this.setEmployees(list || []);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Impossible de charger les employés';
      }
    });
  }

  isDeleting(id: string): boolean {
    return this.deletingIds.has(id);
  }

  onEdit(employeeId: string) {
    this.router.navigate(['edit', employeeId]);
  }

  onDelete(employeeId: string) {
    if (!confirm('Voulez-vous vraiment supprimer cet employé ?')) {
      return;
    }
    this.deletingIds.add(employeeId);
    this.employeeService.deleteEmployee(employeeId).subscribe({
      next: () => {
        this.employees = this.employees.filter(e => e.id !== employeeId);
        this.updateEmployeeStats();
        this.deletingIds.delete(employeeId);
      },
      error: (err) => {
        this.error = err?.error?.message || 'Suppression échouée';
        this.deletingIds.delete(employeeId);
      }
    });
  }
  }
