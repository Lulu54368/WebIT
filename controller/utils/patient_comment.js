//This is transformation of data structure for futher use
const patient_comment_list = (patient_data) => {
    var patient_comment_ls = []
    patient_data.forEach((element) => {
    const data = element.data;
    data.forEach((attr)=>{
        const component = {
            "id": element.id,
            "date": attr.date,
            "name": element.name,
            "blood_level": attr.blood_level.comment,
            "weight": attr.weight.comment,
            "exercise": attr.exercise.comment,
            "insulin_intake": attr.insulin_intake.comment

        }
        patient_comment_ls.push(component)
    })
    
    });
    return patient_comment_ls;

}

module.exports = patient_comment_list;