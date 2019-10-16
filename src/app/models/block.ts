export class Block {
  public color: string = 'New Color';
  public totalRows: number = 10;
  public currentRows: number = 0;
  public active: boolean = true;

  public increment(): void {
    this.currentRows++;
    // if the current number of rows is equal to or greater than total rows
    // mark the block as inactive
    if (this.currentRows >= this.totalRows) {
      this.active = false;
    }
  }
  public decrement(): void {
    this.currentRows--;
  }
}
