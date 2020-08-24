import { Rule, Tree, SchematicContext } from "@angular-devkit/schematics";

const karmaFilesPaths = [
  "./karma.conf.js"
];

export function removeKarma(): Rule {
  return (tree: Tree, _: SchematicContext): Tree => {
    karmaFilesPaths.forEach((file) => {
      if (tree.exists(file)) {
        tree.delete(file);
      }
    });
    return tree;
  };
}
