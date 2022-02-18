// import mongoose from "mongoose";
import User from "../models/users.js";

export const getUsers = async (req, res) => {
    const { name } = req.query
    if (name) {
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
    console.log('Post user body: ', body);
    if (body.length) {
        try {
            const userObjects = body.map(user => new User(user))
            console.log('userObjects: ', userObjects);
            console.log('names: ', userObjects.map(user => user.username));
            // create list of promises from userObjects
            let promises = userObjects.map(user => {
                return new Promise(((resolve, reject) => {
                    User.findOneAndUpdate(
                        { // Query documents
                            $or:
                                [
                                    { username: user.username },
                                    { email: user.email }
                                ]
                        },
                        { // update documents
                            $set: {
                                username: user.username,
                                email: user.email,
                                birthdate: user.birthdate,
                            }
                        },
                        { upsert: false, returnNewDocument: true },
                        (error, result) => {
                            if (error) {
                                reject(error.message)
                            }
                            else {
                                if (result)
                                    resolve(result)
                                else {
                                    resolve({message: "User not found", status: 404, user: user})
                                }
                            }
                        }
                    )
                }))
            });
            // resolve all promises
            Promise.all(promises).then(values => {
                console.log('Update users success: ', values);
                res.status(200).json(values);
            })
        }
        catch (error) {
            console.log(error.message)
        }
    }
    else {
        // const user = new User(body);
        // console.log('Post user: ', user);
        // try {
        //     await user.save();
        //     console.log("Create User success: ", user);

        //     res.status(201).json(user);
        // }
        // catch (error) {
        //     res.status(409).json({ message: error.message });
        // }
        res.status(400).json({ message: "Invalid body" });
    }
}