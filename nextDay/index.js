import { mkdir, readdir, readFile, writeFile }       from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path              from "node:path";

import fastGlob from "fast-glob";

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const files = await fastGlob([ "./template/**/*.*" ], { cwd: __dirname });

const days = await readdir(path.join(__dirname, "../days"));

const nextDay = (days.length + 1).toString().padStart(2, "0");


await mkdir(path.join(__dirname, "../test", nextDay), { recursive: true });

for (let idx = 0; idx < files.length; idx++) {
    const file = files[idx];

    const { base, dir } = path.parse(file);
    const newName = base.replace("{day}", nextDay);

    const contents = await readFile(path.join(__dirname, file), "utf8");
    const newContents = contents.replaceAll("{day}", nextDay);

    if(dir.includes("test")) {
        await writeFile(path.join(__dirname, "../test", nextDay, newName), newContents);
    } else {
        await writeFile(path.join(__dirname, "../days", newName), newContents);
    }


}
