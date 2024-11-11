import type { SearchResult } from "./SearchModule.ts";

import { load } from 'cheerio';
import { Platform, SearchModule } from "./SearchModule.ts";


class Aliso implements SearchModule {
    async search(keyword: string, page: number | undefined = 1): Promise<SearchResult[]> {
        const res = await fetch(`https://aliso.cc/s/${keyword}-${page}-0.html`).then(res => res.text());
        const $ = load(res);

        const list = $('.result-wrap .resource-item-wrap');
        const ret: SearchResult[] = [];
        list.each((_i, v) => {
            ret.push({
                name: $(v).find('.resource-title a').text(),
                url: 'https://aliso.cc' + $(v).find('.resource-title a').attr('href'),
                date: new Date($(v).find('.other-info .time').text()).getTime(),
                platform: Platform.ALI,
                module: 'aliso'
            });
        });

        return ret;
    }
}


export default Aliso;
