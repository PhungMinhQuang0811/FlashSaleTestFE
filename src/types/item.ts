export const EItemType = {
    ELECTRONICS: 'ELECTRONICS',
    FASHION: 'FASHION',
    FOOD: 'FOOD',
    COSMETICS: 'COSMETICS',
    OTHER: 'OTHER'
} as const;

export type EItemType = typeof EItemType[keyof typeof EItemType];

export const EItemStatus = {
    ACTIVE: 'ACTIVE',
    INACTIVE: 'INACTIVE',
    OUT_OF_STOCK: 'OUT_OF_STOCK',
    DELETED: 'DELETED'
} as const;

export type EItemStatus = typeof EItemStatus[keyof typeof EItemStatus];

// --- REQUESTS 
export interface ItemRequest {
    name: string;
    description: string;
    originalPrice: number;
    quantity: number;
    itemType: EItemType;
    image?: File; 
}

// --- RESPONSES  ---
export interface ItemResponse {
    id: string;
    name: string;
    description: string;
    originalPrice: number;
    imageUrl: string;
    quantity: number;
    itemType: EItemType;
    itemStatus: EItemStatus;
    sellerEmail: string;
    createdAt: string;
    updatedAt: string;
}