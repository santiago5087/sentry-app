import { Injectable } from '@angular/core';
import { Empleado } from '../shared/empleado.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  employees: Empleado[] = [
    { cedula: 1020485778, nombres: "Edhy Santiago", apellidos: "Marín", telefono: 4565087, celular: 3023298764, email: 'santiago5087@hotmail.com', direccion: 'Calle 50 #56A 129'},
    { cedula: 102047777, nombres: "Pedro", apellidos: "Pérez", telefono: 1234567, celular: 3006007788, email: 'pedro@gmail.com', direccion: 'Calle 10 av. 129'}
  ]

  constructor() { }

  getEmployees(): Empleado[] {
    return this.employees;
  }

  getEmployee(cc: number): Empleado {
    return this.employees.filter(emp => emp.cedula == cc)[0];
  }

  createEmployee(emp: Empleado): void {
    this.employees.push(emp);
  }
  
  updateEmployee(emp: Empleado) {
    this.deleteEmployee(emp.cedula);
    this.employees.push(emp);
    console.log('EMPSNEW', this.employees )
  }
  
  deleteEmployee(cc: number) {
    this.employees = this.employees.filter(emp => emp.cedula !== cc);
  }

}
