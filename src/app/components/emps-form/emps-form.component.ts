import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Empleado } from '../../shared/empleado.model';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-emps-form',
  templateUrl: './emps-form.component.html',
  styleUrls: ['./emps-form.component.scss']
})
export class EmpsFormComponent implements OnInit {

  employeeForm: FormGroup = new FormGroup({});
  editEmp: boolean = false;
  createEmp: boolean = true;
  title: string = '';
  ccEmp: number = 0;

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location,
              private empService: EmployeesService,
              private router: Router) { }

  ngOnInit(): void {
    this.createForm();
    this.configureForm();
  }

  createForm(): void {
    this.employeeForm = this.fb.group({
      cedula: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      celular: ['', Validators.required],
      email: ['', Validators.email],
      direccion: ['', Validators.required]
    });
  }

  configureForm(): void {
    this.editEmp = true;
    this.createEmp = false;
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    
    if(params['cc']) {
      this.ccEmp = params['cc'] as number;
      console.log(this.ccEmp)

      let myEmp: Empleado =  this.empService.getEmployee(this.ccEmp);
      console.log('EMP', myEmp)

      this.employeeForm.setValue({
        ...myEmp
      });

      this.title = "Editando: " + myEmp.nombres + " " + myEmp.apellidos;

     } else {
      this.title = 'Nuevo empleado';
      this.createEmp = true;
      this.editEmp = false;
    }
  }

  sendEmployeeForm(): void {
    let newEmp: Empleado = this.employeeForm.value;

    if(this.editEmp) {
      this.empService.updateEmployee(newEmp);
    }

    else if(this.createEmp) {
      this.empService.createEmployee(newEmp);
    }

    this.router.navigateByUrl('/home');
  }

  back(): void {
    this.location.back();
  }

}

