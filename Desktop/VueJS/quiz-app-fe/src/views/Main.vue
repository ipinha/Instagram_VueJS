<script setup>
import { ref } from "vue"
import axios from "axios";
import ExamsHeader from '@/components/ExamsHeader.vue';
import Question from "../components/Question.vue";


const questions = ref([])
const student = ref({})
const test = ref({})
const time = ref(0)
const show = ref(false)
const alert = ref(false)

const studentCode = ref("")
const testID = ref("661e8ba27d25c7947c38bfb7")

const wait = ref(false)



const handleClick = async () =>
{
    try
    {
        wait.value = true;
        const response = await axios.post('http://127.0.0.1:8001/task_service/start_test', { "test_id": testID, "student_code": studentCode.value });
        if (response.status === 200)
        {
            if (response.data.status == 'failed')
            {
                console.log('Sinh viên không hợp lệ hoặc không có quyền truy cập!')
                wait.value = false;
                alert.value = true;
                return;
            }
            show.value = true
            console.log('Dữ liệu:', response.data);
            questions.value = response.data.data.questions ;
            student.value = response.data.data.student;
            test.value = response.data.data.test;
            time.value = test.value.time;
            alert.value = false;
        }
        else
        {
            console.error('Có lỗi xảy ra khi gửi dữ liệu');
        }
    } catch (error)
    {
        console.error('Lỗi:', error);
    }
}

</script>

<template>
    <n-space vertical :size="12">
        <n-alert title="Error Text" type="error" v-if="alert">
            Sinh viên không hợp lệ hoặc không có quyền truy cập!
        </n-alert>
    </n-space>

    <div v-if="questions.length > 0">
        <div class="sticky-header">
            <ExamsHeader :student="student" :time="time" :name="test.name" />
        </div>

        <div class="question-container">
            <Question :questions="questions" />
        </div>
    </div>

    <div class="container-main" v-else>
        <div v-if="wait" class="cards spinner">
            <NSpin size="large" />
        </div>
        <div class="btn" v-else>
            <n-input v-model:value="testID" style="margin-bottom: 10%;" type="text" placeholder="Test ID" />
            <n-input v-model:value="studentCode" style="margin-bottom: 10%;" type="text" placeholder="Student Code" />

            <n-button @click="handleClick" strong secondary type="primary" size="large">
                Bắt đầu làm bài
            </n-button>
        </div>
    </div>
</template>

<style scope>
.sticky-header
{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 999;
    /* Đảm bảo header hiển thị trên cùng */
    background-color: #fff;
}

.question-container
{
    margin-top: 3%;
    /* Điều chỉnh giá trị này sao cho phù hợp với chiều cao của header */
}

.container-main
{
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #ffffff;
}

.btn
{

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border: 1px solid #c4c4c4;
    padding: 5%;
    border-radius: 5%;
    background-color: #f8ffd1;
    box-shadow: 2px 2px 2px #fff;
}
</style>