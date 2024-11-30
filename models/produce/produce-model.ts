import { t } from "elysia";

export const TypeProductModel = t.Object({
    name: t.String(),
    description: t.Optional(t.String()),
    base_price: t.Number(),
    status: t.Optional(t.String()),
    is_featured: t.Optional(t.Boolean()),
});

export const TypeProductImageModel = t.Object({
    image_id: t.Number(),
    variant_id: t.Number(),
    image_url: t.String(),
    alt_text: t.String(),
})

export const TypeProductInfoModel = t.Object({
    variant_id: t.Number(),
    product_id: t.Number(),
    fabric_id: t.Number(),
    color: t.String(),
    brand: t.String(),
    price: t.Number(),
    discounted_price: t.Number(),
    weight_item: t.Number(),
    chest: t.String(),
    shoulder_width: t.String(),
    neck_width: t.String(),
    sleeve_length: t.String(),
    forearm_length: t.String(),
    arm_circumference: t.String(),
})