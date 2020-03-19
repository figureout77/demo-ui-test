
<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the
      <a href="https://cli.vuejs.org" target="_blank" rel="noopener">vue-cli documentation</a>.
    </p>
    <h3>Installed CLI Plugins</h3>
    <ul>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel" target="_blank" rel="noopener">babel</a></li>
      <li><a href="https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint" target="_blank" rel="noopener">eslint</a></li>
    </ul>
    <h3>Essential Links</h3>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" rel="noopener">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" rel="noopener">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank" rel="noopener">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" rel="noopener">Twitter</a></li>
      <li><a href="https://news.vuejs.org" target="_blank" rel="noopener">News</a></li>
    </ul>
    <h3>Ecosystem</h3>
    <ul>
      <li><a href="https://router.vuejs.org" target="_blank" rel="noopener">vue-router</a></li>
      <li><a href="https://vuex.vuejs.org" target="_blank" rel="noopener">vuex</a></li>
      <li><a href="https://github.com/vuejs/vue-devtools#vue-devtools" target="_blank" rel="noopener">vue-devtools</a></li>
      <li><a href="https://vue-loader.vuejs.org" target="_blank" rel="noopener">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" rel="noopener">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>


<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
<!--
<template>
   <div>
       {{formValidate}}
       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
           <FormItem label="Hobby" prop="ainterest">
               <Select
                   multiple
                   :max-tag-count="1"
                   v-model="formValidate.ainterest"
               >
                   <Option value="Eat">Eat</Option>
                   <Option value="Sleep">Sleep</Option>
                   <Option value="Run">Run</Option>
                   <Option value="Movie">Movie</Option>
               </Select>
           </FormItem>
           <FormItem label="Hobby" prop="binterest">
               <CheckboxGroup v-model="formValidate.binterest">
                   <Checkbox label="Eat"></Checkbox>
                   <Checkbox label="Sleep"></Checkbox>
                   <Checkbox label="Run"></Checkbox>
                   <Checkbox label="Movie"></Checkbox>
               </CheckboxGroup>
           </FormItem>
           <FormItem>
               <Button type="primary" @click="handleSubmit('formValidate')">Submit</Button>
               <Button @click="handleReset('formValidate')" style="margin-left: 8px">Reset</Button>
           </FormItem>
       </Form>
       <h2 style="margin-top:20px">#5327 feature</h2>
       <Select v-model='test' filterable clearable>
            <Option v-for='item in list' :value='item.value' :label="item.name" :key="item.value"></Option>
            <div slot="empty">2222</div>
        </Select>
        <h2 style="margin-top:20px">#5216</h2>
        <Select v-model="model11" filterable clearable>
            <OptionGroup label="分组">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
        </Select>
        <h2 style="margin-top:20px">Demo</h2>
        <Select v-model="model12">
            <OptionGroup label="分组">
                <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </OptionGroup>
        </Select>
   </div>
</template>
<script>
    export default {
        data () {
            return {
                formValidate: {
                    ainterest: [],
                    binterest: [],
                },
                ruleValidate: {
                    ainterest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    ],
                    binterest: [
                        { required: true, type: 'array', min: 1, message: 'Choose at least one hobby', trigger: 'change' },
                    ],
                },
                test:'',
                list:[{
                    name: '测试测试2',
                    value:1
                },{
                    name: 'dddddd',
                    value:2
                },{
                    name:'测试测试',
                    value:8
                },{
                    name: '\"年龄\"123',
                    value:9
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
                model11: '',
                model12: ''
            };
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                });
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    };
</script>

-->