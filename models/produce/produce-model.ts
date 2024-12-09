import { t } from "elysia";

export const TypeProductImageModel = t.Object({
  image_url: t.String(),
  alt_text: t.String(),
});

export const TypeProductInfoModel = t.Object({
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
  product_image: t.Array(TypeProductImageModel),
  forearm_length: t.String(),
  arm_circumference: t.String(),
});

export const TypeProductModel = t.Object({
  name: t.String(),
  category_id: t.Number(),
  product_info: TypeProductInfoModel,
  description: t.Optional(t.String()),
  base_price: t.Number(),
  status: t.Optional(t.String()),
  is_featured: t.Optional(t.Boolean()),
});
