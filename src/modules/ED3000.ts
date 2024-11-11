import { load } from "cheerio";
import { Platform, SearchModule, SearchResult } from "./SearchModule.ts";


class ED3000 implements SearchModule {
    async search(keyword: string, page: number | undefined = 1): Promise<SearchResult[]> {
        const res = await fetch(`https://www.ed3000.com/aliyunpan_video/${keyword}-${page}-0.html`).then(res => res.text());
        const $ = load(res);
        const list = $('.resource-item');
        const ret: SearchResult[] = [];

        list.each((_i, v) => {
            const nameA = $(v).find('.resource-title a');

            ret.push({
                name: nameA.text().trim(),
                url: 'https://www.ed3000.com' + nameA.attr('href'),
                date: parseDate($(v).find('.resource-meta .meta-item:first-child').contents().get(-1).data),
                platform: getPlatform($(v).find('.filetype').attr('src')!),
                module: 'ed3000'
            });
        });

        return ret;
    }
}

function getPlatform(src: string): Platform {
    switch (src) {
        case '/static/icon/dir.png': return Platform.ALI;
        case '/static/icon/dir_2.png': return Platform.KUAKE;
        default: return Platform.UNKNOWN;
    }
}

function parseDate(str: string): number {
    const now = new Date();
    const num = parseInt(str);
    const unit = str.slice(String(num).length);

    switch (unit) {
        case '年前':
            now.setFullYear(now.getFullYear() - num);
            break;
        case '月前':
            now.setMonth(now.getMonth() - num);
            break;
        case '周前':
            now.setDate(now.getDate() - num * 7);
            break;
        case '天前':
            now.setDate(now.getDate() - num);
            break;
        case '小时前':
            now.setHours(now.getHours() - num);
            break;
        case '分钟前':
            now.setMinutes(now.getMinutes() - num);
            break;
        default:
            return Date.now();
    }

    return now.getTime();
}


export default ED3000;
