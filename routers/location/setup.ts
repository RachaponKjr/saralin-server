import Elysia, { t } from "elysia";

const Location = t.Object({
  address: t.String(),
  subdistrict: t.String(),
  district: t.String(),
  state: t.String(),
  postal_code: t.String(),
  country: t.String(),
  lat: t.Number(),
  lng: t.Number(),
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
