import { Table } from './table';

describe('Table', () => {
  describe('constructor', () => {
    it('should initialize is_valid to true for valid input', () => {
      const table = new Table([1, 2, 3, 4]);
      expect(table.is_valid).toBe(true);
    });

    it('should initialize is_valid to false for invalid input', () => {
      const table = new Table([1, 2, 3]);
      expect(table.is_valid).toBe(false);
    });

    it('should initialize length to the square root of the input list length', () => {
      const table = new Table([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(table.length).toBe(3);
    });

    it('should initialize matrix to a 2D array representation of the input list', () => {
      const table = new Table([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      expect(table.matrix).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
      ]);
    });
  });

  describe('shiftLeft', () => {
    it('should return a new 2D array with elements shifted left by one position', () => {
      const table = new Table([1, 2, 3, 4, 5, 6, 7, 8, 9]);
      const shiftedMatrix = table.shiftLeft();
      expect(shiftedMatrix).toEqual([
        [2, 3, 6],
        [1, 5, 9],
        [4, 7, 8],
      ]);
    });
    test('should handle single element list', () => {
      const table = new Table([1]);
      const shiftedMatrix = table.shiftLeft();
      expect(shiftedMatrix).toEqual([[1]]);
    });
    test('shiftLeft returns the correct matrix for a 4x4 list', () => {
      const list = Array.from({ length: 16 }, (_, i) => i + 1);
      const table = new Table(list);
      const expectedMatrix = [
        [2, 3, 4, 8],
        [1, 7, 11, 12],
        [5, 6, 10, 16],
        [9, 13, 14, 15],
      ];
      expect(table.shiftLeft()).toEqual(expectedMatrix);
    });

    test('shiftLeft returns the correct matrix for a 5x5 list', () => {
      const list = Array.from({ length: 25 }, (_, i) => i + 1);
      const table = new Table(list);
      const expectedMatrix = [
        [2, 3, 4, 5, 10],
        [1, 8, 9, 14, 15],
        [6, 7, 13, 19, 20],
        [11, 12, 17, 18, 25],
        [16, 21, 22, 23, 24],
      ];
      expect(table.shiftLeft()).toEqual(expectedMatrix);
    });

    test('shiftLeft returns the correct matrix for a 6x6 list', () => {
      const list = Array.from({ length: 36 }, (_, i) => i + 1);
      const table = new Table(list);
      const expectedMatrix = [
        [2, 3, 4, 5, 6, 12],
        [1, 9, 10, 11, 17, 18],
        [7, 8, 16, 22, 23, 24],
        [13, 14, 15, 21, 29, 30],
        [19, 20, 26, 27, 28, 36],
        [25, 31, 32, 33, 34, 35],
      ];
      expect(table.shiftLeft()).toEqual(expectedMatrix);
    });

    test('shiftLeft returns the correct matrix for a 10x10 list', () => {
      const list = Array.from({ length: 100 }, (_, i) => i + 1);
      const table = new Table(list);
      const expectedMatrix = [
        [2, 3, 4, 5, 6, 7, 8, 9, 10, 20],
        [1, 13, 14, 15, 16, 17, 18, 19, 29, 30],
        [11, 12, 24, 25, 26, 27, 28, 38, 39, 40],
        [21, 22, 23, 35, 36, 37, 47, 48, 49, 50],
        [31, 32, 33, 34, 46, 56, 57, 58, 59, 60],
        [41, 42, 43, 44, 45, 55, 67, 68, 69, 70],
        [51, 52, 53, 54, 64, 65, 66, 78, 79, 80],
        [61, 62, 63, 73, 74, 75, 76, 77, 89, 90],
        [71, 72, 82, 83, 84, 85, 86, 87, 88, 100],
        [81, 91, 92, 93, 94, 95, 96, 97, 98, 99],
      ];
      expect(table.shiftLeft()).toEqual(expectedMatrix);
    });
  });

  describe('validate', () => {
    it('should return true for a list whose length is a perfect square', () => {
      const table = new Table([1, 2, 3, 4]);
      expect(table.validate([1, 2, 3, 4])).toBe(true);
    });

    it('should return false for a list whose length is not a perfect square', () => {
      const table = new Table([1, 2, 3]);
      expect(table.validate([1, 2, 3])).toBe(false);
    });

    it('should validate single element list', () => {
      const table = new Table([1]);
      expect(table.validate([1])).toBe(true);
    });
  });
});
