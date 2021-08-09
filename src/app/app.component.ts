import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
// import { from } from 'rxjs';
import { UsersService } from 'src/service/users.service';
import { NgForm } from '@angular/forms';
export class usermodel {
  _id!: string;
  Username!: string;
  Address!: string;
  City!: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  isEdit: boolean = false;
  constructor(private usersservice: UsersService) { }
  user: usermodel = new usermodel();
  userList: usermodel[] = [];

  Onsubmit(form: NgForm): void {
    if (!this.isEdit) {
      console.log(form.value);
      this.usersservice.create(form.value)
        .subscribe(resp => {
          console.log(resp);
          form.resetForm();
          this.getall();
        })
    } else {
      this.usersservice.update(form.value)
        .subscribe(resp => {
          console.log(resp);
          form.resetForm();
          this.isEdit = false;
          this.getall();
        });
    }

  }

  edit(data: usermodel): void {
    console.log(data);
    this.isEdit = true;
    this.usersservice.getone(data._id)
      .subscribe(resp => {
        console.log(resp);
        this.user = resp;
      });
  }
  getall(): void {
    this.usersservice.Getall()
      .subscribe(resp => {
        console.log(resp);
        this.userList = resp;

      });
  }
  ngOnInit(): void {
    this.getall();
  }

  delete(data: usermodel): void {
    const confirm = window.confirm("are younsure want to dlete?");
    if (confirm) {
      this.usersservice.delete(data._id)
        .subscribe(resp => {
          this.getall();

        });
    }

  }
}

