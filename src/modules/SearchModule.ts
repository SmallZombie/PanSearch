enum Platform {
    ALI = 'ali',
    KUAKE = 'quark',
    BAIDU = 'baidu',
    LANZOU = 'lanzou',
    TIANYI = '189',
    XUNLEI = 'xunlei',
    UC = 'uc',
    A115 = '115',
    A139 = '139',
    UNKNOWN = 'unknown'
}

interface Sharer {
    nickname: string;
    avatar?: string;
    url?: string;
}

interface SearchResult {
    name: string;
    url: string;
    password?: string,
    date?: number;
    sharer?: Sharer;
    /** url 对应平台 */
    platform: Platform;
    /** 搜索使用的模块 */
    module: string;
}

interface SearchModule {
    search: (keyword: string, page: number | undefined) => Promise<SearchResult[]>
}


export { Platform };
export type { SearchModule, SearchResult, Sharer };
