import {categoryCheckUpdate, gamesUpdate, microappUpdate} from "./services/categoryUpdater";
import reconciler from "./services/idReconciler";

async function main() {
  // await reconciler()  
  // await microappUpdate()
  // await gamesUpdate()
  await categoryCheckUpdate()
}

main();
