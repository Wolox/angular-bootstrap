import {
  Rule,
  SchematicContext,
  Tree,
  externalSchematic,
} from '@angular-devkit/schematics';
import {
  PackageManager,
  Schema as AngularNgNewSchema,
  Style,
} from '@schematics/angular/ng-new/schema';

export function schematicAngularCLI(name: string): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const options: AngularNgNewSchema = {
      name,
      version: '14.x',
      routing: true,
      strict: true,
      style: Style.Scss,
      directory: name,
      packageManager: PackageManager.Npm,
    };

    return externalSchematic('@schematics/angular', 'ng-new', options);
  };
}
