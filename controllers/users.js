const SingleUser = require('../models/User')

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUsers = async (req, res, next) => {
    try {
        const users = await SingleUser.find();

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users
        })
    } catch (err) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Get all users
// @route   GET /api/v1/users
// @access  Public
exports.getUser = async (req, res, next) => {
    try {
        const user = await SingleUser.findById(req.params.id);

        return res.status(200).json({
            success: true,
            data: user
        })
    } catch (err) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Update a user
// @route   PUT /api/v1/users
// @access  Public
exports.putUser = async (req, res, next) => {
    const id = req.params.id

    try {
        const user = await SingleUser.findByIdAndUpdate(id, req.body);

        return res.status(200).json({
            success: true,
            data: req.body
        })
    } catch (err) {
        return res.sendStatus(500).json({
            success: false,
            error: 'Server Error'
        })
    }
}

// @desc    Add users
// @route   POST /api/v1/users
// @access  Public
exports.addUser = async (req, res, next) => {
    try {
        const { name } = req.body;

        const user = await SingleUser.create(req.body);
        return res.status(201).json({
            success: true,
            data: user
        })
    } catch (error) {
        if(error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            res.send(400).json({
                success: false,
                error: messages
            })
        } else {
            return res.send(500).json({
                success: false,
                error: 'Server Error'
            })
        }
    }
}


// @desc    Delete user
// @route   DELETE /api/v1/users/:id
// @access  Public
exports.deleteUsers = async (req, res, next) => {
    try {
        await SingleUser.findByIdAndDelete(req.params.id)
        res.status(200).json({
            message: 'The task was deleted successfully from the database'
          });
          
    } catch (error) {
        return next(error)
    }

}