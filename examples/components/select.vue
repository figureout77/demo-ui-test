<template>
    <div>
        <h2>Normal Select</h2>
        <Select v-model='test' filterable clearable>
            <Option v-for='item in list' :value='item.value' :label="item.name" :key="item.value"></Option>
            <div slot="empty">2222</div>
        </Select>

        <h2 style="margin-top:20px">Option Group</h2>
        <Select v-model="model1">
            <OptionGroup label="分组">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
        </Select>

        <h2 style="margin-top:20px">Option Group with filter</h2>
        <Select v-model="model2" filterable clearable>
            <OptionGroup label="分组">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
        </Select>

        <h2 style="margin-top:20px">Disabled Select</h2>
        <Select v-model="model3" disabled style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
        <Select v-model="model4" style="width:200px">
            <Option value="beijing">New York</Option>
            <Option value="shanghai" disabled>London</Option>
            <Option value="shenzhen">Sydney</Option>
        </Select>

        <h2 style="margin-top:20px">Custom option template</h2>
        <Select v-model="model5" style="width:200px">
            <Option value="New York" label="New York">
                <span>New York</span>
                <span style="float:right;color:#ccc">America</span>
            </Option>
            <Option value="London" label="London">
                <span>London</span>
                <span style="float:right;color:#ccc">U.K.</span>
            </Option>
            <Option value="Sydney" label="Sydney">
                <span>Sydney</span>
                <span style="float:right;color:#ccc">Australian</span>
            </Option>
        </Select>

        <h2 style="margin-top:20px">Select with multiple options</h2>
        <Select v-model="model6" multiple style="width:260px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>

        <h2 style="margin-top:20px">Custom icon</h2>
        <Select v-model="model7" prefix="ios-home" style="width:200px">
            <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </div>
</template>
<script>
export default {
    data () {
        return {
            formValidate: {
                ainterest: [],
                binterest: []
            },
            ruleValidate: {
                ainterest: [
                    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' }
                ],
                binterest: [
                    { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' }
                ]
            },
            test: '',
            list: [{
                name: '测试测试2',
                value:1
            }, {
                name: 'dddddd',
                value: 2
            }, {
                name:'测试测试',
                value: 8
            }, {
                name: '\"年龄\"123', // eslint-disable-line
                value: 9
            }],
            cityList: [
                {
                    value: 'New York',
                    label: 'New York'
                },
                {
                    value: 'London',
                    label: 'London'
                },
                {
                    value: 'Sydney',
                    label: 'Sydney'
                },
                {
                    value: 'Ottawa',
                    label: 'Ottawa'
                },
                {
                    value: 'Paris',
                    label: 'Paris'
                },
                {
                    value: 'Canberra',
                    label: 'Canberra'
                }
            ],
            model1: '',
            model2: '',
            model3: '',
            model4: '',
            model5: '',
            model6: '',
            model7: ''
        }
    }
};
</script>
