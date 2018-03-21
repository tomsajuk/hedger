var admin = require("firebase-admin");
//var serviceAccount = require("./serviceAccountKey.json");
var PRIVATE_KEY = process.enc.FIREBASE_KEY;
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.EMAIL_ID,
    privateKey: PRIVATE_KEY
  }),
  databaseURL: "https://hedger-invest.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "1234567890"
  }
});

module.exports = admin;
