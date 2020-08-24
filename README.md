# 每日优鲜C端项目

## 项目接口
base: https://mallapi.duyiedu.com/goods/

1. 获取二级导航
请求方法： GET
请求路径：/getsidebar
请求参数：

| 参数 | 说明|
| :---: | :---: |
| type | 获取对应一级导航的二级导航 |

2. 获取商品列表
请求方法： GET
请求路径：/getGoodsList
请求参数：

| 参数 | 说明|
| :---: | :---: |
| type | 商品列表的type |
| page | 翻页 |
| size | 每页的大小 |
| sort| 排序方式 |

3. 模糊搜索
请求方法： GET
请求路径：/likeSearch
请求参数：

| 参数 | 说明|
| :---: | :---: |
| likeValue | 模糊搜索值 |

4. 搜索
请求方法： GET
请求路径：/search
请求参数：

| 参数 | 说明|
| :---: | :---: |
| type | 搜索内容 |
| page | 翻页 |
| size | 每页大小 |

5. 根据商品列表进行搜索
请求方法： GET
请求路径：/getGoodsByIds
请求参数：

| 参数 | 说明|
| :---: | :---: |
| value | 若干产品的id |