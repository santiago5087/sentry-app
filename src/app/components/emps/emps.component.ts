import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { Empleado } from '../../shared/empleado.model';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-emps',
  templateUrl: './emps.component.html',
  styleUrls: ['./emps.component.scss']
})
export class EmpsComponent implements OnInit, AfterViewInit {

  empSubscription: Subscription = new Subscription();
  // Datos para graficar la tabla
  employeesTable = new MatTableDataSource<Empleado>([]);
  displayedColumns: string[] = ["nombres", "apellidos", "telefono", "celular", "email", "acciones"];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private router: Router,
              private empService: EmployeesService) { }

  ngOnInit(): void {
    this.loadEmployeesData();
  }

  ngAfterViewInit(): void {
    this.employeesTable.sort = this.sort;
  }

  loadEmployeesData() {
    this.employeesTable.data = this.empService.getEmployees();
  }

  onSubmitCreate(): void {
    this.router.navigate(['emps']);
    
  }

  onSubmitUpdate(cc: string): void {
    this.router.navigate(['emps', {cc}]);
  }

  onSubmitDelete(cc: number): void {
    this.empService.deleteEmployee(cc);
    this.loadEmployeesData();
  }

  // Función que filtra los datos por medio del valor ingresado por el usuario
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesTable.filter = filterValue.trim().toLowerCase();
  }

}
