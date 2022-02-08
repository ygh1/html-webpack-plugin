# 实现一个 html-webpack-plugin


### 插件的实现思路
基于tapable发布订阅
插件代码的格式一个类，具有apply方法，内部参数接受webpack compiler对象，然后处理对应的逻辑