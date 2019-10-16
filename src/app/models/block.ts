export class Block {
  public color: string = 'New Color';
  public totalRows: number = 0;
  public currentRows: number = 0;
  public active: boolean = true;

  public increment(): void {
    this.currentRows++;
    // if currentRows is equal to or greater than totalRows
    // mark the block as inactive (might be better to call it complete?)
    if (this.currentRows >= this.totalRows) {
      this.active = false;
    }
  }
  public decrement(): void {
    this.currentRows--;
  }
}
