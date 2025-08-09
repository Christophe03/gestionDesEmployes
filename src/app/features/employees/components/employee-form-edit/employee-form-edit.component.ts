import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-form-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './employee-form-edit.component.html',
  styleUrl: './employee-form-edit.component.css'
})
export class EmployeeFormEditComponent {
onSubmit() {
throw new Error('Method not implemented.');
}
employee: any;

}
