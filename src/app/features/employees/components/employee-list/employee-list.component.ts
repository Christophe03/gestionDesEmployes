import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent {
  employees: any;
  constructor(private router: Router) {}

  onAdd() {
    this.router.navigate(['/employees/add']);
  }
  onEdit(employeeId: string) {
    this.router.navigate(['edit', employeeId]);
  }
    onDelete(employeeId: string) {
    if (confirm('Voulez-vous vraiment supprimer cet employé ?')) {
      // this.employeeService.deleteEmployee(employeeId).subscribe(() => {
      //   // Met à jour la liste après suppression
      //   this.employees = this.employees.filter(e => e.id !== employeeId);
      // });
    }
  }
}
