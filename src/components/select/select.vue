<template>
    <div :class="classes">
        <!-- select area -->
        <div
            @click="toggleMenu"
            :class="selectionsCls"
        >
            <slot name="prefix">
                <span :class="[prefixCls + '-prefix']"  v-if="prefix">
                    <Icon :type="prefix" />
                </span>
            </slot>
            <slot name="input">
                <!-- selected real value -->
                <input type="hidden" :value="publicValue">
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
            <Drop
                :class="dropdownCls"
                v-show="dropVisible"
                :placement="placement"
                ref="dropdown"
                :transfer="transfer"
                v-transfer-dom
            >
                <ul>
                    <li>test</li>
                    <li>test2</li>
                    <li>test3</li>
                </ul>
                <!-- <ul v-show="showNotFoundLabel && !$slots.empty" :class="[prefixCls + '-not-found']"><li>{{ localeNotFoundText }}</li></ul>
                <ul v-if="showNotFoundLabel && $slots.empty" :class="[prefixCls + '-not-found']"  @mousedown.prevent><li><slot name="empty"></slot></li></ul>
                <ul :class="prefixCls + '-dropdown-list'">
                    <functional-options
                        v-if="(!remote) || (remote && !loading)"
                        :options="selectOptions"
                        :slot-update-hook="updateSlotOptions"
                        :slot-options="slotOptions"
                    ></functional-options>
                </ul> -->
                <!-- <ul v-show="loading" :class="[prefixCls + '-loading']">{{ localeLoadingText }}</ul> -->
            </Drop>
        </transition>
    </div>
</template>
<script>
import Icon from '../icon'
import Drop from './dropdown.vue'

import TransferDom from '../../directives/transfer-dom';


const prefixCls = 'ivu-select'

export default {
    data() {
        return {
            visible: false, // menu showing status
            prefixCls: prefixCls,
            query: '',
            // dropdown
            values: [], // options value
            isFocused: false,
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
    },
    methods: {
        toggleMenu() {
            if (this.disabled) {
                return false
            }
            this.visible = !this.visible
            console.log(this.visible)
        },
        hideMenu() {
            this.toggleMenu(null, false)
        },
        onClear() {
            this.hideMenu();
            if (this.clearable) {
                this.reset()
            }
            this.$emit('on-clear')
        },
        reset() {
            this.values = []
        },
        onQueryChange(query) {
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
            return '请选择'
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
        },
        publicValue() {

        }

    },
    watch: {
       query(val) {
           this.onQueryChange(val)
       }
    },
    directives: { TransferDom },
    components: { Icon, Drop }
}
</script>