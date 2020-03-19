import { Select, Option, OptionGroup } from './components/select';

const components = {
    Option: Option,
    OptionGroup,
    Select
};

const iview = {
    ...components,
    iOption: Option,
    iSelect: Select
};

// 定义install方法
const install = function (Vue, opts = {}) {
    if (install.installed) return;
    install.installed = true;

    // 遍历注册所有组件
    Object.keys(iview).forEach(key => {
        Vue.component(key, iview[key]);
    });
};

if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version: process.env.VERSION,
    install,
    ...components
};