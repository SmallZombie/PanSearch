用于聚合多个网盘聚合搜索网站，并提供一个聚合搜索接口。  
网站来源：https://www.pansou.vip/


# 使用方法
1. 安装 [Deno](https://github.com/denoland/deno)。
2. 运行 `deno task start` 或 `deno task start-allow -p 8888`。
3. 同意权限，或运行 `start-allow` 任务来跳过权限设置。
4. 访问 `http://localhost:8081/search?keyword=<string>[&page=<number>]` 即可。

部分网站需要加公众号获取不定时变更的 code，具体情况见下面。

## 干帆搜索
需要关注公众号发送 "芝麻开门" 获取 code，将其填入 `config.json` 的 `modules.qianfanso.token` 中。


# 目前支持
- [卡帕搜索](https://www.cuppaso.com/)
- [阿里搜](https://aliso.cc/)
- [盘搜](https://panso.pro/)
- [小云搜索](https://www.yunso.net/)
- [皮卡搜索](https://www.pikaso.top/)
- [ED3000](https://www.ed3000.com/)
- [干帆搜索](https://pan.qianfan.app/)


# 计划支持 (TODO)


# 不会支持
- [爱盘搜](https://aipanso.com/) (懒得处理反扒)
- [迅极搜](https://xunjiso.com/) (懒得处理反扒)
- [猫狸盘搜](https://www.alipansou.com/) (懒得处理反扒)
- [兄弟盘](https://xiongdipan.com/) (懒得处理反扒)
- [UC云搜](https://ucyunso.com/) (懒得处理反扒)
- [天逸搜](https://www.tianyiso.com/) (懒得处理反扒)
- [快盘搜](https://www.kpanso.com/) (无法访问)
- [大圣盘](https://www.dashengpan.com/) (需要登录，免费用户限制搜索次数，查看资源链接需要付费，故不考虑)


# 其他
这是我第一次使用 Deno。  
这是我第一次使用 TypeScript。
