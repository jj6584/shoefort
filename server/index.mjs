import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import customerRoutes from "./routes/customerRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import checkoutRoutes from "./routes/checkoutRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js";
import servicesRoutes from "./routes/servicesRoutes.js";

const PORT = 4001;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/products", productRoutes);
app.use("/customers", customerRoutes);
app.use("/checkout", checkoutRoutes);
app.use("/transactions", transactionRoutes);
app.use("/services", servicesRoutes);

app.listen(PORT, () => {
  console.log(`Listening to Port ${PORT}`);
});
