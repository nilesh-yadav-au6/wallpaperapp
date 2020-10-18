const User = require("../models/Users");
const Images = require("../models/Images");
const Favrouites = require("../models/Favrouties");

module.exports = {
  async registerUser(req, res) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    try {
      const user = await User.findOne({ email });
      if (user) throw Error("User already exists");

      const newUser = await User.create({ name, email, password });
      const token = await newUser.generateToken();

      res.status(200).json({
        token,
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  async loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ msg: "Please enter all fields" });
    }

    try {
      const user = await User.findByEmailAndPassword(email, password);
      const token = await user.generateToken();
      res.status(200).json({
        token,
        user,
      });
    } catch (e) {
      res.status(400).json({ msg: e.message });
    }
  },

  async getImages(req, res) {
    try {
      const { pageNumber } = req.params;
      const images = await Images.find({})
        .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
        .limit(10);
      res.status(200).json({ images });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async addToFavourite(req, res) {
    try {
      const { id } = req.user;
      const { imageId } = req.params;
      const image = await Images.findOne({ _id: imageId });
      const { author, width, height, url, download_url, _id } = image;
      const fav = await Favrouites.findOne({ userId: id, imageId: _id });
      if (fav) return res.status(400).json({ msg: "already added in fav" });
      await Favrouites.create({
        author,
        width,
        height,
        url,
        download_url,
        userId: id,
        imageId: _id,
      });
      res.status(200).json({ msg: "added success" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async removeFavourite(req, res) {
    try {
      const { id } = req.user;
      const { imageId } = req.params;
      await Favrouites.deleteOne({ _id: imageId, userId: id });
      res.status(200).json({ msg: "removed" });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },

  async getFavourite(req, res) {
    try {
      const { id } = req.user;
      const { pageNumber } = req.params;
      const favourite = await Favrouites.find({ userId: id })
        .skip(pageNumber > 0 ? (pageNumber - 1) * 10 : 0)
        .limit(10);
      res.status(200).json({ favourite });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
  async getUser(req, res) {
    try {
      const { id } = req.user;
      const user = await User.findById({ _id: id });
      res.status(200).json({ user });
    } catch (e) {
      res.status(400).json({ error: e.message });
    }
  },
};
