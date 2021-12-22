import {
  chain,
  externalSchematic,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import { typescriptRules } from './utils/typescript-rules';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addLinter(_options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const rule = chain([
      externalSchematic('@angular-eslint/schematics', 'ng-add', _options),
      typescriptRules(),
    ]);
    return rule(_tree, _context) as Rule;
  };
}
