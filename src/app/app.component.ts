import {Component, OnInit} from '@angular/core';
import {Block} from './models/block';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'counter';
  public blocks: Block[] = [];

  ngOnInit(): void {
    this.addRow();
  }
  public addRow() {
     const block = new Block();
     this.blocks.push(block);
  }

  increment(i: number) {
    this.blocks[i].increment();
    console.log(this.blocks[i].currentRows);
  }
}
