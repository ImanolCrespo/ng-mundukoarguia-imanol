import {Component, OnInit} from '@angular/core';
import {Activity} from '../shared/activity';
import {ActivityService} from '../shared/activity.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  activities: Activity[]=[];
  constructor(private activityService: ActivityService) { }

  ngOnInit() {
   this.activityService.getActivities().subscribe(
    (data: Activity[]) => this.activities = data
   );
  }
}
