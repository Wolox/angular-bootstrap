import {
  chain,
  Rule,
  SchematicContext,
  Tree,
} from '@angular-devkit/schematics';
import {
  addAngularESLintPackages,
  modifyAngularJsonAndEsLintFile,
} from './utils/schematics-package';

import { typescriptRules } from './utils/typescript-rules';

// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function addLinter(options: any): Rule {
  return (_tree: Tree, _context: SchematicContext) => {
    const projectName = options.project;
    const rule = chain([
      addAngularESLintPackages(projectName),
      modifyAngularJsonAndEsLintFile(projectName),
      typescriptRules(projectName),
    ]);
    return rule(_tree, _context);
  };
}
