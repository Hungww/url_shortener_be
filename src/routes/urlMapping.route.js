import { Router } from "express";
import { UrlMappingController } from "../controllers/urlMapping.controller.js";

const router = Router()
router.get('/', (req, res) => {
    res.send('URL Mapping route');
});
router.post('/createUrl',async (req, res) => {
    try {
        console.log(req.body);
       
        let result = await UrlMappingController.createUrl(req.body);
        res.status(201).json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
   
});

router.get('/getUrl', (req, res) => {
   let result = UrlMappingController.getUrl(req,res);
});

export default router