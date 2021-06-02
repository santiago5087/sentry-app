import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Empleado } from '../../shared/empleado.model';

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
  idEmp: string = '';

  constructor(private activatedRoute: ActivatedRoute,
              private fb: FormBuilder,
              private location: Location) { }

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
    const params = this.activatedRoute.snapshot.params;
    console.log(params);
    
    if(params['id']) {
      this.idEmp = params['id'];
      
      this.empService.getEmployee(this.idEmp).subscribe(empData => {
        let emp: Employee = empData.data() as Employee;
        delete emp.id;
        
        // Establece los valores del formalurio con los del empleado
        this.employeeForm.setValue({
          ...emp,
          birthDay: new Date(moment(emp.birthDay, 'DD/MM/YYYY').format('MM/DD/YYYY')),
          hiringDate: new Date(moment(emp.hiringDate, 'DD/MM/YYYY').format('MM/DD/YYYY'))
        });

        if(params['edit'] === 'false') {
          this.title = "Ver: " + emp.name;
          this.viewEmp = true;
          Object.keys(this.employeeForm.controls).forEach(key => {
            this.employeeForm.get(key).disable();
          });
        }
        else if(params['edit'] === 'true') {
          this.title = "Editando: " + emp.name;
          this.editEmp = true;
        }
      });
    } else {
      this.title = 'Nuevo empleado';
      this.createEmp = true;
    } 
  }

}

