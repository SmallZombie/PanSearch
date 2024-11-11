interface Config {
    modules: {
        aipanso: {
            token: string | null
        },
        qianfanso: {
            token: string | null
        }
    }
}

export type { Config }
