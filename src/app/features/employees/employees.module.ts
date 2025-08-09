import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingSpinnerComponent } from '../../shared/ui/loading-spinner/loading-spinner.component';
import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';

@NgModule({
  declarations: [EmployeeListComponent],
  imports: [CommonModule, EmployeesRoutingModule, FormsModule, LoadingSpinnerComponent]
})
export class EmployeesModule {}
