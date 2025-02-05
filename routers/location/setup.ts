import Elysia, { t } from "elysia";

const Location = t.Object({
  user_id: t.String(),
  address_line1: t.String(),
  address_line2: t.Nullable(t.String()),
  district: t.String(),
  city: t.String(),
  postal_code: t.String(),
  latitude: t.Nullable(t.Number()),
  is_default: t.Optional(t.Boolean()),
  longitude: t.Nullable(t.Number()),
});

export const BodyReqLocation = new Elysia().model({
  "location.body": Location,
});

export const BodyReqUpdateLocation = new Elysia().model({
  "updateLocation.body": t.Object({
    location_id: t.Number(),
    location: Location,
  }),
});
