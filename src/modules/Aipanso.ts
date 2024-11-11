import { load } from "cheerio";
import { Platform, SearchModule, SearchResult } from "./SearchModule.ts";


/**
 * @deprecated 懒得研究这个 cookie
 */
class Aipanso implements SearchModule {
    async search(keyword: string): Promise<SearchResult[]> {
        const res = await fetch('https://aipanso.com/search?k=' + keyword, {
            headers: {
                cookie: 'ck_ml_sea_='
            }
        }).then(res => res.text());
        const $ = load(res);

        const list = $('#app > div:nth-child(1) > van-row').slice(3);
        const ret: SearchResult[] = [];
        list.each((_i, v) => {
            const dateText: string = $(v).find('template:last-child').text().trim().match(/时间:(.*?)格式/)?.[1].trim()!;

            ret.push({
                name: $(v).find('template:first-child').text().trim(),
                url: 'https://aipanso.com' + $(v).find('a').attr('href')!,
                date: new Date(dateText).getTime(),
                platform: Platform.KUAKE,
                module: 'aipanso'
            });
        });

        return ret;
    }
}


export default Aipanso;
