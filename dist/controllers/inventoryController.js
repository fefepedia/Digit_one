"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addInventoryItem = exports.addInventory = void 0;
const Inventory_1 = __importDefault(require("../models/Inventory"));
const InventoryItem_1 = __importDefault(require("../models/InventoryItem"));
// Add new Inventory
const addInventory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newInventory = new Inventory_1.default(req.body);
    const result = yield newInventory.save();
    res.json(result);
});
exports.addInventory = addInventory;
// Add Inventory Item
const addInventoryItem = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newInventoryItem = new InventoryItem_1.default(req.body);
    const result = yield newInventoryItem.save();
    res.json(result);
});
exports.addInventoryItem = addInventoryItem;
