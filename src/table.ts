export class Table {
  readonly is_valid: boolean;
  readonly length: number;
  readonly matrix: number[][] = [];
  shiftedMatrix: number[][] = [];
  readonly numberOfRings: number;
  private readonly lengthMaxIndex: number;
  constructor(public list: number[]) {
    this.is_valid = this.validate(list);
    this.length = Math.sqrt(list.length);
    this.lengthMaxIndex = this.length - 1;
    this.numberOfRings = Math.ceil(this.length / 2);
    this.shiftedMatrix = Array.from({ length: this.length }, () =>
      Array.from({ length: this.length }, () => 0)
    );
    for (let i = 0; i < this.length; i++) {
      this.matrix.push(list.slice(i * this.length, (i + 1) * this.length));
    }
  }

  shiftLeft(): number[][] {
    for (let ringIndex = 0; ringIndex < this.numberOfRings; ringIndex++) {
      for (let row = ringIndex; row < this.length - ringIndex; row++) {
        for (
          let column = ringIndex;
          column < this.length - ringIndex;
          column++
        ) {
          const a = this.handleOddLengthLastRing({ row, column, ringIndex });
          if (a) return this.shiftedMatrix;
          this.shiftTopRowLeft({ row, column, ringIndex });
          this.shiftLeftColumnDown({ row, column, ringIndex });
          this.shiftBottomRowRight({ row, column, ringIndex });
          this.shiftRightColumnUp({ row, column, ringIndex });
        }
      }
    }
    return this.shiftedMatrix;
  }

  private handleOddLengthLastRing({ row, column, ringIndex }): boolean {
    if (
      row === column &&
      ringIndex === this.numberOfRings - 1 &&
      this.length % 2 !== 0
    ) {
      this.shiftedMatrix[row][column] = this.matrix[row][column];
      return true;
    }
  }

  private shiftTopRowLeft({ row, column, ringIndex }) {
    if (
      row === ringIndex &&
      column > ringIndex &&
      column < this.length - ringIndex
    ) {
      this.shiftedMatrix[row][column - 1] = this.matrix[row][column];
    }
  }

  private shiftLeftColumnDown({ row, column, ringIndex }) {
    if (
      row >= 0 &&
      row < this.lengthMaxIndex - ringIndex &&
      column === ringIndex
    ) {
      this.shiftedMatrix[row + 1][column] = this.matrix[row][column];
    }
  }

  private shiftBottomRowRight({ row, column, ringIndex }) {
    if (
      row === this.lengthMaxIndex - ringIndex &&
      column >= ringIndex &&
      column < this.lengthMaxIndex - 1 - ringIndex
    ) {
      this.shiftedMatrix[row][column + 1] = this.matrix[row][column];
    }
  }

  private shiftRightColumnUp({ row, column, ringIndex }) {
    if (
      row >= 0 &&
      row <= this.lengthMaxIndex - ringIndex &&
      column === this.lengthMaxIndex - ringIndex
    ) {
      if (row + 1 > this.lengthMaxIndex - ringIndex) {
        this.shiftedMatrix[row][column] = this.matrix[row][column - 1];
      } else {
        this.shiftedMatrix[row][column] = this.matrix[row + 1][column];
      }
    }
  }

  validate(list: number[]) {
    return !(Math.sqrt(list.length) % 1 !== 0);
  }
}
