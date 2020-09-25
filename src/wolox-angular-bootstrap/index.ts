import { Rule, SchematicContext, Tree, apply, url, template, mergeWith, MergeStrategy, chain } from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { schematicAngularCLI } from './utils/angular-cli'
import { updatePackageJson } from './utils/package-json'
import { updateTsConfig } from './utils/ts-config'
import { angularJson } from './utils/angular-json'
import { removeKarma } from './utils/remove-files'

export function woloxAngularBootstrap(_options: any): Rule {
  const { name, style, routing } = _options
  return (tree: Tree, _context: SchematicContext) => {
    const templateSource = apply(url("./files"), [
      template({ ..._options, ...strings }),
    ]);
    const merged = mergeWith(templateSource, MergeStrategy.Overwrite);

    const rule = chain([
      schematicAngularCLI(name, routing, style),
      merged,
      updatePackageJson(name),
      updateTsConfig(name),
      angularJson(name),
      removeKarma(name)
    ]);

    return rule(tree, _context) as Rule;
  };
}
