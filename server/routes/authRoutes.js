import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET;

const router = express.Router();

router.use(bodyParser.json());

//signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if required fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Hashing with salt rounds = 10

    // Insert the new user into the database with role as "customer"
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "customer", // Set the role automatically to "customer"
      },
    });

    // Create a corresponding row in the Customer table
    const newCustomer = await prisma.customer.create({
      data: {
        userId: newUser.id,
        // You can pass other fields related to the customer here
      },
    });

    // Generate JWT token
    const token = jwt.sign({ userId: newUser.id }, jwtSecret, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, customerId: newCustomer.id });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


//login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email },
      include: {
        customer: true,
      },
    });

    // If user doesn't exist, return error
    if (!user) {
      return res.status(401).json({ error: "User not found for email:" });
    }

    // Compare hashed password
    const passwordMatch = await bcrypt.compare(password, user.password);

    // If passwords don't match, return error
    if (!passwordMatch) {
      return res.status(401).json({ error: "Password does not match for email:" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user.id, role: user.role }, jwtSecret, {
      expiresIn: "1h",
    });

    return res.status(200).json({ token, customerId: user.customer ? user.customer.id : null });
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});


//logout route

router.post("/logout", (req, res) => {
  try {
    // Retrieve the token from the request headers
    const token = req.headers.authorization;

    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized: Token not provided" });
    }

    // Verify the token
    jwt.verify(token, jwtSecret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
      }

      // Token is valid, proceed with logout
      // You can optionally use the decoded information if needed
      // For example, const userId = decoded.userId;

      // Respond with a success message
      res.status(200).json({ message: "Logged out successfully" });
    });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
