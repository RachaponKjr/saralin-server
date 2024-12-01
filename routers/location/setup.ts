import Elysia, { t } from "elysia";

const Location = t.Object({
  user_id: t.String(),
  address_line1: t.String(),
  address_line2: t.Optional(t.String()),
  district: t.String(),
  city: t.String(),
  postal_code:  t.Optional(t.String()),
  latitude: t.Optional(t.Number()),
  longitude: t.Optional(t.Number()),
});

export const BodyReqLocation = new Elysia().model({
  "location.body": t.Object({
    user_id: t.String(),
    location: Location,
  }),
});

export const BodyReqUpdateLocation = new Elysia().model({
  "updateLocation.body": t.Object({
    location_id: t.Number(),
    location: Location,
  }),
});
