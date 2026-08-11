// ═══════════════════════════════════════════════════════════════
//  BRACKET HQ — Firebase Configuration
//
//  STEP-BY-STEP SETUP (takes ~5 minutes):
//
//  1. Go to https://console.firebase.google.com
//  2. Click "Add project" → name it "Bracket HQ" → Continue → Create project
//  3. On the project overview page, click the Web icon (</>)
//     → App nickname: "BracketHQ Web" → Register app
//  4. Copy the firebaseConfig object that appears and paste it below
//     (replacing the PASTE_HERE placeholders)
//
//  5. ENABLE EMAIL/PASSWORD AUTH:
//     → Left sidebar: Build → Authentication → Get started
//     → Sign-in method tab → Email/Password → Enable → Save
//
//  6. CREATE FIRESTORE DATABASE:
//     → Left sidebar: Build → Firestore Database → Create database
//     → Start in production mode → Next → pick any region → Enable
//
//  7. SET FIRESTORE SECURITY RULES:
//     → Firestore Database → Rules tab → replace everything with:
//
//  rules_version = '2';
//  service cloud.firestore {
//    match /databases/{database}/documents {
//      match /users/{uid} {
//        allow read, write: if request.auth != null && request.auth.uid == uid;
//      }
//      match /leagues/{leagueCode} {
//        allow read:   if request.auth != null;
//        allow create: if request.auth != null;
//        allow update: if request.auth != null && (
//                        resource.data.commissionerUid == request.auth.uid ||
//                        (resource.data.members is list &&
//                         resource.data.members.hasAny([request.auth.uid]))
//                      );
//        allow delete: if request.auth != null &&
//                        resource.data.commissionerUid == request.auth.uid;
//      }
//    }
//  }
//
//     → Click Publish
//
// ═══════════════════════════════════════════════════════════════

// ↓ PASTE YOUR CONFIG HERE (from Firebase Console → Project Settings → Your apps)
const firebaseConfig = {
  apiKey:            "PASTE_YOUR_API_KEY_HERE",
  authDomain:        "PASTE_YOUR_AUTH_DOMAIN_HERE",
  projectId:         "PASTE_YOUR_PROJECT_ID_HERE",
  storageBucket:     "PASTE_YOUR_STORAGE_BUCKET_HERE",
  messagingSenderId: "PASTE_YOUR_MESSAGING_SENDER_ID_HERE",
  appId:             "PASTE_YOUR_APP_ID_HERE"
};

// ── Initialize Firebase (do not edit below this line) ────────
try {
  firebase.initializeApp(firebaseConfig);
  window._auth = firebase.auth();
  window._db   = firebase.firestore();
  window._fbUser = null; // set by onAuthStateChanged in app.js
  console.log('[Firebase] Initialized successfully');
} catch (e) {
  console.warn('[Firebase] Init failed — app will run in offline/localStorage mode.', e.message);
  window._auth = null;
  window._db   = null;
  window._fbUser = null;
}
