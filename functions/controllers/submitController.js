const Secret = require('../model/Secret');
const User = require('../model/User');

// @desc  Get all submit
// @route   Get/submit
// @access  Private

const handleSubmit = async (req, res) => {
    const { user, secret } = req.body

    // Confirm data
    if(!user, !secret) {
        return res.status(400).json({ message: "Oops! You didn't shared a secret" })
    }
    // Create and store the new user
    const text = await Secret.create({ user, secret })
    if(text) {
        // Created
        return res.status(201).json({ message: 'Submitted Secret!' })
    } else {
        return res.status(400).json({ message: 'No Secrets Shared!' })
    }
}

module.exports = { handleSubmit }