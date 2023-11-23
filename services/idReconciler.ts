import DevCMS from "../models/dev_cms";
import Strapi from "../models/strapi";

export default async function reconciler() {
  const devcms: DevCMS = new DevCMS();
  const strapi: Strapi = new Strapi();
  const devCMSMicroApps: Array<{ [key: string]: any }> =
    await devcms.getCMSMicroApps();

  for (let devcmsapp of devCMSMicroApps) {
    const strapiMicroApps: Array<{ [key: string]: any }> =
      await strapi.getStrapiMicroApps();

    let matchedApps = strapiMicroApps.filter(
      (app) =>
        // devcmsapp.attributes.field_developer?.toLowerCase() ===
        //   app.attributes.developer?.toLowerCase() &&
        app.attributes.title?.toLowerCase() ===
          devcmsapp.attributes.title?.toLowerCase() && !app.attributes.devcms_id
    );
    if (matchedApps.length) {
      await strapi.updateStrapiMicroApps(devcmsapp, matchedApps);
    }
  }
}
