declare global {
  var dictionary: any;
  var main: any;
  var hubleto: any;
}

//@ts-ignore
import $ from 'jquery';
//@ts-ignore
import React, { Component } from 'react';

import { HubletoReactUi } from "@hubleto/react-ui/core/Loader";
import App from '@hubleto/react-ui/core/App'
import request from "@hubleto/react-ui/core/Request";

// core hubleto react ui components
import Modal from "@hubleto/react-ui/components/fc/Modal";
import Table from "@hubleto/react-ui/components/fc/Table";
import Form from "@hubleto/react-ui/components/fc/Form";
import Spinner from "@hubleto/react-ui/components/fc/Spinner";
import Tree from "@hubleto/react-ui/components/cc/Tree";
import ErpSearch from "@hubleto/react-ui/components/cc/ErpSearch";

// inputs
import InputVarchar from "@hubleto/react-ui/components/fc/Inputs/Varchar";
import InputInt from "@hubleto/react-ui/components/fc/Inputs/Int";
import InputBoolean from "@hubleto/react-ui/components/fc/Inputs/Boolean";
import InputColor from "@hubleto/react-ui/components/fc/Inputs/Color";
import InputDateTime from "@hubleto/react-ui/components/fc/Inputs/DateTime";
import InputLookup from "@hubleto/react-ui/components/fc/Inputs/Lookup";
import InputImage from "@hubleto/react-ui/components/fc/Inputs/Image";
import InputHyperlink from "@hubleto/react-ui/components/fc/Inputs/Hyperlink";
import InputUserSelect from "@hubleto/react-ui/components/fc/Inputs/UserSelect";
import InputSharedWith from "@hubleto/react-ui/components/fc/Inputs/SharedWith";
import InputWysiwyg from "@hubleto/react-ui/components/cc/Inputs/Wysiwyg";
import InputTextareaWithHtmlPreview from "@hubleto/react-ui/components/fc/Inputs/TextareaWithHtmlPreview";
import InputJson from "@hubleto/react-ui/components/cc/Inputs/Json";
import InputJsonKeyValue from "@hubleto/react-ui/components/cc/Inputs/JsonKeyValue";

// import TableCellRendererHyperlink from "@hubleto/react-ui/components/cc/TableCellRenderers/Hyperlink";
// import TableCellRendererSharedWith from "@hubleto/react-ui/components/cc/TableCellRenderers/SharedWith";
// import FormExtended from "@hubleto/react-ui/components/cc/FormExtended";
// import TableExtended from "@hubleto/react-ui/components/cc/TableExtended";
// import TableExtendedColumnCustomize from "@hubleto/react-ui/components/cc/TableExtendedColumnsCustomize";

