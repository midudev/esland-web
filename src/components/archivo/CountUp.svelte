<script setup>
import ProgressiveNumber from '@/components/ProgressiveNumber'

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
  duration,
  decimals
);
</script>

<span>{ count }</span>
