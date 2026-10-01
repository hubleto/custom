# Hubleto

Free, customizable and self-hosted CRM/ERP.

## Installation

1. Create empty folder.
2. Run one of the following commands based on which version you want to install:
  * `composer create-project hubleto/erp-project . --stability=dev` for latest development version
  * `composer create-project hubleto/erp-project . --stability=alpha` for alpha testing version
  * `composer create-project hubleto/erp-project . --stability=stable` for stable version
3. Run `php hubleto init` to initialize Hubleto.

## Custom apps

To customize your Hubleto, create your `custom` apps:

  1. Create app's scaffolding: `php hubleto create app CarRental`
  2. Create the model: `php hubleto create model CarRental Car`
  3. Create basic UI: `php hubleto create mvc CarRental Car`

> TIP: Check out `ai/instructions.md` instructions for better vibe-coding experience or instruct your agent to study this.

> TIP: Visit https://developer.hubleto.eu for more details on how to develop custom Hubleto apps.

❤️ Give us a star it if you like Hubleto. Thank you. ❤️

## Custom React UI components

We recommend you to use free [Hubleto React UI](https://github.com/hubleto/react-ui) library to develop rich data management features into your apps.

Run commands below to install it:

```
cd /var/www/html/hubleto
./bin/prepare-assets.sh
npm run build
```

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

Do not hesitate and contact us via [LinkedIn](https://www.linkedin.com/company/hubleto) or [Reddit](https://www.reddit.com/r/hubleto).

## See also

  * https://github.com/hubleto/erp - the 'main' repository for Hubleto
  * https://developer.hubleto.eu - developer guide for Hubleto
  * https://help.hubleto.eu - user guide for Hubleto
  * https://www.hubleto.eu - a presentation website
  * https://community.hubleto.eu - a discussion forum about everything related to Hubleto
  * https://www.hubleto.eu/demo - try demo
