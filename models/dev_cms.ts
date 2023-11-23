import dotenv from "dotenv";
import axios from "axios";
import { cmsUpdateTemplate } from "../data/templates";
import { credentials } from "../data/keys";
import { categorySorter } from "../services/helpers";

dotenv.config();

export default class DevCMS {
  #baseURL: string = process.env.DEVCMS_BASEURL ?? "http://devcms.ayoba.me/";
  #subURL: string = process.env.DEVCMS_SUBURL ?? "jsonapi/15c1ad2ea0d3/node/";
  #endpoint: string = process.env.DEVCMS_ENDPOINT ?? "microapp/";
  #tokenEndpoint: string = "session/token";
  url: string;

  constructor() {
    this.url = this.#baseURL + this.#subURL + this.#endpoint;
  }

  async getToken() {
    const response = await axios.get(`${this.#baseURL}${this.#tokenEndpoint}`);
    return response.data;
  }
  async getCMSMicroApps(): Promise<Array<{ [key: string]: any }>> {
    try {
      let result = [];
      let devcmsurl = this.url;
      while (true) {
        const response: { [key: string]: any } = await axios.get(devcmsurl);
        const microapps: { [key: string]: any } = response.data;
        result.push(microapps.data);
        if (!microapps.links?.next) {
          break;
        }
        devcmsurl = microapps.links.next.href;
      }
      return result.flat();
    } catch (error) {
      console.log(error);
      return [];
    }
  }

  async getCMSMicroApp(id: string): Promise<{ [key: string]: any }> {
    try {
      const response: { [key: string]: any } = await axios.get(
        `${this.url}/${id}`
      );
      const microapps: { [key: string]: any } = response.data;
      return microapps.data;
    } catch (error) {
      console.log(error);
      return {};
    }
  }

  async updateGame(
    id: string,
    games: Array<{ type: string; id: string }>
  ): Promise<{ [key: string]: any }> {
    try {
      const token = await this.getToken();
      cmsUpdateTemplate.data.id = id;
      games.sort(
        (a: { type: string; id: string }, b: { type: string; id: string }) =>
          categorySorter(a, b)
      );
      cmsUpdateTemplate.data.relationships.field_category.data = games;
      const response = await axios.patch(
        `${this.url}/${id}`,
        cmsUpdateTemplate,
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": token,
          },
          auth: credentials,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error: " + id);
      return {};
    }
  }

  async updateMicroApp(
    id: string,
    categories: Array<{ type: string; id: string }>
  ): Promise<{ [key: string]: any }> {
    try {
      const token = await this.getToken();
      cmsUpdateTemplate.data.id = id;
      cmsUpdateTemplate.data.relationships.field_category.data = [
        ...cmsUpdateTemplate.data.relationships.field_category.data,
        ...categories,
      ];
      const response = await axios.patch(
        `${this.url}/${id}`,
        cmsUpdateTemplate,
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": token,
          },
          auth: credentials,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error: " + id);
      return {};
    }
  }

  async updateCategory(
    id: string,
    categories: Array<{ type: string; id: string }>
  ): Promise<{ [key: string]: any }> {
    try {
      const token = await this.getToken();
      cmsUpdateTemplate.data.id = id;
      cmsUpdateTemplate.data.relationships.field_category.data = categories;
      const response = await axios.patch(
        `${this.url}/${id}`,
        cmsUpdateTemplate,
        {
          headers: {
            Accept: "application/vnd.api+json",
            "Content-Type": "application/vnd.api+json",
            "X-CSRF-Token": token,
          },
          auth: credentials,
        }
      );
      return response.data;
    } catch (error) {
      console.log("Error: " + error);
      console.log(categories)
      return {};
    }
  }
}
