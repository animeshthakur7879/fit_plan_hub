const getTrainerPlans = async (trainerId , token) => {
    let options = {
        headers : {
            authorization : `Bearer ${token}`
        }

    }
    const response = await axios.get(`${api}/plans/${trainerId}` , options);
    // return response.data;
    // clg(response.data)
    console.log(response.data)
}

const addPlan = async (planData) => {
    const response = await axios.post(`${api}/plans/`, planData);
    // return response.data;
    console.log(response.data)
}

const mplanService = {
    getTrainerPlans , 
    addPlan
};

export default mplanService;