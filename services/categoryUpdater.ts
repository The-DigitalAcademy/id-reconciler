import DevCMS from "../models/dev_cms";

export async function microappUpdate() {
  const devCMS: DevCMS = new DevCMS();

  const response: Array<{ [key: string]: any }> =
    await devCMS.getCMSMicroApps();
  for (let microapp of response) {
    const categories: Array<{ type: string; id: string }> =
      microapp.relationships.field_category.data;

    const exMicroAppsCategories: Array<{ type: string; id: string }> =
      categories.filter(
        (category) =>
          category.id === "7f26b86b-6c0d-463b-aaee-b343406c90f6" ||
          category.id === "6a21761b-76ff-4923-915b-079f85d150aa"
      );

    if (!exMicroAppsCategories.length) {
      console.log("Updating ID: " + microapp.id);
      devCMS.updateMicroApp(microapp.id, categories);
    }
  }
}

export async function gamesUpdate() {
  const devCMS: DevCMS = new DevCMS();

  const response: Array<{ [key: string]: any }> =
    await devCMS.getCMSMicroApps();
  // const response: { [key: string]: any } = await devCMS.getCMSMicroApp(
  //   "005926d7-917f-458b-82c4-57aae3cdbf72"
  // );

  for (let microapp of response) {
    const games: Array<{ type: string; id: string }> =
      microapp.relationships.field_category.data;

    const exMicroAppsCategories: Array<{ type: string; id: string }> =
      games.filter(
        (game) =>
          game.id === "6a21761b-76ff-4923-915b-079f85d150aa" &&
          games[0].id !== "7f26b86b-6c0d-463b-aaee-b343406c90f6" &&
          games[0].id !== "6a21761b-76ff-4923-915b-079f85d150aa"
      );

    if (exMicroAppsCategories.length) {
      console.log("Updating ID: " + microapp.id);
      devCMS.updateGame(microapp.id, games);
    }
  }
}

export async function categoryCheckUpdate() {
  const devCMS: DevCMS = new DevCMS();

  const response: Array<{ [key: string]: any }> =
    await devCMS.getCMSMicroApps();
  // const response: { [key: string]: any } = await devCMS.getCMSMicroApp(
  //   "005926d7-917f-458b-82c4-57aae3cdbf72"
  // );

  for (let microapp of response) {
    const categories: Array<{ type: string; id: string }> =
      microapp.relationships.field_category.data;
    const categoriesArray: Array<string> =
      microapp.relationships.field_category.data.map(
        (category: { type: string; id: string }) => category.id
      );
    const categoriesSet: Array<string> = Array.from(
      new Set(categoriesArray)
    );
    if (categoriesArray.length !== categoriesSet.length) {
      console.log("Updating ID: " + microapp.id);
      devCMS.updateCategory(
        microapp.id,
        categoriesSet.map((category: string) => ({
          type: "taxonomy_term--category",
          id: category,
        }))
      );
    }
  }
}
