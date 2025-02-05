const { Router } = require("express");
const router = Router();

const { 
  createMenuItem, 
  // getMenuItems, 
  updateMenuItem, 
  deleteMenuItem,
  getAllMenuItems,
  getMenuItemById
} = require("../Controller/menuItemController");

router.post('/createMenuItem', createMenuItem);
// router.get('/getMenuItems/:menuId', getMenuItems);
router.get('/getMenuItems', getAllMenuItems); 
router.put('/updateMenuItem/:id', updateMenuItem);
router.delete('/deleteMenuItem/:id', deleteMenuItem);
router.get('/getMenuItemById/:id', getMenuItemById);

module.exports = router;

