import { r, ResponseCode } from './BaseUtil.ts';
import { Config } from "./Config.ts";
import Aliso from './modules/Aliso.ts';
import ED3000 from "./modules/ED3000.ts";
import Kapa from './modules/Kapa.ts';
import Panso from "./modules/Panso.ts";
import Pikaso from "./modules/Pikaso.ts";
import { Qianfanso } from "./modules/Qianfanso.ts";
import { SearchModule, SearchResult } from "./modules/SearchModule.ts";
import Xiaoyunso from "./modules/Xiaoyunso.ts";


async function search(request: Request, config: Config): Promise<Response> {
    const url = new URL(request.url);

    const keyword = url.searchParams.get('keyword');
    if (!keyword) return r(400);

    const page: number | undefined = url.searchParams.get('page') !== null ? Number(url.searchParams.get('page')) : void 0;

    const standardModules: SearchModule[] = [
        new Kapa(),
        new Aliso(),
        new Panso(),
        new Xiaoyunso(),
        new Pikaso(),
        new ED3000()
    ];

    let ret: SearchResult[] = [];
    for (const i of standardModules) {
        ret = ret.concat(await i.search(keyword, page));
    }

    // if (config.modules.aipanso.token) {
    //     const aipanso = new Aipanso();
    //     ret = ret.concat(await aipanso.search(keyword, page, config.modules.aipanso));
    // }

    if (config.modules.qianfanso.token) {
        const qianfanso = new Qianfanso({ token: config.modules.qianfanso.token });
        ret = ret.concat(await qianfanso.search(keyword, page));
    }

    return r(ResponseCode.OK, ret);
}


export { search }