try {

  class HubletoErp extends HubletoReactUi {
    language: string = 'en';
    currencySymbol: string = '€';
    idUser: number = 0;
    userEmail: string = '';
    isPremium: boolean = false;
    user: any;
    users: any;
    apps: any = {};

    constructor(config: any) {
      super(config);

      this.idUser = config.idUser;
      this.userEmail = config.userEmail;
      this.isPremium = config.isPremium;
      this.language = config.language;
      this.dictionary = globalThis.dictionary;

      this.registerReactComponent('Modal', Modal);

      this.registerReactComponent('InputVarchar', InputVarchar);
      this.registerReactComponent('InputInt', InputInt);
      this.registerReactComponent('InputLookup', InputLookup);
      this.registerReactComponent('InputBoolean', InputBoolean);
      this.registerReactComponent('InputImage', InputImage);
      this.registerReactComponent('InputColor', InputColor);
      this.registerReactComponent('InputDateTime', InputDateTime);
      this.registerReactComponent('InputHyperlink', InputHyperlink);
      this.registerReactComponent('InputUserSelect', InputUserSelect);
      this.registerReactComponent('InputSharedWith', InputSharedWith);
      this.registerReactComponent('InputWysiwyg', InputWysiwyg);
      this.registerReactComponent('InputTextareaWithHtmlPreview', InputTextareaWithHtmlPreview);
      this.registerReactComponent('InputJson', InputJson);
      this.registerReactComponent('InputJsonKeyValue', InputJsonKeyValue);

      // Hubleto components
      this.registerReactComponent('Search', ErpSearch);
      this.registerReactComponent('Form', Form);
      this.registerReactComponent('Table', Table);
      this.registerReactComponent('Spinner', Spinner);
      this.registerReactComponent('Tree', Tree);
    }

    init() {
      request.post(
        'api/get-users',
        {},
        {},
        (data: any) => {
          this.users = data;
        }
      );
      for (let appNamespace in this.apps) {
        // console.log('Init app ' + appNamespace);
        this.apps[appNamespace].init();
      }
    }

    translate(orig: string, context?: string, contextInner?: string, vars?: any): string {
      let translated: string = orig;

      if (this.language === 'en') translated = orig;
      else if (this.dictionary === null) translated = orig;
      else {
        context = (context ?? '').replaceAll('\\', '-').toLowerCase();
        contextInner = contextInner ?? '';

        if (
          this.dictionary[context]
          && this.dictionary[context][contextInner]
          && this.dictionary[context][contextInner][orig]
          && this.dictionary[context][contextInner][orig] != ''
        ) {
          translated = this.dictionary[context][contextInner][orig] ?? '';
        } else {
          translated = '';
          this.addToDictionary(orig, context, contextInner);
        }

        if (translated == '') translated = '**' + orig + '**';
      }
      
      if (vars) {
        Object.keys(vars).map((varName) => {
          const varValue = vars[varName];
          translated = translated.replace('{{ ' + varName + ' }}', varValue);
        })
      }

      return translated;
    }

    loadDictionary(language: string) {
      // if (language == 'en') return;

      // this.language = language;

      // request.get(
      //   'api/dictionary',
      //   { language: language },
      //   (data: any) => {
      //     this.dictionary = data;
      //   }
      // );
      this.dictionary = globalThis.dictionary;
    }

    addToDictionary(orig: string, context: string, contextInner: string) {
      request.get(
        'api/dictionary',
        {
          language: this.language,
          addNew: {
            orig: orig,
            context: context,
            contextInner: contextInner,
          }
        },
      );
    }

    registerApp(appNamespace: string, app: App) {
      app.namespace = appNamespace;
      this.apps[appNamespace] = app;
    }

    getApp(appNamespace: string) {
      return this.apps[appNamespace] ?? null;
    }

    createThemeObserver() {
      // MutationObserver looks for changes in DOM. Anytime a change is detected,
      // a light or dark theme is applied to changed or newly created DOM elements.
      (new MutationObserver((mutations, observer) => {
        if (localStorage.theme == "dark") {
          // Whenever the user explicitly chooses light mode
          $('*').addClass('dark');
        } else {
          // Whenever the user explicitly chooses dark mode
          $('*').removeClass('dark');
        }
      })).observe(document, { subtree: true, attributes: true });
    }

    // startConsoleErrorLogger() {
    //   console.log('Hubleto: Starting console.error debugger.');
    //   if (window.console && console.error) {
    //     const ce = console.error;
    //     console.error = function() {
    //       request.post(
    //         'api/log-javascript-error',
    //         {},
    //         { errorRoute: '{{ route }}', errors: arguments }
    //       );
    //       ce.apply(this, arguments)
    //     }
    //   }
    // }

  }

  //@ts-ignore
  const hubleto: HubletoErp = new HubletoErp(window.ConfigEnv);

  globalThis.main = hubleto; // deprecated
  globalThis.hubleto = hubleto;

  document.addEventListener('readystatechange', function() {
    if (document.readyState === 'complete') {
      globalThis.hubleto.init();
      globalThis.hubleto.renderReactElements();
      globalThis.hubleto.createThemeObserver();
      globalThis.hubleto.registerModalShortcuts();
    }
  });
} catch (e) {
  console.log('Failed to init Hubleto.', e);
}