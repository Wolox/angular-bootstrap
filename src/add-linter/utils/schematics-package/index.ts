import { SchematicContext, Tree } from '@angular-devkit/schematics';
import { devDependencies } from './constants';

/**
 * All functions were taken from @angular-eslint/schematics in favour of using eslint.
 * @angular-eslint/schematic provides rules to follow based on the https://angular.io/styleguide:
 *  - plugin:@angular-eslint/recommended
 *  - plugin:@angular-eslint/template/process-inline-templates
 *  - plugin:@angular-eslint/template/recommended
 */

export function createRootESLintConfig(prefix: string | null) {
  let codeRules = {
    '@angular-eslint/directive-selector': [
      'error',
      { type: 'attribute', prefix, style: 'camelCase' },
    ],
    '@angular-eslint/component-selector': [
      'error',
      { type: 'element', prefix, style: 'kebab-case' },
    ],
  };

  return {
    root: true,
    ignorePatterns: ['projects/**/*'],
    overrides: [
      {
        files: ['*.ts'],
        parserOptions: {
          project: ['tsconfig.json'],
          createDefaultProgram: true,
        },
        extends: [
          'plugin:@angular-eslint/recommended',
          'plugin:@angular-eslint/template/process-inline-templates',
        ],
        rules: codeRules,
      },
      {
        files: ['*.html'],
        extends: ['plugin:@angular-eslint/template/recommended'],
        rules: {},
      },
    ],
  };
}

export function addESLintTargetToProject(
  angularJson: Record<string, any>,
  projectName: string
) {
  const existingProjectConfig = { ...angularJson };

  let lintFilePatternsRoot = '';

  // Default Angular CLI project at the root of the workspace
  if (existingProjectConfig.projects[projectName].root === '') {
    lintFilePatternsRoot = 'src';
  } else {
    lintFilePatternsRoot = existingProjectConfig.projects[projectName].root;
  }

  existingProjectConfig.cli = existingProjectConfig?.cli
    ? existingProjectConfig.cli
    : {};
  existingProjectConfig.cli.defaultCollection = '@angular-eslint/schematics';

  const eslintTargetConfig = {
    builder: '@angular-eslint/builder:lint',
    options: {
      lintFilePatterns: [
        `${lintFilePatternsRoot}/**/*.ts`,
        `${lintFilePatternsRoot}/**/*.html`,
      ],
    },
  };

  existingProjectConfig.projects[projectName].architect['lint'] =
    eslintTargetConfig;

  return existingProjectConfig;
}

export function addAngularESLintPackages(projectName: string) {
  return (host: Tree, context: SchematicContext) => {
    if (!host.exists(`./${projectName}/package.json`)) {
      throw new Error(
        'Could not find a `package.json` file at the root of your workspace'
      );
    }

    if (host.exists(`./${projectName}/tsconfig.base.json`)) {
      throw new Error(
        '\nError: Angular CLI v10.1.0 and later (and no `tsconfig.base.json`) is required in order to run this schematic. Please update your workspace and try again.\n'
      );
    }

    const projectPackageJSON = (
      host.read(`./${projectName}/package.json`) as Buffer
    ).toString('utf-8');
    const json = JSON.parse(projectPackageJSON);
    json.devDependencies = json.devDependencies || {};
    json.devDependencies['eslint'] = '8.x';
    json.scripts = json.scripts || {};
    json.scripts['lint'] = json.scripts['lint'] || 'ng lint';

    // @angular-eslint packages
    json.devDependencies = { ...json.devDependencies, ...devDependencies };

    json.devDependencies = sortObjectByKeys(json.devDependencies);
    host.overwrite(
      `./${projectName}/package.json`,
      JSON.stringify(json, null, 2)
    );

    context.logger.info(`
All @angular-eslint dependencies have been successfully installed 🎉
Please see https://github.com/angular-eslint/angular-eslint for how to add ESLint configuration to your project.
`);

    return host;
  };
}

export function modifyAngularJsonAndEsLintFile(projectName: string) {
  return (host: Tree, _context: SchematicContext) => {
    const path = `./${projectName}/angular.json`;
    const angularJSON = (host.read(path) as Buffer).toString('utf-8');

    const json = JSON.parse(angularJSON);

    const prefix = json.projects[projectName].prefix;

    const eslintConfig = createRootESLintConfig(prefix);

    host.create(
      `./${projectName}/.eslintrc.json`,
      JSON.stringify(eslintConfig, null, 2)
    );

    const newAngularJSON = addESLintTargetToProject(json, projectName);
    host.overwrite(path, JSON.stringify(newAngularJSON, null, 2));

    return host;
  };
}

function sortObjectByKeys(obj: Record<any, any>) {
  return Object.keys(obj)
    .sort()
    .reduce((result, key) => {
      return Object.assign(Object.assign({}, result), { [key]: obj[key] });
    }, {});
}
