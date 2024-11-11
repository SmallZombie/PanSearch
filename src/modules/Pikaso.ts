import { load } from "cheerio";
import { SearchModule, SearchResult } from "./SearchModule.ts";
import { Platform } from "./SearchModule.ts";


class Pikaso implements SearchModule {
    async search(keyword: string, page: number | undefined = 1): Promise<SearchResult[]> {
        const res = await fetch(`https://www.pikaso.top/search?q=${keyword}&page=${keyword}`).then(res => res.text());
        const $ = load(res);

        const list = $('.search-item');
        const ret: SearchResult[] = [];
        list.each((_i, v) => {
            const nameA = $(v).find('> a');
            const sharerA = $(v).find('.search-creator');

            const name = nameA.find('h2').text();
            if (name.startsWith('🔥') && name.endsWith('🔥')) return;

            const temp: SearchResult = {
                name,
                url: nameA.attr('href')!,
                sharer: {
                    nickname: sharerA.text(),
                    url: 'https://www.pikaso.top/' + sharerA.attr('href')
                },
                platform: getPlatform($(v).find('.search-title img').attr('alt')),
                module: 'pikaso'
            }

            const passwordText = $(v).find('.search-des p:first-child').text();
            if (passwordText.startsWith('🔐')) temp.password = passwordText.slice('🔐提取码：'.length);

            ret.push(temp);
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


export default Pikaso;
