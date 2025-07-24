import * as fs from 'fs/promises';
import * as path from 'path';

export class FileStorageService<T> {
  private filePath: string;

  constructor(fileName: string) {
    this.filePath = path.resolve('data', fileName);
  }

  async read(): Promise<T[]> {
    const content = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(content) as T[];
  }

  async write(data: T[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }
}
