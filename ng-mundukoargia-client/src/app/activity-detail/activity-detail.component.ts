import {Component, OnInit} from '@angular/core';
import {ActivityService} from '../shared/activity.service';
import {Activity} from '../shared/activity';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-activity-detail',
  templateUrl: './activity-detail.component.html',
  styleUrls: ['./activity-detail.component.css']
})
export class ActivityDetailComponent implements OnInit {

  activity: Activity;
  activityId: number;

  constructor(private activatedroute: ActivatedRoute, private router: Router, private activityService: ActivityService) {}

  ngOnInit() {
    this.activityId = parseInt(this.activatedroute.snapshot.params['activityId']);
    this.activityService.getActivityById(this.activityId).subscribe(
      (data: Activity) => this.activity = data
    );
  }
  goEdit():void{
    this.router.navigate(['/activities', this.activityId, 'edit']);
  }
  onBack(): void {
    this.router.navigate(['']);
  }

}
