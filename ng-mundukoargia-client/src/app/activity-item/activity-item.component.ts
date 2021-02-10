import {Component, Input} from '@angular/core';
import {Activity} from '../shared/activity';

@Component({
  selector: 'app-activity-item',
  templateUrl: './activity-item.component.html',
  styleUrls: ['./activity-item.component.css']
})
export class ProductItemComponent {

  @Input() activity: Activity;
}
