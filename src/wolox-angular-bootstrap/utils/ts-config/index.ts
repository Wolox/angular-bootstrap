import {
  Rule,
  Tree,
  SchematicContext,
  SchematicsException,
} from '@angular-devkit/schematics';

export function updateTsConfig(name: string): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    const path = `/${name}/tsconfig.json`;
    if (tree.exists(path)) {
      const file = tree.read(path);
      // Remove comments
      const fileString = file!
        .toString()
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
      const json = JSON.parse(fileString);

      // Update compilerOptions
      json.compilerOptions = {
        ...json.compilerOptions,
        esModuleInterop: true,
      };

      tree.overwrite(path, JSON.stringify(json, null, 2));
      return tree;
    }
    throw new SchematicsException(`Does not exist ${path}.`);
  };
}

export function updateTsConfigSpec(name: string): Rule {
  return (tree: Tree, _context: SchematicContext): Tree => {
    const path = `/${name}/tsconfig.spec.json`;
    if (tree.exists(path)) {
      const file = tree.read(path);
      // Remove comments
      const fileString = file!
        .toString()
        .replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
      const json = JSON.parse(fileString);

      // Update compilerOptions
      json.compilerOptions = {
        ...json.compilerOptions,
        emitDecoratorMetadata: true,
        types: ['jest'],
      };
      json.files = ['src/polyfills.ts'];
      tree.overwrite(path, JSON.stringify(json, null, 2));
      return tree;
    }
    throw new SchematicsException(`Does not exist ${path}.`);
  };
}
