<template>
  <div class="json-editor">
    <textarea ref="textarea"/>
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/eclipse.css'
// require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
// import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/json-lint'

export default {
  name: 'editArea',
  /* eslint-disable vue/require-prop-types */
  props: ['value', 'isRead'],
  data () {
    return {
      jsonEditor: false
    }
  },
  watch: {
    value (value) {
      const editor_value = this.jsonEditor.getValue()
      if (value !== editor_value) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 4))
      }
    }
  },
  mounted () {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true,
      mode: 'application/json',
      theme: 'eclipse',
      readOnly: this.isRead,
      lint: true
    })

    this.jsonEditor.setValue(JSON.stringify(this.value, null, 4))
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue () {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style scoped>

</style>
