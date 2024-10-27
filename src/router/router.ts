import { Router } from "express";

const router = Router();

router.get("/:name", (req,res) => {
    res.send(`Ola, ${req.params.name}`)
})

export default router