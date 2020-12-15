// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // firebaseConfig: {
  //   apiKey: 'AIzaSyCQYQQooPcw2gQEqNJQKzjhJoIqOR6y-vQ',
  //   authDomain: 'mp3-project-3bd46.firebaseapp.com',
  //   databaseURL: 'https://mp3-project-3bd46.firebaseio.com',
  //   projectId: 'mp3-project-3bd46',
  //   storageBucket: 'mp3-project-3bd46.appspot.com',
  //   messagingSenderId: '465410854805',
  //   appId: '1:465410854805:web:38284e013bb62ae85d309c',
  //   measurementId: 'G-21WJ99YYE1'
  // }

  firebaseConfig: {
    apiKey: 'AIzaSyDJiuCvU12wyy82oP4foqlW7PGOFEv_dSM',
    authDomain: 'angular9crud-41de3.firebaseapp.com',
    databaseURL: 'https://angular9crud-41de3.firebaseio.com',
    projectId: 'angular9crud-41de3',
    storageBucket: 'angular9crud-41de3.appspot.com',
    messagingSenderId: '1099174471360',
    appId: '1:1099174471360:web:f9bf858a4edf46c2926f25',
    measurementId: 'G-J2K8C1PQ82'
  },
  URL_API_POST: 'http://localhost:8080/api/posts/',
  URL_API_AUTH: 'http://localhost:8080/api/auth/',
  URL_API_USER_DETAIL: 'http://localhost:8080/api/user-details/',
  URL_SAVE_IMAGE_BLOG_FIREBASE: 'image-blog/',
  URL_API_LOGIN_SOCIAL: 'http://localhost:8080/login-social/',
  URL_API_COMMENT: 'http://localhost:8080/api/comment/',
  URL_AVATAR_DEFAULT: 'assets/img/avatar.jpeg'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
