import User from "../models/users.js";

export const getUsers = async (req, res) => {
    const { name, username, email } = req.query
    console.log(`name: ${name}, username: ${username}, email: ${email}`)
    if (name || username || email) {
        try {
            const selectUser = {
                $or:
                    [
                        {
                            username: {
                                $regex: `.*${name}.*`,
                                $options: 'i'
                            }
                        },
                        {
                            email: {
                                $regex: `.*${name}.*`,
                                $options: 'i'
                            }
                        }
                    ]
            }
            const queryResponse = await User.find(selectUser).select('-__v')
            console.log("Get Query success: ", queryResponse);
            res.status(200).json(queryResponse);
        } catch (error) {
            console.log(error.message)
        }
    }
    else {
        try {
            const users = await User.find().select('-__v');
            console.log("Get Users success: ", users);

            res.status(200).json(users);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
}

export const postUser = async (req, res) => {
    const body = req.body;
    const user = new User(body);
    console.log('Post user body: ', body);
    console.log('Post user: ', user);
    try {
        await user.save();
        console.log("Create User success: ", user);

        res.status(201).json(user);
    }
    catch (error) {
        res.status(409).json({ message: error.message });
    }
}