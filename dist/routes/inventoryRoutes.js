"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InventoryController_1 = require("../controllers/InventoryController");
const router = express_1.default.Router();
router.post('/add-inventory', InventoryController_1.addInventory);
router.post('/add-inventory-item', InventoryController_1.addInventoryItem);
exports.default = router;
