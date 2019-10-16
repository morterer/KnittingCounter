import {Component, Input, OnInit} from '@angular/core';
import {Block} from '../models/block';

@Component({
  selector: 'app-block-row',
  templateUrl: './block-row.component.html',
  styleUrls: ['./block-row.component.scss']
})
export class BlockRowComponent implements OnInit {
@Input() block: Block;
  constructor() { }

  ngOnInit() {
  }

  increment() {
    this.block.increment();
    console.log(this.block.currentRows);
  }
}
