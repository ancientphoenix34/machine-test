const MenuItem = require('../model/menuItemModel');
const Menu = require('../model/menuModel');
const HttpError = require('../model/errorModel');

const createMenuItem = async (req, res, next) => {
  try {
    const { name, description, price, menuId } = req.body;

    const menu = await Menu.findById(menuId);
    if (!menu) {
      return next(new HttpError('Menu not found', 404));
    }

    const newItem = new MenuItem({ name, description, price, menu: menuId });
    await newItem.save();

    menu.items.push(newItem._id);
    await menu.save();

    res.status(201).json(newItem);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const getAllMenuItems = async (req, res, next) => {
  try {
    const items = await MenuItem.find().sort({ updatedAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, price } = req.body;

    const updatedItem = await MenuItem.findByIdAndUpdate(
      id,
      { name, description, price },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return next(new HttpError('Menu item not found', 404));
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};


const deleteMenuItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    const item = await MenuItem.findById(id);
    if (!item) {
      return next(new HttpError('Menu item not found', 404));
    }

    await Menu.findByIdAndUpdate(item.menu, { $pull: { items: id } });

    await item.deleteOne();
    res.status(200).json({ message: 'Menu item deleted successfully' });
  } catch (error) {
    return next(new HttpError(error.message, 500));
  }
};


const getMenuItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await MenuItem.findById(id);
    if (!item) {
      return res.status(404).json({ message: "Menu item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createMenuItem,
  // getMenuItems,
  updateMenuItem,
  deleteMenuItem,
  getAllMenuItems,
  getMenuItemById
};
