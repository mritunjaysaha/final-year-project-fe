import axios from "axios";

/**
 *
 * @param {[Object][object]} data
 * @param {ObjectId} examId
 * @param {ObjectId} userId
 */
export async function updateExam(data, examId, userId) {
    await axios
        .put(`/api/exam/${examId}/${userId}`, data)
        .then((res) => console.log(res.data))
        .catch((err) => console.log("updateExam", err.message));
}
