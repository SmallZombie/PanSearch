import type { SearchResult } from "./SearchModule.ts";

import { Platform, SearchModule } from "./SearchModule.ts";
import { load } from "cheerio";


class Panso implements SearchModule {
    async search(keyword: string, page: number | undefined = 1): Promise<SearchResult[]> {
        const res = await fetch(`https://panso.pro/search?q=${keyword}&page=${page}`).then(res => res.text());
        const $ = load(res);

        const list = $('.rm-search-content > div');
        const ret: SearchResult[] = [];
        list.each((_i, v) => {
            const titleA = $(v).find('> div:first-child a');
            const sharerA = $(v).find('> div:last-child div:first-child a');

            ret.push({
                name: titleA.attr('title')!,
                url: 'https://panso.pro' + titleA.attr('href')!,
                date: new Date($(v).find('.semi-space div span').last().text().trim()).getTime(),
                sharer: {
                    nickname: sharerA.text().trim(),
                    url: 'https://panso.pro' + sharerA.attr('href')!
                },
                platform: getPlatform($(v).find('img').attr('alt')!),
                module: 'panso'
            });
        });

        return ret;
    }
}

function getPlatform(str: string): Platform {
    switch (str) {
        case '百度网盘': return Platform.BAIDU;
        case '夸克网盘': return Platform.KUAKE;
        case '阿里云盘': return Platform.ALI;
        case '迅雷网盘': return Platform.XUNLEI;
        case 'UC 网盘': return Platform.UC;
        case '115网盘': return Platform.A115;
        default: return Platform.UNKNOWN;
    }
}


export default Panso;
