#!/usr/bin/env node
// generate-vapid.js — Generate a VAPID keypair for Web Push.
// Uses Node's built-in crypto (no npm deps, no web-push lib required).
//
// Run: node scripts/generate-vapid.js
//
// Output:
//   VAPID_PUBLIC_KEY  = ...  (paste into trading-diary.jsx as VAPID_PUBLIC_KEY)
//   VAPID_PRIVATE_KEY = ...  (paste into Supabase Edge Function secret VAPID_PRIVATE_KEY)
//
// VAPID keys are a prime256v1 EC keypair exported as uncompressed raw bytes,
// then base64url encoded. This matches the format expected by the web-push
// protocol (RFC 8292) and by browser pushManager.subscribe({applicationServerKey}).

var crypto = require('crypto');

function base64url(buf) {
  return buf.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function keyPairToRaw() {
  var { publicKey, privateKey } = crypto.generateKeyPairSync('ec', { namedCurve: 'prime256v1' });

  // Public key: SPKI DER → extract raw 65-byte uncompressed point (0x04 || X || Y)
  var pubDer = publicKey.export({ type: 'spki', format: 'der' });
  // The last 65 bytes of the SPKI DER are the raw uncompressed point for P-256
  var pubRaw = pubDer.subarray(pubDer.length - 65);

  // Private key: PKCS8 DER → extract raw 32-byte scalar
  // Parse the DER structure: find OCTET STRING containing the 32-byte key
  var privDer = privateKey.export({ type: 'pkcs8', format: 'der' });
  // The private key scalar is embedded; easiest: export as JWK and decode 'd'
  var jwk = privateKey.export({ format: 'jwk' });
  var privRaw = Buffer.from(jwk.d, 'base64');

  return {
    publicKey: base64url(pubRaw),
    privateKey: base64url(privRaw)
  };
}

var keys = keyPairToRaw();

console.log('');
console.log('=== VAPID Keys Generated ===');
console.log('');
console.log('VAPID_PUBLIC_KEY  = ' + keys.publicKey);
console.log('VAPID_PRIVATE_KEY = ' + keys.privateKey);
console.log('');
console.log('Next steps:');
console.log('  1. Paste VAPID_PUBLIC_KEY into trading-diary.jsx (search for VAPID_PUBLIC_KEY constant).');
console.log('  2. Store VAPID_PRIVATE_KEY in Supabase Edge Function secrets:');
console.log('       supabase secrets set VAPID_PRIVATE_KEY=' + keys.privateKey);
console.log('  3. Also set VAPID_PUBLIC_KEY and VAPID_SUBJECT (mailto: or https://...):');
console.log('       supabase secrets set VAPID_PUBLIC_KEY=' + keys.publicKey);
console.log('       supabase secrets set VAPID_SUBJECT=mailto:you@example.com');
console.log('');
console.log('IMPORTANT: never commit VAPID_PRIVATE_KEY to git.');
console.log('');
