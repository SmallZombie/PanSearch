import { load } from "cheerio";
import { SearchModule, SearchResult } from "./SearchModule.ts";
import { Platform } from "./SearchModule.ts";


class Qianfanso implements SearchModule {
    token: string | null = null;

    constructor(options: { token: string }) {
        if (options?.token) this.token = options.token;
    }


    async search(keyword: string, page: number | undefined = 1): Promise<SearchResult[]> {
        const res = await fetch(`https://pan.qianfan.app/search?q=${keyword}&page=${page}`, {
            headers: {
                cookie: 'code=' + this.token
            }
        }).then(res => res.text());
        const $ = load(res);
        const list = $('.search-item');
        const ret: SearchResult[] = [];

        list.each((_i, v) => {
            const nameA = $(v).find('> a');

            ret.push({
                name: nameA.text().trim(),
                url: 'https://pan.qianfan.app' + nameA.attr('href'),
                sharer: {
                    nickname: $(v).find('.search-creator').text()
                },
                platform: getPlatform(nameA.find('img').attr('alt')),
                module: 'qianfanso'
            });
        });

        return ret;
    }
}

function getPlatform(alt: string): Platform {
    switch (alt) {
        case '阿里云盘资源': return Platform.ALI;
        case '百度网盘资源': return Platform.BAIDU;
        case '夸克网盘资源': return Platform.KUAKE;
        case '蓝奏云资源': return Platform.LANZOU;
        case '天翼云盘资源': return Platform.TIANYI;
        default: return Platform.UNKNOWN;
    }
}


export { Qianfanso }
