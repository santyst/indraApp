# PGB

Aplicación móvil para realizar el registro de datos personales y metadatos relevantes.


## Pre-requisitos 📋

```
"@angular/common": "~10.0.0",
"@angular/core": "~10.0.0",
"@angular/forms": "~10.0.0",
"@angular/platform-browser": "~10.0.0",
"@angular/platform-browser-dynamic": "~10.0.0",
"@angular/router": "~10.0.0",
"@auth0/angular-jwt": "^5.0.2",
"@ionic-native/app-version": "^5.30.0",
"@ionic-native/camera": "^5.30.0",
"@ionic-native/core": "^5.0.0",
"@ionic-native/file-transfer": "^5.30.0",
"@ionic-native/network": "^5.30.0",
"@ionic-native/splash-screen": "^5.0.0",
"@ionic-native/sqlite": "^5.30.0",
"@ionic-native/sqlite-porter": "^5.30.0",
"@ionic-native/status-bar": "^5.0.0",
"@ionic-native/unique-device-id": "^5.30.0",
"@ionic/angular": "^5.0.0",
"@ionic/storage": "^2.3.1",
"cordova-plugin-app-version": "^0.1.12",
"cordova-plugin-file": "^6.0.2",
"cordova-plugin-file-transfer": "^1.7.1",
"cordova-plugin-network-information": "^2.0.2",
"cordova-plugin-uniquedeviceid": "^1.3.2",
"cordova-sqlite-storage": "^5.1.0",
"moment": "^2.29.1",
"rxjs": "~6.5.5",
"tslib": "^2.0.0",
"uk.co.workingedge.cordova.plugin.sqliteporter": "^1.1.1",
"zone.js": "~0.10.3"

"@angular-devkit/build-angular": "~0.1000.0",
"@angular/cli": "10.0.8",
"@angular/compiler": "~10.0.0",
"@angular/compiler-cli": "~10.0.0",
"@angular/language-service": "~10.0.0",
"@ionic/angular-toolkit": "^2.3.0",
"@types/jasmine": "~3.5.0",
"@types/jasminewd2": "~2.0.3",
"@types/node": "^12.11.1",
"codelyzer": "^6.0.0",
"cordova-android": "^9.0.0",
"cordova-plugin-camera": "^5.0.1",
"cordova-plugin-device": "^2.0.2",
"cordova-plugin-ionic-keyboard": "^2.2.0",
"cordova-plugin-ionic-webview": "^4.2.1",
"cordova-plugin-splashscreen": "^5.0.2",
"cordova-plugin-statusbar": "^2.4.2",
 "cordova-plugin-whitelist": "^1.3.3",
"jasmine-core": "~3.5.0",
"jasmine-spec-reporter": "~5.0.0",
"karma": "~5.0.0",
"karma-chrome-launcher": "~3.1.0",
"karma-coverage-istanbul-reporter": "~3.0.2",
"karma-jasmine": "~3.3.0",
"karma-jasmine-html-reporter": "^1.5.0",
"protractor": "~7.0.0",
"ts-node": "~8.3.0",
"tslint": "~6.1.0",
"typescript": "~3.9.5"

"platforms": [
   "android"
]
```

## Instalación del proyecto y pruebas ⚙️

* Extraer archivo .zip descargado de GitHub

* Instalar dependencias npm

```
    $ npm install
```

* Instalar recursos

```
    $ ionic cordova resources
```

* Instalar plataforma

```
    $ ionic cordova platform add android
```

* Instalar Plugins (si es necesario)

```
    $ ionic cordova plugin add YOUR_PLUGIN_NAME
```

## Lista de Plugins

```
     "cordova-sqlite-storage": {},
      "uk.co.workingedge.cordova.plugin.sqliteporter": {},
      "cordova-plugin-file-transfer": {},
      "cordova-plugin-whitelist": {},
      "cordova-plugin-statusbar": {},
      "cordova-plugin-device": {},
      "cordova-plugin-splashscreen": {},
      "cordova-plugin-ionic-webview": {
        "ANDROID_SUPPORT_ANNOTATIONS_VERSION": "27.+"
      },
      "cordova-plugin-ionic-keyboard": {},
      "cordova-plugin-app-version": {},
      "cordova-plugin-uniquedeviceid": {},
      "cordova-plugin-network-information": {},
      "cordova-plugin-camera": {
        "ANDROID_SUPPORT_V4_VERSION": "27.+"
      }
```

* Correr app en dispositivo

```
    $ ionic cordova run android
```

* Generar archivo APK de desarrollo

```
    $ ionic cordova build android
```


* Crear una clave para publicar en Google Play la aplicación


```
    $ keytool -genkey -v -keystore keystore folder address -alias app alias -keyalg RSA -keysize 2048 -validity 10000
```

* Crear aplicación de lanzamiento para Google Play

```
    $ ionic cordova build android --release
```

## Construido con 🛠️

* Npm V6.14.5
* Ionic V5.4.16 (TypeScript, Html, SCSS)
* Angular V10.0.8
* Cordova V10.0.0

## Contribuyendo 🖇️

* Santiago Sierra


## Versionado 📌

* v0.0.1 Control de cambios


## Autores ✒️

* Santiago Sierra


## Licencia 📄
