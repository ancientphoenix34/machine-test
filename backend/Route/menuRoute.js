const {Router}=require("express")

const router=Router();

const {createMenu,getMenus,getMenuById,updateMenu,deleteMenu}=require("../Controller/menuController")



router.post('/createMenu',createMenu)
router.get('/getMenus',getMenus)
router.get('/getMenuById/:id',getMenuById)
router.put('/updateMenu/:id',updateMenu)
router.delete('/deleteMenu/:id',deleteMenu)




module.exports=router