import "./style.css";
import typescriptLogo from "./typescript.svg";
import viteLogo from "/vite.svg";
import { setupCounter } from "./counter.ts";
import "./indexDB";

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>Vite + TypeScript</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite and TypeScript logos to learn more
    </p>
    <div class="card">
      <button id="add-brand" type="button">Add brand</button>
    </div>
    <div class="card">
      <button id="get-brand" type="button">Get brand</button>
    </div>
  </div>
`;

setupCounter(document.querySelector<HTMLButtonElement>("#counter")!);

document
  .querySelector("#add-brand")
  ?.addEventListener(
    "click",
    async () => await window.brand.seedingDataBrand(20)
  );

document.querySelector("#get-brand")?.addEventListener("click", async () => {
  const brand = await window.brand.get<brand>(406);
  console.table(brand);
  console.log(await window.brand.getAll<brand>(IDBKeyRange.bound(400, 410)));
  console.log(
    await window.brand.getAll<brand>(IDBKeyRange.upperBound(405, true))
  );
  console.log(
    await window.brand.getAll<brand>(IDBKeyRange.lowerBound(405, true))
  );
  console.log(
    await window.brand.getAllKeys<brand>(IDBKeyRange.upperBound(405, true))
  );
  console.log(await window.brand.count(IDBKeyRange.upperBound(405, true)));
});
