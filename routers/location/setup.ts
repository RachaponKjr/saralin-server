import Elysia, { t } from "elysia";

const Location = t.Object({
  user_id: t.String(),
  address_line1: t.String(),
  address_line2: t.String(),
  district: t.String(),
  city: t.String(),
  postal_code: t.String(),
  latitude: t.Number(),
  is_default: t.Boolean(),
  longitude: t.Number(),
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
