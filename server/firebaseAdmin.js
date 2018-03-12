var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://hedger-invest.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: "1234567890"
  }
});

module.exports = admin;
