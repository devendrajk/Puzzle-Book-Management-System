const crypto = require("crypto");

function base64URLEncode(buffer) {
  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "");
}

async function generatePKCE() {
  const code_verifier = base64URLEncode(crypto.randomBytes(64));

  const code_challenge = base64URLEncode(
    crypto.createHash("sha256").update(code_verifier).digest()
  );

  const state = base64URLEncode(crypto.randomBytes(32));

  return {
    code_verifier,
    code_challenge,
    state,
  };
}

module.exports = {
  generatePKCE,
};