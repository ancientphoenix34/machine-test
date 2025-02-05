const Menu = require('../model/menuModel');
const MenuItem = require('../model/menuItemModel');
const HttpError = require("../model/errorModel"); 

const createMenu = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const newMenu = new Menu({ name, description });
    await newMenu.save();

    res.status(201).json(newMenu);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getMenus = async (req, res, next) => {
  try {
    const menus = await Menu.find().populate('items').sort({ updatedAt: -1 });
    res.status(200).json(menus);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getMenuById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const menu = await Menu.findById(id).populate('items');

    if (!menu) {
      return next(new HttpError('Menu not found', 404));
    }

    res.status(200).json(menu);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateMenu = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;

    const updatedMenu = await Menu.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedMenu) {
      return next(new HttpError('Menu not found', 404));
    }

    res.status(200).json(updatedMenu);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const deleteMenu = async (req, res, next) => {
  try {
    const { id } = req.params;

    const menu = await Menu.findById(id);
    if (!menu) {
      return next(new HttpError('Menu not found', 404));
    }

    await MenuItem.deleteMany({ menu: id });
    await menu.deleteOne();

    res.status(200).json({ message: 'Menu and associated items deleted successfully' });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

module.exports = {
  createMenu,
  getMenus,
  getMenuById,
  updateMenu,
  deleteMenu,
};