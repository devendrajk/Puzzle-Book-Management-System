let conn = null;

/**
 * Save authenticated Salesforce connection
 */
function setConnection(connection) {
  conn = connection;
}

/**
 * Get authenticated Salesforce connection
 */
function getConnection() {
  if (!conn) {
    throw new Error(
      "Salesforce is not authenticated. Visit http://localhost:5000/login first."
    );
  }

  return conn;
}

/**
 * Check login status
 */
function isAuthenticated() {
  return conn !== null;
}

/**
 * Clear current connection
 */
function clearConnection() {
  conn = null;
}

module.exports = {
  setConnection,
  getConnection,
  isAuthenticated,
  clearConnection,
};