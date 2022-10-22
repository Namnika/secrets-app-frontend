const Secret = require("../model/Secret");

// @desc  Get all secrets
// @route   Get/secrets
// @access  Private

const handleSecret = async (req, res) => {
  // Get all secrets from MongoDB
  const secrets = await Secret.find().lean();

  // If no secrets
  if (!secrets?.length) {
    return res.status(400).send("Oops! You didn't shared any secrets 😥");
  }
  const secretsWithUser = await Promise.all(
    secrets.map(async (secret) => {
      return { ...secret };
    })
  );

  res.json(secretsWithUser);
};

module.exports = { handleSecret };
