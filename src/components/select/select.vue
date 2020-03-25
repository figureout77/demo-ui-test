<template>
    <div 
        :class="classes"
        v-click-outside.capture="onClickOutside"
        v-click-outside:mousedown.capture="onClickOutside"
        v-click-outside:touchstart.capture="onClickOutside"
    >
        <!-- select area -->
        <div
            ref="reference"
            @click="toggleMenu"
            :class="selectionsCls"
        >
            <slot name="prefix">
                <span :class="[prefixCls + '-prefix']"  v-if="prefix">
                    <Icon :type="prefix" />
                </span>
            </slot>
            <slot name="input">
                <!-- text area -->
                <span
                    :class="singleDisplayClasses"
                    v-show="singleDisplayValue"
                >{{ singleDisplayValue }}</span>
                <!-- filterable input -->
                <input
                    type="text"
                    v-if="filterable"
                    v-model="query"
                    :disabled="disabled"
                    :class="[prefixCls + '-input']"
                    placeholder="请选择"
                    autocomplete="off"
                    spellcheck="false"
                    @focus="onInputFocus"
                    @blur="onInputBlur"
                    ref="input"
                />
            </slot>
            <slot name="icon">
                <Icon type="ios-close-circle" :class="[prefixCls + '-arrow']" v-if="resetSelect" @click.native.stop="onClear"></Icon>
                <Icon type="ios-arrow-down" :class="[prefixCls + '-arrow']" v-if="!resetSelect"></Icon>
            </slot>
        </div>
        <!-- animation -->
        <transition name="transition-drop">
            <!-- dropdown list area -->
            <Drop
                :class="dropdownCls"
                v-show="dropVisible"
                :placement="placement"
                ref="dropdown"
                :transfer="transfer"
                v-transfer-dom
            >
                <ul :class="prefixCls + '-dropdown-list'">
                    <slot>
                    </slot>
                </ul>
            </Drop>
        </transition>
    </div>
</template>
<script>
import Icon from '../icon'
import Drop from './dropdown.vue'
import Emitter from '../../mixins/emitter';
import { directive as clickOutside } from 'v-click-outside-x';

import TransferDom from '../../directives/transfer-dom';

const findChild = (instance, checkFn) => {
    let match = checkFn(instance);
    if (match) return instance;
    for (let i = 0, l = instance.$children.length; i < l; i++){
        const child = instance.$children[i];
        match = findChild(child, checkFn);
        if (match) return match;
    }
};
const prefixCls = 'ivu-select'

export default {
    data() {
        return {
            visible: false, // menu showing status
            prefixCls: prefixCls,
            query: '',
            // dropdown
            values: [], // options value
            isFocused: false, // selection area style
        }
    },
    props: {
        // 默认选中值
        value: {
            type: [String, Number, Array],
            default: ''
        },
        // 支持多选
        multiple: {
            type: Boolean,
            default: false
        },
        clearable: {
            type: Boolean,
            default: false
        },
        // 禁用
        disabled: {
            type: Boolean,
            default: false
        },
        // 支持搜索
        filterable: {
            type: Boolean,
            default: false
        },
        size: {
            type: String,
            default: ''
        },
        autoComplete: {
            type: Boolean,
            default: false
        },
        placeholder: String,
        // 选择框icon
        prefix: String,
        transfer: {
            type: Boolean,
            default: true
        },
        placement: {
            default: 'bottom-start'
        },
    },
    mounted() {
        // 选择选项回调
        this.$on('on-select-selected', this.onOptionClick)
    },
    methods: {
        onClickOutside() {
            if(this.visible) {
                if (event.type === 'mousedown') {
                    event.preventDefault()
                    return
                }
                if (!this.autoComplete) {
                    event.stopPropagation();
                }
                event.preventDefault()
                this.hideMenu()
                this.isFocused = true
                this.$emit('on-clickoutside', event)
            } else {
                this.isFocused = false
            }
        },
        toggleMenu(e, force = !this.visible) {
            if (this.disabled) {
                return false
            }
            this.visible = force
            if (this.visible) {
                this.dropDownWidth = this.$el.getBoundingClientRect().width;
                this.broadcast('Drop', 'on-update-popper');
            }
        },
        hideMenu() {
            this.toggleMenu(null, false)
        },
        onClear() {
            this.hideMenu()
            if (this.clearable) {
                this.reset()
            }
            this.$emit('on-clear')
        },
        reset() {
            this.query = ''
            this.values = []
        }, 
        onQueryChange(query) {
            // console.log(query)
            // console.log(this)
            // const optionInstance = findChild(this, ({ $options }) => {
            //     console.log($options.propsData)
            //     if ($options.propsData.label && $options.propsData.label.indexOf(query) !== -1) {
            //         console.log($options)
            //         $options.propsData.isFocused = true
            //     }
            //     // return $options.componentName === 'Drop' && $options.propsData.value === optionValue;
            // });
            if (query.length > 0 && query !== this.query) {
                if (this.autoComplete) {
                    if (this.autoComplete) {
                        let isInputFocused =
                            document.hasFocus &&
                            document.hasFocus() &&
                            document.activeElement === this.$el.querySelector('input');
                        this.visible = isInputFocused;
                    } else {
                        this.visible = true;
                    }
                }
            }
            this.query = query
        },
        onInputFocus() {
            this.isFocused = true
        },
        onInputBlur() {
            if (!this.values.length) {
                this.query = ''
            }
            this.isFocused = false
        },
        onOptionClick(option) {
            this.query = String(option.label).trim()
            this.values = [option]
            this.hideMenu()
            this.$emit('on-select', option)
            this.broadcast('Drop', 'on-update-popper')
        }
    },
    computed: {
        classes() {
            return [
                `${prefixCls}`,
                {
                    [`${prefixCls}-visible`]: this.visible,
                    [`${prefixCls}-disabled`]: this.disabled,
                    [`${prefixCls}-multiple`]: this.multiple,
                    [`${prefixCls}-single`]: !this.multiple,
                    [`${prefixCls}-${this.size}`]: !!this.size
                }
            ]
        },
        selectionsCls() {
            return {
                [`${prefixCls}-selection`]: !this.autoComplete,
                [`${prefixCls}-selection-focused`]: this.isFocused
            }
        },
        dropdownCls () {
            return {
                [prefixCls + '-dropdown-transfer']: this.transfer,
                [prefixCls + '-multiple']: this.multiple && this.transfer,
                'ivu-auto-complete': this.autoComplete,
                [this.transferClassName]: this.transferClassName
            };
        },
        dropVisible() {
            return this.visible;
        },
        singleDisplayClasses() {
            const { filterable, showPlaceholder } = this;
            return [{
                [prefixCls + '-head-with-prefix']: this.$slots.prefix || this.prefix,
                [prefixCls + '-placeholder']: showPlaceholder && !filterable,
                [prefixCls + '-selected-value']: !showPlaceholder && !filterable
            }]
        },
        singleDisplayValue() {
            if (this.filterable) {
                return '';
            }
            return  this.values[0] && this.values[0].label || '请选择'
        },
        showPlaceholder () {
            let status = false;
            if (!this.values.length > 0) {
                status = true;
            }
            return status;
        },
        resetSelect (){
            return !this.showPlaceholder && this.clearable
        }
    },
    watch: {
       query(val) {
           this.onQueryChange(val)
       }
    },
    name: 'iSelect',
    mixins: [ Emitter ],
    directives: { TransferDom, clickOutside },
    components: { Icon, Drop }
}
</script>