import { AfterViewInit, ChangeDetectorRef, Component, Input, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-campo-datatimepicker',
  templateUrl: './campo-datatimepicker.component.html',
  styleUrls: ['./campo-datatimepicker.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CampoDatatimepickerComponent {

  @Input() label!: string;
  @Input() placeholder!: string;
  @Input() formControl: FormControl = new FormControl(false);
  @Input() min!: Date;
  @Input() max!: Date | null;

  constructor(
  ) { }

}
