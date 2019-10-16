import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Block} from './models/block';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'counter';
  public orderForm: FormGroup;


  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm() {
    this.orderForm = this.fb.group({
        addresses: new FormArray([])
    });
    this.addNewAddress();
  }

  public addNewAddress() {
    const address = new Block();
    const fa = this.orderForm.get('addresses') as FormArray;
    fa.push(this.fb.group({
      color: [address.color, [Validators.required]],
      totalRows: [address.totalRows,[Validators.required, Validators.min(1)]],
      currentRows: address.currentRows,
    }));
  }

  increment(i: number): void {
    const currentRowsComponent = this.orderForm.get(`addresses.${i}.currentRows`) as FormControl;
    currentRowsComponent.setValue(currentRowsComponent.value + 1);

  }
}
