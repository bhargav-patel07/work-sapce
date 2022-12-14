import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../employee.model';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {


  
  public employeeList: any[];
  constructor(
    public activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router,
  ) {
    this.employeeList = [];
  }

  ngOnInit(): void {
    
console.log('this.activatedRoute',this.activatedRoute);
    this.employeeList = this.activatedRoute.snapshot.data['users'];

  }

  onDelete(employeeId: any) {
    if (confirm('Delete this item?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(x => {
        this.getEmployee();
      })
    }
  }

  public onEdit(employee: Employee): void {
    this.router.navigate(['employee/list/edit', employee.id]);
  }

  public onDetails(employee: Employee): void {
    this.router.navigate(['employee/details', employee.id])
  }

  private getEmployee(): void {
    this.employeeService.getEmployee().subscribe((employee: Employee[]) => {
      this.employeeList = employee;
    })
  }
}
