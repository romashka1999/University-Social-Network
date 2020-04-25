import { Component, OnInit } from '@angular/core';
import { AdminsService } from './admins.service';
import { Admin } from './admins.interface';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.scss']
})
export class AdminsComponent implements OnInit {

  public admins: Admin[];
  public adminsCreateForm: FormGroup;

  constructor(private readonly adminsService: AdminsService) { }

  ngOnInit() {
    this.adminsCreateForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.pattern(/^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})/)]),
      adminRoleId: new FormControl(null, Validators.required)
    });

    this.adminsService.getAdmins().subscribe( (res) => {
      console.log(res.data);
      this.admins = res.data;
    }, (err) => {
      console.log(err);
    })
  }

  onCreateAdmin() {
    const adminCreateDto = this.adminsCreateForm.value;

    this.adminsService.createAdmin(adminCreateDto).subscribe( (res) => {
      this.admins.push(res.data);
    }, (err) => {
      console.log(err);
    })
  }

}
