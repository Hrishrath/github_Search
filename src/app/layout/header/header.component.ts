import { Component, OnInit } from '@angular/core';

import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  email = null;
  constructor(private toastr: ToastrService , 
    private auth: AuthService , private router: Router 
    ) { auth.getUser().subscribe(user => {
      this.email = user?.email;
    }) }

  ngOnInit(): void {
  }

  async handleSignOut(){
    try {
      const res = await this.auth.signOut();
      this.router.navigateByUrl('/signin');
      this.toastr.info("Login Agin to aontinue");
      this.email = null;
    }
    catch (error)
    {
      this.toastr.error('Something is wrong');
    }
  }

}
