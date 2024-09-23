const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");

const { uploadFile, deleteFile } = require("./aws");
const app = express();
const upload = multer();

("use strict");
let crypto = require("crypto");

app.use(cors());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://anyagchan:anya@myinstaller.mwqquze.mongodb.net/MyInstaller?retryWrites=true&w=majority"
  )
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

const imageSchema = new mongoose.Schema({
  image_url: { type: String, required: true },
});

const storeSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  address: { type: String, required: true, unique: false },
  date: { type: Date, required: true, unique: false },
  images: [imageSchema],
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: Object, required: true, unique: false },
  date: { type: Date, required: true, unique: false },
  image: imageSchema,
});

const Store = mongoose.model("store", storeSchema);
const User = mongoose.model("user", userSchema);

const port = 4000;
const host = "0.0.0.0";

app.listen(port, host, () => {
  console.log("Server started on port 4000");
});

//HASHING
let generateSalt = (rounds) => {
  if (rounds >= 15) {
    throw new Error(`${rounds} is greater than 15,Must be less that 15`);
  }
  if (typeof rounds !== "number") {
    throw new Error("rounds param must be a number");
  }
  if (rounds == null) {
    rounds = 12;
  }
  return crypto
    .randomBytes(Math.ceil(rounds / 2))
    .toString("hex")
    .slice(0, rounds);
};

let salt = generateSalt(7);

let hash = (password, salt) => {
  if (password == null || salt == null) {
    throw new Error("Must Provide Password and salt values");
  }
  if (typeof password !== "string" || typeof salt !== "string") {
    throw new Error(
      "password must be a string and salt must either be a salt string or a number of rounds"
    );
  }
  let hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  let value = hash.digest("hex");
  return {
    salt: salt,
    hashedPassword: value,
  };
};

let checkPassword = (password, actual) => {
  let passwordData = hash(password, actual.salt);
  if (passwordData.hashedPassword === actual.hashedPassword) {
    return true;
  }
  return false;
};

// ADD NEW STORE
app.post("/stores", async (req, res, next) => {
  const { name, address } = req.body;
  try {
    const store = new Store({
      name,
      address,
      date: new Date(),
    });

    const resp = await store.save();
    console.log({ resp });
    return res.status(200).json({
      success: true,
      message: "Store created successfully.",
      storeName: store.name,
      storeId: store._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// ADD IMAGE TO STORE
app.put("/stores/:id/image", upload.single("image"), async (req, res, next) => {
  const { file } = req;
  const id = req.params["id"];
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file provided." });
  }
  try {
    const store = await Store.findById(id);
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found." });
    }
    const image_url = await uploadFile({ file });
    console.log("Image was uploaded as", image_url);
    store.images.push({ image_url });
    store.date = new Date();
    const resp = await store.save();
    console.log({ resp });
    return res.status(200).json({
      success: true,
      message: "Images uploaded successfully.",
      images: store.images,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// GET STORE WITH ID
app.get("/stores/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const store = await Store.findById(id);
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Store found.",
      store: store,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// GET ALL STORES
app.get("/stores", async (req, res) => {
  try {
    const stores = await Store.find({});
    return res.status(200).json({
      success: true,
      message: "Stores found.",
      stores: stores,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE STORE WITH ID
app.delete("/stores/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const store = await Store.findByIdAndDelete(id);
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Store successfully deleted.",
      store: store,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE IMAGE FROM STORE
app.delete("/stores/:id/image", async (req, res) => {
  const id = req.params["id"];
  const { image_url } = req.body;
  try {
    //find store
    const store = await Store.findById(id);
    if (!store) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found." });
    }

    //find index of image in store.images and delete
    const index = store.images.findIndex(
      (image) => image.image_url == image_url
    );
    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Image not found." });
    }
    store.images.splice(index, 1);
    const resp = await store.save();
    console.log(resp);

    //delete file from s3 using url
    const image_short_url = image_url.split("/").pop();

    const image_name = await deleteFile(image_short_url);
    console.log(image_name, "was deleted from bucket");

    return res.status(200).json({
      success: true,
      message: "Image successfully deleted.",
      store: store,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// ADD NEW USER
app.post("/users", async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = new User({
      username,
      password: await hash(password, salt),
      date: new Date(),
    });

    const resp = await user.save();
    console.log({ resp });
    return res.status(200).json({
      success: true,
      message: "User created successfully.",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// ADD IMAGE TO USER
app.put("/users/:id/image", upload.single("image"), async (req, res, next) => {
  const { file } = req;
  const id = req.params["id"];
  if (!file) {
    return res
      .status(400)
      .json({ success: false, message: "No file provided." });
  }
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    const image_url = await uploadFile({ file });
    console.log("Image was uploaded as", image_url);

    user.image = { image_url };
    const resp = await user.save();
    console.log({ resp });
    return res.status(200).json({
      success: true,
      message: "Image uploaded successfully.",
      image: user.image,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// VALIDATE USER LOGIN
app.post("/users/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username: username });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    let check = checkPassword(password, user.password);
    if (!check) {
      return res.status(404).json({
        success: false,
        message: "Invalid username or password.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// GET USER WITH ID
app.get("/users/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const user = await User.findById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({
      success: true,
      message: "User found.",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE USER WITH ID
app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({
      success: true,
      message: "User successfully deleted.",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});

// DELETE USER WITH ID
app.delete("/users/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }
    return res.status(200).json({
      success: true,
      message: "User successfully deleted.",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ success: false, message: error.message });
  }
});
