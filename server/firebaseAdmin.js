var admin = require("firebase-admin");
//var serviceAccount = require("./serviceAccountKey.json");
var PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC2fux8d8JBSv7N\naA6XgiccXRF3P1FVVvpbU4oiUavlAmveu2s5CmR1Pj2zff9Z2Zgeo93ELs5z8mVu\ndemH80h5x4fRKZYDFI+SN5YKgtWccQreQ+U3qukplF8ZuJmBW/lcJRcN2cQfIMNF\n0tJm0emqEZ+iSPA6mwyc9ZP9nT1IkU/D4ZJcQ3MfuzaPbGAiHyskBfcvQDbv3KJy\n0AdeMotVsGgV8Q3jI75LZ2qJvnZN1otpbmIbSb12Jpp5atazh6LDXsDqbcEyjhb1\nQKXQOmqDSJSQVcKN7BaGghEBUbtHzP1Fg9KVbSdn1bRkT9YStpYjuVGOXBuxSY6q\nQlpXTYjNAgMBAAECggEABvbMxarFeTvITmrwOs+tXpoEmE7ZWgILZFNjSMNiGMdt\nxpGgJvL8RppJ8Ec+6J0l/qFVM9VvbNUTeGwiepAjmpYTjj1IHrT42st2CJxzVCV4\nlM1b4Jk/WllYA05cLHR0jXofqTHysUqZ33IkmkzcKr1cBwbbUZLO7LYIYDWEYngs\nZ0VA7j/Q2IUo60KJzseQg60VM7aTQto6KCX3g6pN9P8es6b5R0e/sXjm6dpyYXFW\nm2t3D91YNcnZ3nLxVTCvXYdFFJ48cf9GLZLwLuB1YpeGMpwXuW8r8YqQE3Yc1VPJ\neE4vtpHrPuwzCGPTwLnf5wPFcyFBvprspTlfi3UE8QKBgQD8hHcS61o3iepgW6hE\nTxkU5Ih2N95iZmW5HH4j3taenDkAyuWi4X/S55GkphE2d5WIeXtR46V1yhZunpxS\n/YWRNUeNt+ZcFuxCFlZ4T2UELwOeE4lDrHJprbUTM3Pd36qny3hdPjkE0JazQ021\nhKJUhtF3hoq+K5q6gEt8IfKxOQKBgQC5Az25W5rC/M2Bg+E7/Cf4QF7wvLB/ueym\nC9FLLYcuXA/51s2zOnL2P6EzZEzUfWFdBWr5MV2+fev9g9E6nszvuP9mTvvwa7gW\newmREgLP2aXKCbaBKSPgbSUQGq5ecRF+1QzRYTthfRuxlWjYHgzSYt5TR5GlmZiC\nJ+UKHn2YNQKBgBVA4PTKslEyXnO1wzfcoHPNuF6a3TDTBYTLDSLfwpie9X1HloRb\nDnMl4nBFOfWnowJVlzeRPX/ofnLZDrc9d1x9a4RWEiF2HHSDhMujgxETE+7eHhOA\nFDEo2bDAB+SIyshMq9jNP+dT1xtHcubwPul2X3L78/mFmgRQgAn2oYKhAoGAJvah\nxymdnDb1aLNHegSOvl+AHx795MhZKFcQys5Zy8+jpbAxPe+vSmD4KASVkaKeIKMF\ndlmJLpcCXi+mnrvW2R2S3A8CTA3DhSiASUcLxI5Hthb5kpYBckBKL+wOkOErGBTy\nUB40DUH11R5sKCeb96rOu6c06zU/wxl3yPvG44kCgYAlsLHLHWbv+s0dvE9oNVNM\n0V5GZWIhJFRzRnIZy37YPtuRxlp16aKNd/MOlmk3lAEz10Gpn3l8zKmqzPSFlsFC\nrTJfZrYBV+CCwiaxKagFBZTicbU/2OGqAYr1dG4/P4vEUlsc1ouM9hQl7ugKlziJ\nxVKoiKuo420lN1QAPZpfyw==\n-----END PRIVATE KEY-----\n";

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
