# Custom Hubleto CRM/ERP

This document describes the technical details about customization of Hubleto CRM/ERP. In most cases, it refers to developer guide (https://developer.hubleto.eu).

Document contains 2 main chapters:
  * Chapter *Architectural Guidelines* describes overall technical aspects of Hubleto.
  * Chapter *Coding and design patterns* describes various aspects of Hubleto customization, such as creating new app, adding a model, adding a controller or using 3-rd party libraries.

# Architectural Guidelines

## About

- Hubleto is PHP-based opensource CRM/ERP solution, codebase located in https://github.com/hubleto.
- Core backend framework is Hubleto framework (https://github.com/hubleto/framework)
- Core fronted framework is Hubleto React UI (https://github.com/hubleto/react-ui)
- Each new functionality must be encapsulated as a custom Hubleto app (namespace Hubleto\App\Custom)
- Each app uses a Model-View-Controller (MVC) architecture

## Available documentation

- Developer guide (https://developer.hubleto.com) contains examples, source documentation and various tips&tricks.
- Community apps are free and available on github (https://github.com/hubleto/erp/apps)

## Folder and file strtucture

- Custom apps (namespace Hubleto\App\Custom) must be stored in {{ projectFolder }}/src/apps
- Each app must follow files and folder structure described in https://developer.hubleto.com/v0/docs/erp/apps/folder-structure

## Data Access

### General constraints

- Hubleto wraps Laravel Eloquent into its unique database layer.
- Hubleto's database layer consists of 2 sub-layers: 
  - Hubeto\Framework\Model for describing the data structure (columns/attributes), UI behavior (see methods *describeColumns*, *describeInputs*, *describeTable* and *describeForm*) and relations.
  - Hubleto\Framework\RecordManager for performing the real data access. This RecordManager layer uses Laravel's Eloquent ORM.
- Each model must have its appropriate record manager
- Each model must have UPPERCASE relations for each Lookup column.
- Each relation must be implemented in record manager, either as eloquent's BelongsTo or HasMany

### Files required for each model

Each model requires following files: "Model", "RecordManager" and initial "Migration". These files are described below.

*Model*

Shall be located in `APP_ROOT/Models/<ModelName>.php` and shall be based on `erp/cli/templates/snippets/Model.php.twig`.

*RecordManager*

Shall be located in `APP_ROOT/Models/RecordManagers/<ModelName>.php` and shall be based on `erp/cli/templates/snippets/ModelRecordManager.php.twig`.

*Migration*

Shall be located in `APP_ROOT/Models/Migrations/<ModelName>_0001.php` and shall be based on `erp/cli/templates/snippets/ModelMigration.php.twig`.

## Directory structure

- `PROJECT_FOLDER/`: Folder created by running `composer create-project hubleto/custom .`
  - `src/`: Core application logic
    - `src/apps/`: Custom apps for this project
      - `src/apps/MyCustomApp/Components/`: Hubleto React UI components for tables and forms (e.g. FormContact.tsx and TableContacts.tsx)
      - `src/apps/MyCustomApp/Models/`: Models used in the app.
      - `src/apps/MyCustomApp/Models/RecordManagers/`: Record managers for each model
      - `src/apps/MyCustomApp/Controllers/`: PHP controllers used in the app (extending from Hubleto\Erp\Controller).
      - `src/apps/MyCustomApp/Views/`: Views used in the app (Twig)
  - `tests/`: PHPUnit-compatible tests

## Technical Constraints

- **Backend language:** PHP
- **Frontend language:** HTML with Twig, React
- **Backend framework:** PHP (Hubleto framework, https://github.com/hubleto/framework)
- **Frontend framework:** Hubleto React UI framework (https://github.com/hubleto/react-ui)
- **Database:** SQL (accesesed via Record Managers)

## Commands
- **Create initial project files and folder structure:** `composer create-project hubleto/custom .`
- **Create new custom app named `MyCustomApp`**: `php hubleto create app MyCustomApp`

## Description of the app
// PUT HERE DESCRIPTION OF THE APP YOU WANT TO GENERATE