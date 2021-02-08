import { Component, OnInit, AfterViewInit, OnDestroy, ViewChildren, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators, FormControlName } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Activity } from '../shared/activity';
import { ActivityService } from '../shared/activity.service';

@Component({
  templateUrl: './activity-edit.component.html'
})
export class ActivityEditComponent implements OnInit{

  pageTitle = 'Activity Edit';
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
    this.activityId = parseInt(this.activatedroute.snapshot.params['id']);
    this.getActivity(this.activityId);
  }

  getActivity(id: number): void {
    this.activityService.getActivityById(id)
      .subscribe(
        (activity: Activity) => this.displayActivity(activity),
        (error: any) => this.errorMessage = <any>error
      );
  }

  displayActivity(activity: Activity): void {
    if (this.activityForm) {
      this.activityForm.reset();
    }
    this.activity = activity;
    this.pageTitle = `Edit Activity: ${this.activity.nombre}`; 

    // Update the data on the form
    this.activityForm.patchValue({
      nombre: this.activity.nombre,
      precio: this.activity.precio,
      fechaPartida: this.activity.fechaPartida,
      fechaFin: this.activity.fechaFin,
      lugares: this.activity.lugares
    });
  }

  deleteActivity(): void {
    if (this.activity.id === 0) {
      // Don't delete, it was never saved.
      this.onSaveComplete();
    } else {
      if (confirm(`Really delete the activity: ${this.activity.nombre}?`)) { //TODO Revisar
        this.activityService.deleteActivity(this.activity.id)
          .subscribe(
            () => this.onSaveComplete(),
            (error: any) => this.errorMessage = <any>error
          );
      }
    }
  }


  saveActivity(): void {
    if (this.activityForm.valid) {
      if (this.activityForm.dirty) {
        this.activity = this.activityForm.value;
        this.activity.id = this.activityId;
        
        this.activityService.updateActivity(this.activity)
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
