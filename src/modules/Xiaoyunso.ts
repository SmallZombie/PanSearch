import { load } from "cheerio";
import { SearchModule, SearchResult, Platform } from "./SearchModule.ts";


class Xiaoyunso implements SearchModule {
    async search(keyword: string, page: number | undefined = 1): Promise<SearchResult[]> {
        const res = await fetch(`https://www.yunso.net/api/validate/search3?wd=${keyword}&mode=90002&page=${page}`, {
            method: 'POST'
        }).then(res => res.json());
        const $ = load(res.data);

        const list = $('div[uks]');
        const ret: SearchResult[] = [];

        list.each((_i, v) => {
            let dateText = '';
            $(v).find('.layui-card-header').contents().each((_i, v) => {
                if (v.data && v.data.trim()) dateText = v.data;
            });

            ret.push({
                name: $(v).find('.layui-card-header a').text(),
                url: 'https://www.yunso.net/api/validate/geturl?qid=' + $(v).attr('id'),
                date: new Date(dateText).getTime(),
                platform: getPlatform($(v).find('.layui-card-body img').attr('alt')!),
                module: 'xiaoyunso'
            });
        });

        return ret;
    }
}

function getPlatform(alt: string): Platform {
    switch (alt) {
        case '阿里': return Platform.ALI;
        case '百度': return Platform.BAIDU;
        case '夸克': return Platform.KUAKE;
        case '天翼': return Platform.TIANYI;
        case '彩和': return Platform.A139;
        case '迅雷': return Platform.XUNLEI;
        case '蓝奏': return Platform.LANZOU;
        case 'UC': return Platform.UC;
        default: return Platform.UNKNOWN;
    }
}


export default Xiaoyunso;
