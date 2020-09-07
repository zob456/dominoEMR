import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

import {
    apiKey,
    authDomain,
    databaseURL,
    projectId,
    storageBucket,
    messagingSenderId,
    appId
}
    //@ts-ignore
    from '@env'

const firebaseConfig = {
    apiKey: apiKey,
    appId: appId,
    projectId: projectId,
    authDomain: authDomain,
    databaseURL: databaseURL,
    storageBucket: storageBucket,
    messagingSenderId: messagingSenderId
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const firebaseAuth = firebaseApp.auth();