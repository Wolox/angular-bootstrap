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

export function schematicAngularCLI(
  name: string,
  routing: boolean,
  style = Style.Scss
): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const options: AngularNgNewSchema = {
      name,
      version: '13.x',
      routing,
      strict: true,
      style,
      directory: name,
      packageManager: PackageManager.Npm,
    };

    return externalSchematic('@schematics/angular', 'ng-new', options);
  };
}
