import type { Config } from "./src/Config.ts";

import { route } from "@std/http/unstable-route";
import { search } from "./src/Controller.ts";
import { existsSync } from "@std/fs";
import { parseArgs } from '@std/cli';


// 检查 & 读取 Config
let config: Config = {
    modules: {
        aipanso: {
            token: null
        },
        qianfanso: {
            token: null
        }
    }
}
if (existsSync('./config.json')) {
    config = JSON.parse(Deno.readTextFileSync('./config.json'));
} else {
    Deno.writeTextFileSync('./config.json', JSON.stringify(config, null, 4));
}


const args = parseArgs(Deno.args);
const port = args.port || args.p || 8081;

Deno.serve({ port }, route([{
    pattern: new URLPattern({ pathname: "/search" }),
    handler: req => search(req, config)
}], () => new Response("404 Not Found")));
