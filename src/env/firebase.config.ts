
export const firebaseConfig = {
    apiKey: "AIzaSyDHkRvvXQ5REcIpqOLT5_Ye3jwc1Iv-yxw",
    authDomain: "pfp-showcase-firebase.firebaseapp.com",
    projectId: "pfp-showcase-firebase",
    storageBucket: "pfp-showcase-firebase.appspot.com",
    messagingSenderId: "35994206673",
    appId: "1:35994206673:web:6ac5a4c56cd092b252e0f0",
    imageTemplateUrl: (name: string) => `https://firebasestorage.googleapis.com/v0/b/pfp-showcase-firebase.appspot.com/o/pfps%2F${name}?alt=media&token=aefbb9b0-1c3e-40b6-b1af-e67983a94333`
};