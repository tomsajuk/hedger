var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
//var PRIVATE_KEY = JSON.parse(process.env.FIREBASE_KEY);
admin.initializeApp({
  /*credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.EMAIL_ID,
    privateKey: PRIVATE_KEY
}),*/
    credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hedger-invest.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "1234567890"
  }
});

module.exports = admin;
