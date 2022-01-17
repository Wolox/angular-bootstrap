import {
  Rule,
  Tree,
  SchematicContext,
  chain,
} from '@angular-devkit/schematics';
import { replaceFavicon } from './favicon';

export function replaceFiles(name: string): Rule {
  return (tree: Tree, _: SchematicContext) => {
    return chain([replaceFavicon(name)])(tree, _);
  };
}
