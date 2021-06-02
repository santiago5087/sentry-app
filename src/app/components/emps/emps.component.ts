import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router'
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';

import { Empleado } from '../../shared/empleado.model';

@Component({
  selector: 'app-emps',
  templateUrl: './emps.component.html',
  styleUrls: ['./emps.component.scss']
})
export class EmpsComponent implements OnInit, AfterViewInit {

  empSubscription: Subscription = new Subscription();
  // Datos para graficar la tabla
  employeesTable = new MatTableDataSource<Empleado>([]);
  displayedColumns: string[] = ["nombres", "apellidos", "telefono", "celular", "email"];
  @ViewChild(MatSort) sort: MatSort = new MatSort();

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loadEmployeesData();
  }

  ngAfterViewInit(): void {
    this.employeesTable.sort = this.sort;
  }

  loadEmployeesData() {
    this.employeesTable.data = [{cedula: 1020485778, nombres: "Edhy Santiago", apellidos: "Marín", telefono: 4565087, celular: 3023298764, email: 'santiago5087@hotmail.com', direccion: 'Calle 50 #56A 129'}];
  }

  onSubmitCreate(): void {
    this.router.navigate(['employees']);
  }

  onSubmitUpdate(id: string): void {
    console.log("Update: " + id);
  }

  onSubmitDelete(id: string): void {
    console.log("Delete: " + id);
  }

  // Función que filtra los datos por medio del valor ingresado por el usuario
  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeesTable.filter = filterValue.trim().toLowerCase();
  }

}
