import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataRequestService } from '../data-request.service';
import { User } from '../user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[];
  length:number;
  // users=[{
  //   id:1,
  //   username:'san',
  //   email:'sasaaa',
  //   password:''
  // },{
  //   id:2,
  //   username:'san',
  //   email:'sasaaa',
  //   password:''
  // }]
  displayedColumns: string[] = ['id', 'username', 'email'];
  dataSource:MatTableDataSource<User>;
  @ViewChild(MatSort, {static : true} ) sort: MatSort;
  @ViewChild(MatPaginator,{static : true}) paginator : MatPaginator;
  constructor(private datarequestservice : DataRequestService) { }

  ngOnInit(): void { 
    
    this.datarequestservice.getallusers().subscribe(users=>{
      this.users=users;
      console.log(this.users);
      this.length=this.users.length;
    this.dataSource = new MatTableDataSource(this.users);
    });
    
  }

}
