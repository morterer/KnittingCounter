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
  // TODO: Find a way to expose this to the template
  public static readonly BLOCKS = 'blocks';
  public blocksFormGroup: FormGroup;

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
    this.blocksFormGroup.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(val => {
        console.log('Change', val);
        const result = this.localStorageService.set(AppComponent.KEY, val.blocks);
        console.log('result', result);
      });
  }

  private createForm(data: Block[]) {
    this.blocksFormGroup = this.fb.group({
        blocks: this.fb.array(data.map(elem => this.createMemberGroup(elem)))
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
    return group;
  }

  public addNewAddress() {
    const fa = this.blocksFormGroup.get(AppComponent.BLOCKS) as FormArray;
    fa.push(this.createMemberGroup(new Block()));
  }

  public increment(i: number): void {
    const totalRows = this.blocksFormGroup.get(`${AppComponent.BLOCKS}.${i}.totalRows`).value;
    let currentRows = this.blocksFormGroup.get(`${AppComponent.BLOCKS}.${i}.currentRows`).value;
    const currentRowsComponent = this.blocksFormGroup.get(`${AppComponent.BLOCKS}.${i}.currentRows`) as FormControl;
    // increment the number of currentRows
    currentRows++;
    // update the form control with the number of currentRows
    currentRowsComponent.setValue(currentRows);

    // if currentRows greater than or equal to totalRows, then the block is completed
    if (currentRows >= totalRows) {
      // set active to false and disable the form group for the row
      this.blocksFormGroup.get(`${AppComponent.BLOCKS}.${i}.active`).setValue(false);
      // this.orderForm.get(`${AppComponent.BLOCKS}.${i}`).disable();
      this.addNewAddress();
    }
  }

  public getFormGroup(): FormGroup {
    return this.blocksFormGroup.get(AppComponent.BLOCKS) as FormGroup;
  }
}
