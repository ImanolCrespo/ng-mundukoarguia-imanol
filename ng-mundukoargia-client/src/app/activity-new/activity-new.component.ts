import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Activity } from '../shared/activity';
import { ActivatedRoute, Router } from '@angular/router';
import { ActivityService } from '../shared/activity.service';

@Component({
  selector: 'app-activity-new',
  templateUrl: './activity-new.component.html',
  styleUrls: ['./activity-new.component.css']
})
export class ActivityNewComponent implements OnInit {

  pageTitle = 'Activity New';
  errorMessage: string;
  activityForm: FormGroup;

  activityId:number;
  activity: Activity;

  constructor(private fb: FormBuilder,
    private activatedroute: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService) {  }

  ngOnInit(): void {
    this.activityForm = this.fb.group({
      nombre: ['', [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(50)]],
      precio: '',
      fechaPartida: '',
      fechaFin: '',
      lugares: ''
    });

    // Read the activity Id from the route parameter
    this.activityId = parseInt(this.activatedroute.snapshot.params['activityId']);
  }

  saveActivity(): void {
    if (this.activityForm.valid) {
      if (this.activityForm.dirty) {
        this.activity = this.activityForm.value;
        this.activity.id = this.activityId;
        
        this.activityService.createActivity(this.activity)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
        
      } else {
        this.onSaveComplete();
      }
    } else {
      this.errorMessage = 'Please correct the validation errors.';
    }
  }

  onSaveComplete(): void {
    // Reset the form to clear the flags
    this.activityForm.reset();
    this.router.navigate(['']);
  }
  
}
