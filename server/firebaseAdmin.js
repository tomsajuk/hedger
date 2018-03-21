var admin = require("firebase-admin");
//var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.PROJECT_ID,
    clientEmail: process.env.EMAIL_ID,
    privateKey: '-----BEGIN PRIVATE KEY-----\n'+process.env.FIREBASE_KEY+'\n-----END PRIVATE KEY-----\n'
  }),
  databaseURL: "https://hedger-invest.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "1234567890"
  }
});

module.exports = admin;
