import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService, CreateEmployeeDto } from '../../services/employee.service';
import { LoadingSpinnerComponent } from '../../../../shared/ui/loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule, LoadingSpinnerComponent],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent {
  employee: CreateEmployeeDto = {
    firstName: '',
    lastName: '',
    email: '',
    jobTitle: '',
    hireDate: '',
    isActive: true,
    gender: undefined,
  };

  loading = false;
  error?: string;

  constructor(private employeeService: EmployeeService, private router: Router) {}

  onSubmit() {
    this.loading = true;
    this.error = undefined;
    const dto: CreateEmployeeDto = {
      firstName: this.employee.firstName,
      lastName: this.employee.lastName,
      email: this.employee.email,
      jobTitle: this.employee.jobTitle || undefined,
      hireDate: this.employee.hireDate || undefined,
      isActive: this.employee.isActive,
      gender: this.employee.gender,
    };
    this.employeeService.createEmployee(dto).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/employees']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err?.error?.message || 'Création échouée';
      }
    });
  }
}
