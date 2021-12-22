import { Tree } from '@angular-devkit/schematics/src/tree/interface';
import {
  Rule,
  SchematicContext,
  SchematicsException,
} from '@angular-devkit/schematics';

export function typescriptRules(): Rule {
  return (tree: Tree, _: SchematicContext): Tree => {
    const path = '.eslintrc.json';
    if (tree.exists(path)) {
      const eslintrc = (tree.read(path) as Buffer).toString();
      const json = JSON.parse(eslintrc);
      const overridesZero = json.overrides[0];
      const extendsConfig = [
        ...overridesZero.extends,
        '@wolox/eslint-config-typescript',
      ];

      json.overrides[0].extends = extendsConfig;

      tree.overwrite(path, JSON.stringify(json, null, 2));
      return tree;
    }
    throw new SchematicsException(`Does not exist ${path}.`);
  };
}
