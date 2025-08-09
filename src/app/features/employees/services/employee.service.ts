import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employees.models';

export interface CreateEmployeeDto {
  firstName: string;
  lastName: string;
  email: string;
  jobTitle?: string;
  hireDate?: string; // YYYY-MM-DD
  isActive?: boolean;
  gender?: 'Masculin' | 'Feminin';
}

@Injectable({ providedIn: 'root' })
export class EmployeeService {
  private readonly api = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) {}

  private buildHeaders(actorUserId?: string): HttpHeaders | undefined {
    const token = this.getToken();
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    if (actorUserId) headers['x-user-id'] = actorUserId;
    return Object.keys(headers).length ? new HttpHeaders(headers) : undefined;
  }

  private getToken(): string | null {
    try { return localStorage.getItem('accessToken'); } catch { return null; }
  }

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.api}`);
  }

  getEmployee(id: string): Observable<Employee> {
    return this.http.get<Employee>(`${this.api}/${id}`);
  }

  createEmployee(dto: CreateEmployeeDto, actorUserId?: string): Observable<Employee> {
    const headers = this.buildHeaders(actorUserId);
    return this.http.post<Employee>(`${this.api}`, dto, { headers });
  }

  updateEmployee(id: string, dto: Partial<CreateEmployeeDto>, actorUserId?: string): Observable<Employee> {
    const headers = this.buildHeaders(actorUserId);
    return this.http.patch<Employee>(`${this.api}/${id}`, dto, { headers });
  }

  deleteEmployee(id: string, actorUserId?: string): Observable<void> {
    const headers = this.buildHeaders(actorUserId);
    return this.http.delete<void>(`${this.api}/${id}`, { headers });
  }
}
