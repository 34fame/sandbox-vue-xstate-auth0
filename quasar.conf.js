module.exports = function(/* ctx */) {
   return {
      supportTS: false,
      boot: [
         'logger',
         'auth',
         'axios',
         'notify',
         'loading',
      ],

      css: [
         'app.sass',
      ],

      extras: [
         'fontawesome-v5',
         'roboto-font', // optional, you are not bound to it
         'material-icons', // optional, you are not bound to it
      ],

      build: {
         vueRouterMode: 'history',

         extendWebpack(cfg) {
         },
      },

      devServer: {
         https: false,
         port: 8080,
         open: true, // opens browser window automatically
      },

      framework: {
         iconSet: 'material-icons', // Quasar icon set
         lang: 'en-us', // Quasar language pack
         config: {},

         importStrategy: 'auto',

         plugins: [
            'LocalStorage',
            'SessionStorage',
            'Notify',
            'Loading',
            'Dialog',
         ],
      },

      animations: [],

      ssr: {
         pwa: false,
      },

      pwa: {
         workboxPluginMode: 'GenerateSW', // 'GenerateSW' or 'InjectManifest'
         workboxOptions: {}, // only for GenerateSW
         manifest: {
            name: `Quasar App`,
            short_name: `Quasar App`,
            description: `A Quasar Framework app`,
            display: 'standalone',
            orientation: 'portrait',
            background_color: '#ffffff',
            theme_color: '#027be3',
            icons: [
               {
                  src: 'icons/icon-128x128.png',
                  sizes: '128x128',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-192x192.png',
                  sizes: '192x192',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-256x256.png',
                  sizes: '256x256',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-384x384.png',
                  sizes: '384x384',
                  type: 'image/png',
               },
               {
                  src: 'icons/icon-512x512.png',
                  sizes: '512x512',
                  type: 'image/png',
               },
            ],
         },
      },

      // Full list of options: https://quasar.dev/quasar-cli/developing-cordova-apps/configuring-cordova
      cordova: {
         // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
      },

      // Full list of options: https://quasar.dev/quasar-cli/developing-capacitor-apps/configuring-capacitor
      capacitor: {
         hideSplashscreen: true,
      },

      // Full list of options: https://quasar.dev/quasar-cli/developing-electron-apps/configuring-electron
      electron: {
         bundler: 'packager', // 'packager' or 'builder'

         packager: {
            // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

            // OS X / Mac App Store
            // appBundleId: '',
            // appCategoryType: '',
            // osxSign: '',
            // protocol: 'myapp://path',

            // Windows only
            // win32metadata: { ... }
         },

         builder: {
            // https://www.electron.build/configuration/configuration

            appId: 'q-xstate-auth',
         },

         // More info: https://quasar.dev/quasar-cli/developing-electron-apps/node-integration
         nodeIntegration: true,

         extendWebpack(/* cfg */) {
            // do something with Electron main process Webpack cfg
            // chainWebpack also available besides this extendWebpack
         },
      },
   }
}
