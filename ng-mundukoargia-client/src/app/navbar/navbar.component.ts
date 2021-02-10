import { Component, OnInit } from '@angular/core';
import { ActivityService } from '../shared/activity.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  id : any;

  constructor(private activityService: ActivityService, private router: Router) { }

  ngOnInit() {
  }

  newActivity(){
      // Get max activity Id from the activity list
      this.activityService.getMaxActivityId().subscribe(
        data => this.id = data
      );
      this.router.navigate(['/activities', this.id, 'new'])

  }

}
