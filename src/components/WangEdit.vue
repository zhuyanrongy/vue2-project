<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 300px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
      @onChange="handleChange"
    />
  </div>
</template>

<script>
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

export default {
  components: { Editor, Toolbar },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {
        toolbarKeys: [
          "headerSelect",
          "bold",
          "underline",
          "italic",
          "color",
          "bgColor",
          "fontSize",
          "fontFamily",
          "lineHeight",
          "bulletedList",
          "numberedList",
          "todo",
          "|",
          "emotion",
          "insertLink",
          "insertTable",
          "codeBlock",
          "divider",
        ],
      },
      editorConfig: { placeholder: "请输入内容...", focus: false },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor); // 一定要用 Object.seal() ，否则会报错
    },
    handleChange(editor) {
      if (this.html.trim() !== "") {
        this.$emit("editChange", this.html);
      }
    },
    beforeDestroy() {
      const editor = this.editor;
      if (editor == null) return;
      editor.destroy(); // 组件销毁时，及时销毁编辑器
    },
  },
};
</script>


<style src="@wangeditor/editor/dist/css/style.css"></style>
