"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/digit_one', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
app.use('/api', inventoryRoutes_1.default);
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
