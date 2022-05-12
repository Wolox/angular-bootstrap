import {
  Rule,
  SchematicContext,
  Tree,
  apply,
  url,
  template,
  mergeWith,
  MergeStrategy,
  chain,
} from '@angular-devkit/schematics';
import { strings } from '@angular-devkit/core';
import { schematicAngularCLI } from './utils/angular-cli';
import { updatePackageJson } from './utils/package-json';
import { updateTsConfig, updateTsConfigSpec } from './utils/ts-config';
import { angularJson } from './utils/angular-json';
import { removeKarma } from './utils/remove-files';
import { RunSchematicTask } from '@angular-devkit/schematics/tasks';
import { replaceFiles } from './utils/replace-files';

export function initialize(_options: any): Rule {
  const { name, style, routing, storybook } = _options;
  return (_tree: Tree, context: SchematicContext) => {
    const templateSource = apply(url('./files'), [
      template({ ..._options, ...strings }),
    ]);
    const merged = mergeWith(templateSource, MergeStrategy.Overwrite);

    const rule = chain([
      schematicAngularCLI(name, routing, style),
      merged,
      updatePackageJson(name),
      updateTsConfig(name),
      updateTsConfigSpec(name),
      angularJson(name),
      removeKarma(name),
      replaceFiles(name),
    ]);

    context.addTask(new RunSchematicTask('add-linter', { project: name }));

    if(storybook) {
      context.addTask(new RunSchematicTask('add-storybook', { project: name }));
    }

    return rule(_tree, context) as Rule;
  };
}
