import type { SearchModule, SearchResult } from "./SearchModule.ts";

import { Platform } from "./SearchModule.ts";
import { load } from 'cheerio';


class Kapa implements SearchModule {
    async search(keyword: string, page: number | undefined = 1): Promise<SearchResult[]> {
        const res = await fetch(`https://www.cuppaso.com/search?type=2&keyword=${keyword}&searchType=0&page=${page}`).then(res => res.text());
        const $ = load(res);

        const list = $('.col-md-12 .row .card');
        const ret: SearchResult[] = [];
        list.each((_i, v) => {
            ret.push({
                name: $(v).find('.card-title a').text().trim(),
                url: 'https://www.cuppaso.com/' + $(v).find('.text-center a').attr('href')!,
                date: new Date($(v).find('.card-footer .text-wrap').text().substring('收录时间:'.length)).getTime(),
                sharer: {
                    nickname: $(v).find('.card-actions a').text().trim(),
                    url: 'https://www.cuppaso.com/search' + $(v).find('.card-actions a').attr('href')!
                },
                platform: getPlatform($(v).find('.card-footer .d-flex img').attr('src')!),
                module: 'kapa'
            });
        });

        return ret;
    }
}

function getPlatform(url: string): Platform {
    switch (url) {
        case 'static/assets/img/1.png': return Platform.KUAKE;
        case 'static/assets/img/2.png': return Platform.ALI;
        case 'static/assets/img/4.png': return Platform.XUNLEI;
        default: return Platform.UNKNOWN;
    }
}


export default Kapa;
