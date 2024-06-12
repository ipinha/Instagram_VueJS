<script setup>
import { defineProps, ref, computed, onBeforeUnmount } from "vue";

const { student, time, name }
    = defineProps([
        "student",
        "time",
        "name"
    ])


// xu ly dem nguoc thoi gian neu can

const timeLeftInSeconds = ref(time * 60);

const formattedTime = computed(() =>
{
    const minutes = Math.floor(timeLeftInSeconds.value / 60);
    const seconds = timeLeftInSeconds.value % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
});

const interval = setInterval(() =>
{
    timeLeftInSeconds.value -= 1;
    if (timeLeftInSeconds.value <= 0)
    {
        clearInterval(interval);
    }
}, 1000);

onBeforeUnmount(() =>
{
    clearInterval(interval);
});



</script>
<template>
    <main>
        <div class="container">
            <div class="student-info" style="color: black; font-weight: bold">{{ student.name }} -
                {{ student.student_code }}</div>

            <div class="name-test">
                <h2 style="color: black; font-weight: bold">{{ name }}</h2>
            </div>

            <div class="timex" style="color: black; font-weight: bold">{{ formattedTime }}</div>
        </div>
    </main>
</template>

<style scoped>
.container
{
    background-color: rgb(240, 198, 142);
    display: flex;
    height: 5%;
    align-items: center;
    padding: 0px 60px;
    font-size: 20px;
    font-weight: 200;
    justify-content: space-evenly;
}

.student-info
{
    margin-right: auto;
}

.timex
{
    margin-left: auto;
}

.name-test
{
    font-weight: 200;
    font-size: 20px;
}
</style>