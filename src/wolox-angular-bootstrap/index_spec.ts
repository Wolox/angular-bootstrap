import { SchematicTestRunner } from '@angular-devkit/schematics/testing';
import * as path from 'path';

const collectionPath = path.join(__dirname, '../collection.json');

describe('wolox-angular-bootstrap', () => {
  it('works', async () => {
    const runner = new SchematicTestRunner('schematics', collectionPath);
    const tree = await runner
      .runSchematicAsync('initialize', { name: 'foo' })
      .toPromise();
    expect(tree.files).toBeTruthy();
  });
});
