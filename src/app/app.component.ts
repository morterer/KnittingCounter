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
  title = 'counter';

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
    // TODO: Add debounce so each keystroke doesn't trigger a change
    this.orderForm.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
        console.log('Change', val);
        const result = this.localStorageService.set(AppComponent.KEY, val.addresses);
        console.log('result', result);
      });

    // this.orderForm.valueChanges.subscribe(val => {
    //   console.log('Change', val);
    //   const result = this.localStorageService.set(AppComponent.KEY, val.addresses);
    //   console.log('result', result);
    // });
  }

  private createForm(data: Block[]) {
    this.orderForm = this.fb.group({
        addresses: this.fb.array(data.map(elem => this.createMemberGroup(elem)))
    });
  }

  private createMemberGroup(block: Block): FormGroup {
    return this.fb.group({
      color: [block.color, [Validators.required]],
      totalRows: [block.totalRows,[Validators.required, Validators.min(1)]],
      currentRows: block.currentRows,
      active: block.active
    });
  }

  public addNewAddress() {
    const fa = this.orderForm.get('addresses') as FormArray;
    fa.push(this.createMemberGroup(new Block()));
  }

  public increment(i: number): void {
    const currentRowsComponent = this.orderForm.get(`addresses.${i}.currentRows`) as FormControl;
    currentRowsComponent.setValue(currentRowsComponent.value + 1);
  }
}
