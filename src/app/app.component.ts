import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Block} from './models/block';
import {LocalStorageService} from 'angular-2-local-storage';
import {debounceTime} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  private static readonly  KEY = 'progress';
  public orderForm: FormGroup;

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService) {}

  ngOnInit(): void {
    let data: Block[];
    if (this.localStorageService.get(AppComponent.KEY) == null) {
      console.error('Nothing in local storage');
      data = [new Block()];
    } else {
      // else load stuff from local storage
      console.log('Loading from local storage');
      data = this.localStorageService.get(AppComponent.KEY);
    }
    this.createForm(data);
    this.onChanges();
  }

  private onChanges(): void {
    this.orderForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
        console.log('Change', val);
        const result = this.localStorageService.set(AppComponent.KEY, val.addresses);
        console.log('result', result);
      });
  }

  private createForm(data: Block[]) {
    this.orderForm = this.fb.group({
        addresses: this.fb.array(data.map(elem => this.createMemberGroup(elem)))
    });
  }

  private createMemberGroup(block: Block): FormGroup {
    // create a form group from block
    const group = this.fb.group({
      color: [block.color, [Validators.required]],
      totalRows: [block.totalRows,[Validators.required, Validators.min(1)]],
      currentRows: block.currentRows,
      active: block.active
    });
    // if block.active is false, disable the form group
    // if (!block.active) {
    //   group.disable();
    // }
    return group;
  }

  public addNewAddress() {
    const fa = this.orderForm.get('addresses') as FormArray;
    fa.push(this.createMemberGroup(new Block()));
  }

  public increment(i: number): void {
    const totalRows = this.orderForm.get(`addresses.${i}.totalRows`).value;
    let currentRows = this.orderForm.get(`addresses.${i}.currentRows`).value;
    const currentRowsComponent = this.orderForm.get(`addresses.${i}.currentRows`) as FormControl;
    // increment the number of currentRows
    currentRows++;
    // update the form control with the number of currentRows
    currentRowsComponent.setValue(currentRows);

    // if currentRows greater than or equal to totalRows, then the block is completed
    if (currentRows >= totalRows) {
      // set active to false and disable the form group for the row
      this.orderForm.get(`addresses.${i}.active`).setValue(false);
      // this.orderForm.get(`addresses.${i}`).disable();
      this.addNewAddress();
    }
  }
}
