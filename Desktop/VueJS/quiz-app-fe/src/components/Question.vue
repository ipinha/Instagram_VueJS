<script setup>
import { defineProps, ref } from "vue"

const { questions } = defineProps(['questions'])

const selectedOptions = ref({})
function selectOption(questionId, optionId)
{
    selectedOptions.value[questionId] = optionId
}
</script>
<template>
    <main>
        <div class="list" v-for="(ques, index) in questions" :key="index">
            <div class="question-container">
                <div class="question" style="color: black; font-weight: bold">Câu {{ index + 1 }}: {{ ques.text }}</div>
            </div>

            <div>
                <n-radio-group :value="selectedOptions[index]" @update:value="(val) => selectOption(ques.id, val)"
                    name="optionGroup">
                    <n-grid cols="1" x-gap="12">
                        <n-gi v-for="(option, index) in ques.answers" :key="index">
                            <n-radio :text="option.text" :value="`${String.fromCharCode(65 + index)}`"
                                :label="`${String.fromCharCode(65 + index)}. ${option.text}`" />
                        </n-gi>
                    </n-grid>
                </n-radio-group>
            </div>
        </div>

        <div class="btn-end">
            <n-button type="warning" size="large">
                Nộp Bài
            </n-button>
        </div>
    </main>
</template>

<style scoped>
main
{
    max-width: 100vw;
    height: 100vh;
    background-color: rgb(250, 245, 229);
    padding: 20px 15%;
}

.list
{
    width: 85%;
    justify-content: center;
    margin: 20px 100px;
    box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.1);
    padding: 20px;
    background-color: #fff;
    border-radius: 30px;
}

.question-container
{
    margin: 10px;
    width: 60%;

}

.question
{
    font-weight: 600;
    font-size: 17px;
}

.btn-end {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 2%;
    margin-top: 30px;
  }
</style>