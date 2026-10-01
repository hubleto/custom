# Custom Hubleto CRM/ERP

This document describes the technical details about customization of Hubleto CRM/ERP. In most cases, it refers to developer guide (https://developer.hubleto.eu).

Document contains 2 main chapters:
  * Chapter *Overview* describes overall technical aspects of Hubleto.
  * Chapter *Coding and design patterns* describes various aspects of Hubleto customization, such as creating new app, adding a model, adding a controller or using 3-rd party libraries.


# Overview

## Repositories

Hubleto is PHP-based opensource CRM/ERP solution, its codebase is located in https://github.com/hubleto and is structured followingly:

  - Backend framework in https://github.com/hubleto/framework
  - ERP community apps depend on the framework and are in https://github.com/hubleto/erp
  - Frontend framework is in https://github.com/hubleto/react-ui
  - Javascript, CSS and other assets are in https://github.com/hubleto/assets

## Documentation

Development documentation is in the developer guide at https://developer.hubleto.eu.

There is also a series of lessons ad https://developer.hubleto.eu/certification/level-1 to get familiar with basics of Hubleto development.

Source code is documented at https://developer.hubleto.eu/source-code.

## Installation

Installation is done by running following commands:

```
composer create-project hubleto/custom .
php hubleto init
```

More details are in README.md.


## Files and folders

During the installation, following folder structure created:

- `PROJECT_FOLDER/`: Folder created by running `composer create-project hubleto/custom .`
  - `src/`: Core application logic
    - `src/apps/`: Custom apps for this project
      - `src/apps/MyCustomApp/Components/`: Hubleto React UI components for tables and forms (e.g. FormContact.tsx and TableContacts.tsx)
      - `src/apps/MyCustomApp/Models/`: Models used in the app.
      - `src/apps/MyCustomApp/Models/RecordManagers/`: Record managers for each model
      - `src/apps/MyCustomApp/Controllers/`: PHP controllers used in the app (extending from Hubleto\Erp\Controller).
      - `src/apps/MyCustomApp/Views/`: Views used in the app (Twig)
  - `tests/`: PHPUnit-compatible tests

## Customization

Most of Hubleto customization happens in `custom` apps. These apps have `Hubleto\App\Custom` namespace. For example, namespace for `CarRental` is `Hubleto\App\Custom\CarRental`.

Custom apps can often be linked with existing community apps. More about community apps, their structure and meaning is on https://developer.hubleto.eu/apps/community.

Custom apps are stored in `PROJECT_ROOT/src/apps` folder. More details on app folder structure and its content is on https://developer.hubleto.eu/docs/erp/apps or https://developer.hubleto.eu/v0/docs/erp/apps/folder-structure.

Customization may be logicaly split into several apps. For example, CRM for car rental company can contain following apps:

  - `Hubleto\App\Custom\Cars` for management of fleet of cars.
  - `Hubleto\App\Custom\Rentals` for management of car rentals.

In this example, the `Rentals` app could be integrated with community app `Customers` to link a specific rental with a customer.

## Integration with other apps

There are other integrations available, for example:

  - App can expose its settings via `Settings\Manager` service.
  - App can manage their own calendars by extending `Hubleto\App\Community\Calendar\Models\Activity` model, `Hubleto\App\Community\Calendar\Calendar` class and configuring `Calendar\Manager` service.
  - App can integrate into workflow by using `id_workflow` and `id_workflow_step` attributes in its model, using `renderWorkflowUi` in the form React component and configuring `Workflow\Manager` service.
  - App can introduce its dashboard panels by configuring `Dashboards\Manager` service.
  - App can notify user by implementing `getSidebarBadgeNumber` or `renderPriorityNotification` methods in its `Loader` class.

For more details and examples study the source code of community apps.

## Other interesting topics

Following design patterns and topics are worth deeper study:

  - `Cron` for creation of scheduled jobs
  - `EventListener` for creating various hooks
  - `Extendibles\AppMenu` for customizing app's topbar menu
  - `Models` and their `RecordManagers` and `Migrations` for data structure definition
  - `Components` for development of custom React-based UI components
  - `manifest.yaml` file for description of app

## Data Access

- Hubleto wraps Laravel Eloquent into its unique database layer.
- Hubleto's database layer consists of 2 sub-layers: 
  - Hubeto\Framework\Model for describing the data structure (columns/attributes), UI behavior (see methods *describeColumns*, *describeInputs*, *describeTable* and *describeForm*) and relations.
  - Hubleto\Framework\RecordManager for performing the real data access. This RecordManager layer uses Laravel's Eloquent ORM.
- Each model must have its appropriate record manager
- Each model must have UPPERCASE relations for each Lookup column.
- Each relation must be implemented in record manager, either as eloquent's BelongsTo or HasMany
