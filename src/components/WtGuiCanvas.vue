<template>
  <div class="my-canvas-wrapper">
    <canvas ref="my-canvas"></canvas>
    <slot></slot>
  </div>
</template>

<script>
export default {
  data() {
    return {
      provider: {
        context: null,
      },
    };
  },

  provide() {
    return {
      provider: this.provider,
    };
  },

  mounted() {
    this.provider.context = this.$refs['my-canvas'].getContext('2d');

    this.$refs['my-canvas'].width = this.$refs[
      'my-canvas'
    ].parentElement.clientWidth;
    this.$refs['my-canvas'].height = this.$refs[
      'my-canvas'
    ].parentElement.clientHeight;
  },
};
</script>