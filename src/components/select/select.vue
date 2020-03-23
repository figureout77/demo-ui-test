<template>
    <div>
        <!-- select area -->
        <div
            @click="toggleMenu"
        >
            <slot name="icon">
            </slot>
            <slot name="input">
                123
            </slot>
        </div>
        <!-- animation -->
        <transition>
        </transition>
    </div>
</template>
<script>
export default {
    data() {
        return {
            visible: false, // menu showing status
            disabled: false, // select clickable status
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
        placeholder: String
    },
    methods: {
        toggleMenu() {
            if (this.disabled) {
                return false;
            }
            this.visible = !this.visible
            console.log(this.visible)
        }
    }
}
</script>