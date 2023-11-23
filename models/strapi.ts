import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

export default class Strapi {
  #baseURL: string =
    process.env.STRAPI_BASEURL ?? "https://devstrapi.thedigitalacademy.co.za/";
  #subURL: string = process.env.STRAPI_SUBURL ?? "api/";
  endpoint: string = process.env.STRAPI_ENDPOINT ?? "micro-apps/";
  url: string;

  constructor() {
    this.url = this.#baseURL + this.#subURL + this.endpoint;
  }

  async getStrapiMicroApps(): Promise<Array<{ [key: string]: any }>> {
    try {
      let page = 1;
      let result = [];
      while (true) {
        const response: { [key: string]: any } = await axios.get(
          `${this.url}?[pagination][page]=${page}`
        );
        const microapps: { [key: string]: any } = response.data;
        result.push(microapps.data);
        if (page === microapps.meta.pagination.pageCount) {
          break;
        }
        page++;
      }
      return result.flat();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async updateStrapiMicroApps(
    devCmsApp: { [key: string]: any },
    strapiApps: Array<{ [key: string]: any }>
  ) {
    for (let strapiApp of strapiApps) {
      try {
        await axios.put(`${this.url}/${strapiApp.id}`, {
          data: { devcms_id: devCmsApp.id },
        });
        console.log(devCmsApp.id, strapiApp.id);
      } catch (e) {
        console.log(devCmsApp.id, strapiApp.id, "" + e);
      }
    }
    console.log("");
  }
}
