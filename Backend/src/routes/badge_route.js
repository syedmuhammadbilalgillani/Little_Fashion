import { Router } from "express";

import { createBadge, deleteBadgeById, getBadges } from "../controllers/Badge_controller.js";

const router = new Router();

router.post('/createBadge', createBadge);
router.get('/readBadge', getBadges);   // Get all categories
router.delete('/deleteBadge/:id', deleteBadgeById);


export default router;
