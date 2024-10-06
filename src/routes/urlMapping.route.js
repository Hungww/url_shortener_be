import { Router } from "express";
const router = Router()
router.get('/', (req, res) => {
    res.send('Test url route');
});

export default router