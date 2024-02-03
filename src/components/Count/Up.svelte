<script setup>
import ProgressiveNumber from "./Up";

export let initial;
export let final;
export let decimals = 0;
export let duration = 1500;

let count = 0

ProgressiveNumber.generate(
  initial,
  final,
  (value) => {
    count = value;
  },
  decimals,
  duration
);
</script>

<span>{ count }</span>
