import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient();

export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body; 
        const hashedPassword = bcrypt.hashSync(password, 10)
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });
        return res.status(201).json({ success: true, message: "User registered successfully", newUser });
    } catch (e) {
        console.error("Error registering user", e);
        return res.status(500).json({ success: false, message: e.message });
    }
};


export const useLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid email or passwor" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ success: false, message: "Invalid email or password" });
        }
        const payload = {
            id: user.id,
            email: user.email,
        };
        const token = jwt.sign(payload, process.env.JWT_SECRET,{expiresIn: '45min'});
        res.cookie("access_token", token, {httpOnly: true})
        res.status(200).json({ success: true, message: "User logged in successfully",
        user });
        } catch (e) {
            console.error("Error logging in user:", e);
            res.status(500).json({ success: false, message: e.message });
            }
};

