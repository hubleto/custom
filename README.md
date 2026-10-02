# Hubleto

Free, customizable and self-hosted CRM/ERP.

## Installation

```
composer create-project hubleto/custom . --stability=YOUR_PREFERRED_STABILITY
npm install & npm run build
php hubleto init
```

where `YOUR_PREFERRED_STABILITY` can be:
  * `dev` for latest development version
  * `alpha` for alpha testing version
  * `stable` for stable version

> TIP: Visit https://developer.hubleto.eu for more details.

## Community apps

Community apps are always included.

## Enterprise apps

To install enterprise apps, run `composer require hubleto/enterprise` in the project's folder. If you do not have access to this repository, ask to be a **partner**.

## External apps

To install any external app, run `composer require app-vendor/app-name`. For example to install the `hubleto-linkedin-messages` from `wai-blue`, run `composer require wai-blue/hubleto-linkedin-messages`.

## Custom apps

To customize your Hubleto, you need to create `custom` apps. There are two ways to speed it up:

  * vibe-code with the help of use AI agents, or
  * by using `php hubleto create` CLI tool.

### Vibecoding

Check out [AI agent instructions](ai/instructions.md) or use [this prompt for constraining the agent](https://developer.hubleto.eu/v2/prompts/app-creation-constraints).

### CLI tool

  1. Create app's scaffolding: `php hubleto create app CarRental`
  2. Create the model: `php hubleto create model CarRental Car`
  3. Create basic UI: `php hubleto create mvc CarRental Car`

## Contribute

If you want to contribute to Hubleto core, follow these steps to setup your development environment:

  1. Create folder for Hubleto codebase, e.g. `mkdir /var/www/html/hubleto-core`
  2. Fork [`hubleto/erp`](https://github.com/hubleto/erp), [`hubleto/framework`](https://github.com/hubleto/framework), [`hubleto/assets`](https://github.com/hubleto/assets), [`hubleto/react-ui`](https://github.com/hubleto/react-ui) into `hubleto-core` folder.
     *Note: If you have access to repository with enterprise apps, you may fork this as well.*
  4. Symlink these forks by running following commands: `cd /var/www/html/hubleto` + `./bin/setup-dev-env.sh ../hubleto-core`
     *Note: the `setup-dev-env.sh` takes one argument - relative path to your Hubleto codebase*
  5. Initialize Hubleto: `php hubleto init`

Now, your `http://localhost/hubleto` will be rendered using the codebase in `hubleto-core`.

> TIP: Use `npm run watch` to automatically compile assets on every change in the UI.

## Support us

Hubleto is a community project and so it needs your help. We provide complete Hubleto code for free and maintain its development.

We will be very happy to get in touch with any company or individuals, willing to act as reseller or consultant.

Contact us on [Discord](https://discord.gg/DjtzK4WYYg), [LinkedIn](https://www.linkedin.com/company/hubleto) or [Reddit](https://www.reddit.com/r/hubleto).

## See also

  * https://github.com/hubleto - Hubleto source code
  * https://developer.hubleto.eu - developer guide for Hubleto
  * https://help.hubleto.eu - user guide for Hubleto
  * https://www.hubleto.eu - a presentation website
