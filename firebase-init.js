// ЗАМЕНИТЕ ЗДЕСЬ НА ВАШ Firebase Web config из Project settings -> Your apps
// Пример:
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAoPj6LGIP0JsGzDDh15dL9kphrpfxvkaI",
  authDomain: "arnoldhkg.firebaseapp.com",
  projectId: "arnoldhkg",
  storageBucket: "arnoldhkg.firebasestorage.app",
  messagingSenderId: "766389299991",
  appId: "1:766389299991:web:83401bfc85946a82496552",
  measurementId: "G-2VPXH2679M"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Экспортируем db в глобальную область для app.js
window.db = db;
