type IncomingInventoryData = {
  name: string;
  quantityType: string;
  items?: Array<any>;
};

export const inventorySanitizer = (data: IncomingInventoryData) => {
  return {
    name: data.name,
    quantityType: data.quantityType,
    items: data.items
  };
};
