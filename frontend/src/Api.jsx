import axios from "axios";
const config = {
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
};


// const URL = 'http://localhost:2000';

const URL = 'https://upokar-dashboard-api.onrender.com';

// ---------------- Customer api ------------------------------------
const getAllCustomer = async (id) => {
    try {
        const response = await axios.get(`${URL}/getAllUsers`)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteUser = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteUser/${id}`)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const searchCustomer = async (search = "") => {

    try {
        const response = await axios.post(`${URL}/searchUser`, { query: search }, config);
        return response.data;
    } catch (error) {
        console.error('Error searching for products:', error);
    }
}
// ---------------- Product api ------------------------------------
const getAllProduct = async (id) => {
    try {
        const response = await axios.get(`${URL}/products`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const searchProduct = async (search = "") => {

    try {
        const response = await axios.post(`${URL}/searchProduct`, { query: search }, config);
        return response.data;
    } catch (error) {
        console.error('Error searching for products:', error);
        throw error;
    }
}
const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteProduct/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}


// ---------------- Order api ------------------------------------
const getAllOrders = async () => {
    try {
        const response = await axios.get(`${URL}/getAllOrders`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}
const searchOrders = async (search = "") => {

    try {
        const response = await axios.post(`${URL}/searchOrders`, { q: search }, config);
        return response.data;
    } catch (error) {
        console.error('Error searching for products:', error);
        throw error;
    }
}
const deleteOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
// ---------------- Gift Order api ------------------------------------
const getAllGiftOrder = async () => {
    try {
        const response = await axios.get(`${URL}/getAllGiftOrders`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}

const deleteGiftOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteGiftOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete order');
    }
}

const searchGiftOrders = async (search = "") => {

    try {
        const response = await axios.post(`${URL}/searchGiftOrders`, { query: search }, config);
        return response.data;
    } catch (error) {
        console.error('Error searching for products:', error);
        throw error;
    }
}
// ---------------- Kutir Order api ------------------------------------
const getAllKutirOrders = async () => {
    try {
        const response = await axios.get(`${URL}/getAllKutirOrders`, config)
        return response.data;
    }
    catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}

const searchKutirOrders = async (search = "") => {

    try {
        const response = await axios.post(`${URL}/searchKutirOrders`, { query: search }, config);
        return response.data;
    } catch (error) {
        console.error('Error searching for products:', error);
        throw error;
    }
}

const deleteKutirOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteKutirOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete order');
    }
}

// ---------------- Grocery Order api ------------------------------------


const getAllGroceryOrders = async (page = 1, limit = 10) => {
    try {
        const response = await axios.get(
            `${URL}/getAllGroceryOrders?page=${page}&limit=${limit}`,
            config
        );
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
};
const searchGroceryOrders = async (search = "") => {

    try {
        const response = await axios.post(`${URL}/searchGroceryOrders`, { query: search }, config);
        return response.data;
    } catch (error) {
        console.error('Error searching for products:', error);
        throw error;
    }
}

const getGroceryOrderById = async (id) => {
    try {
        const response = await axios.get(`${URL}/getGroceryOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch order');
    }
}

const deleteGroceryOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteGroceryOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to delete order');
    }
}

const updateOrderStatus = async (id, status) => {
    try {
        const response = await axios.put(`${URL}/updateOrderStatus/${id}`, { status }, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to update order status');
    }
}
// ---------------- Transport api ------------------------------------

const getAllCarOrder = async () => {
    try {
        const response = await axios.get(`${URL}/getAllCarOrder`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}
const getAllBusOrder = async () => {
    try {
        const response = await axios.get(`${URL}/getAllBusOrder`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}
const getAllTruckOrder = async () => {
    try {
        const response = await axios.get(`${URL}/getAllTruckOrder`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}
const getAllCngOrder = async () => {
    try {
        const response = await axios.get(`${URL}/getAllCngOrder`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}
const getAllBikeOrder = async () => {
    try {
        const response = await axios.get(`${URL}/getAllBikeOrder`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}
const getAllLegunaOrder = async () => {
    try {
        const response = await axios.get(`${URL}/getAllLegunaOrder`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all orders');
    }
}
const deleteCarOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteCarOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteBusOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteBusOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteTruckOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteTruckOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteCngOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteCngOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteBikeOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteBikeOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteLegunaOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteLegunaOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}


// ---------------- gesPrice api ------------------------------------
const setGasPrice = async (data) => {
    try {
        const response = await axios.post(`${URL}/setGasPrice`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- cylinder Order api ------------------------------------
const getCylinderOrder = async () => {
    try {
        const response = await axios.get(`${URL}/getCylinderOrder`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteCylinderOrder = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteCylinderOrder/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
// ---------------- Hospital api ------------------------------------
const getAllHospitals = async () => {
    try {
        const response = await axios.get(`${URL}/getAllHospitals`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deletehospitals = async (data) => {
    try {
        const response = await axios.post(`${URL}/deletehospitals`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- Daignostic api ------------------------------------
const getAllDaignostic = async () => {
    try {
        const response = await axios.get(`${URL}/getAllDiagnostic`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

const getAllDiagnosticID = async () => {
    try {
        const response = await axios.get(`${URL}/getAllDiagnosticID`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

const deleteDiagnostic = async (data) => {
    try {
        const response = await axios.post(`${URL}/deleteDiagnostic`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

const getAllDoctors = async () => {
    try {
        const response = await axios.get(`${URL}/getAllDoctors`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const addDoctor = async (data) => {
    try {
        const response = await axios.post(`${URL}/addDoctor`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteDoctor = async (data) => {
    try {
        const response = await axios.post(`${URL}/deleteDoctor`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
// ---------------- Blood api ------------------------------------


const getAllDonor = async () => {
    try {
        const response = await axios.get(`${URL}/getAllDonor`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all blood donor');
    }
}
const deleteDonor = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteDonor/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
// ---------------- Ambulance api ------------------------------------
const getAllAmbulance = async () => {
    try {
        const response = await axios.get(`${URL}/getAllAmbulances`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

const createAmbulance = async (data) => {
    try {
        const response = await axios.post(`${URL}/createAmbulance`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteAmbulance = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteAmbulance/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
// ---------------- Pharmacy api ------------------------------------
const getAllPharmacy = async () => {
    try {
        const response = await axios.get(`${URL}/getPharmacy`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const createPharmacy = async (data) => {
    try {
        const response = await axios.post(`${URL}/createPharmacy`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deletePharmacy = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deletePharmacy/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- HomioPet api ------------------------------------
const createHomio = async (data) => {
    try {
        const response = await axios.post(`${URL}/createHomio`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all data');
    }
}
const getHomio = async () => {
    try {
        const response = await axios.get(`${URL}/getHomio`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all data');
    }
}
const deleteHomio = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteHomio/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all data');
    }
}

// ---------------- AnimalCare api ------------------------------------

const getAnimalCare = async () => {
    try {
        const response = await axios.get(`${URL}/getAnimalCare`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const createAnimalCare = async (data) => {
    try {
        const response = await axios.post(`${URL}/createAnimalCare`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteAnimalCare = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteAnimalCare/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- SliderImage api ------------------------------------
const getAllSliderImages = async () => {
    try {
        const response = await axios.get(`${URL}/getAllSliderImages`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const createSliderImage = async (data) => {
    // console.log(data.entries());

    // for (let pair of data.entries()) {
    //     console.log(pair[0] + ':', pair[1]);
    // }
    try {
        const response = await axios.post(`${URL}/slideImages/upload`, data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const updateSliderImage = async (data) => {
    try {
        const response = await axios.post(`${URL}/slideImages/update`, data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteSliderImage = async (data) => {
    console.log(data);
    try {
        const response = await axios.post(`${URL}/deleteSliderImage`, data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
// ---------------- SliderGrocaryImage api ------------------------------------


const getAllGrocarySliderImages = async () => {
    try {
        const response = await axios.get(`${URL}/getAllGrocarySliderImages`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const createGrocarySliderImage = async (data) => {
    try {
        const response = await axios.post(`${URL}/slideGrocaryImages/upload`, data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

const updateGrocarySliderImage = async (data) => {
    try {
        const response = await axios.post(`${URL}/slideGrocaryImages/update`, data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

const deleteGrocarySliderImage = async (data) => {
    try {
        const response = await axios.post(`${URL}/deleteGrocarySliderImage`, data)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}


// ---------------- Community api ------------------------------------

const getAllCommunity = async () => {
    try {
        const response = await axios.get(`${URL}/getAllCommunity`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deletecommunity = async (data) => {
    try {
        const response = await axios.post(`${URL}/deletecommunity`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- Kutir Shilpo api ------------------------------------

const getAllKutirShilpo = async () => {
    try {
        const response = await axios.get(`${URL}/getAllKutirShilpo`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
const deleteKutirShilpo = async (data) => {
    try {
        const response = await axios.post(`${URL}/deletekutirshilpo`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- Gift api ------------------------------------

const getAllGift = async () => {
    try {
        const response = await axios.get(`${URL}/getAllGifts`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch gift items');
    }
}
const deleteGift = async (data) => {
    try {
        const response = await axios.post(`${URL}/deleteGift`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch gift items');
    }
}

// ---------------- Tuition api ------------------------------------
const createTuition = async (data) => {
    try {
        const response = await axios.post(`${URL}/createTuition`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const getAllTuitions = async () => {
    try {
        const response = await axios.get(`${URL}/getAllTuitions`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const deleteTuition = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteTuition/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}

// ---------------- Coaching api ------------------------------------
const getAllCoaching = async () => {
    try {
        const response = await axios.get(`${URL}/getAllCoaching`, config)
        return response.data;
    }
    catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const deleteCoaching = async (data) => {
    try {
        const response = await axios.post(`${URL}/deleteCoaching`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- Skill and IT api ------------------------------------

const getAllSkillAndIT = async () => {
    try {
        const response = await axios.get(`${URL}/getAllSkillAndIT`, config)
        return response.data;
    }
    catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const deleteSkillAndIT = async (data) => {
    try {
        const response = await axios.post(`${URL}/deleteSkillAndIT`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- Volunteer api ------------------------------------
const getAllVolunteer = async () => {
    try {
        const response = await axios.get(`${URL}/getAllVolunteer`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}

const deleteVolunteer = async (data) => {
    try {
        const response = await axios.post(`${URL}/deleteVolunteer`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}

// ---------------- Jobs api ------------------------------------

const createJob = async (data) => {
    try {
        const response = await axios.post(`${URL}/createJob`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const getAllJobs = async () => {
    try {
        const response = await axios.get(`${URL}/getAllJobs`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const deleteJob = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteJob/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}

// ---------------- Labor api ------------------------------------
const getAllLabor = async () => {
    try {
        const response = await axios.get(`${URL}/getAllLabor`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}

const deleteLabor = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteLabor/${id}`)
        return response.data;
    } catch {
        throw new Error('Failed to fetch all admins');
    }

}
// ---------------- Lost api ------------------------------------
const getAllLostPerson = async () => {
    try {
        const response = await axios.get(`${URL}/getAllLostPerson`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const deleteLostPerson = async (data) => {
    try {
        const response = await axios.post(`${URL}/deleteLostPerson`, data)
        return response.data;
    } catch {
        throw new Error('Failed to fetch all admins');
    }
}
// ---------------- Total api ------------------------------------
const getTotalCounts = async () => {
    try {
        const response = await axios.get(`${URL}/getTotalCounts`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
// ---------------- Admin api ------------------------------------
const createAdmin = async (data) => {
    try {
        const response = await axios.post(`${URL}/createAdmin`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const alladmin = async () => {
    try {
        const response = await axios.get(`${URL}/getAllAdmin`, config)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
}
const adminLogin = async (data) => {
    try {
        const response = await axios.post(`${URL}/adminLogin`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const adminUpdate = async (data) => {
    try {
        const response = await axios.post(`${URL}/adminUpdate`, data, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admins');
    }
}
const getAdminData = async () => {
    try {
        const response = await axios.get(`${URL}/getAdminData`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch admin data');
    }
}


const deleteAdmin = async (id) => {
    try {
        const response = await axios.delete(`${URL}/deleteAdmin/${id}`, config)
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch all admin data');
    }
}
export {
    // Customer-related functions
    getAllCustomer,
    deleteUser,
    searchCustomer,

    // Product-related functions
    getAllProduct,
    searchProduct,
    deleteProduct,

    // Order-related functions
    getAllOrders,
    searchOrders,
    deleteOrder,

    // Gift-Order-related functions
    getAllGiftOrder,
    deleteGiftOrder,
    searchGiftOrders,

    // Gift-Order-related functions
    getAllKutirOrders,
    searchKutirOrders,
    deleteKutirOrder,

    // Grocery-Order-related functions
    getAllGroceryOrders,
    searchGroceryOrders,
    getGroceryOrderById,
    deleteGroceryOrder,
    updateOrderStatus,
    // Transport-related functions
    getAllCarOrder,
    getAllBusOrder,
    getAllTruckOrder,
    getAllCngOrder,
    getAllBikeOrder,
    getAllLegunaOrder,
    deleteCarOrder,
    deleteBusOrder,
    deleteTruckOrder,
    deleteCngOrder,
    deleteBikeOrder,
    deleteLegunaOrder,

    // GasPrice-related functions
    setGasPrice,

    // GasPrice-related functions
    getCylinderOrder,
    deleteCylinderOrder,


    // Hospital-related functions
    getAllHospitals,
    deletehospitals,

    // Diagnostic-related functions

    getAllDaignostic,
    getAllDiagnosticID,
    deleteDiagnostic,
    getAllDoctors,
    deleteDoctor,
    addDoctor,

    // Blood-related functions

    getAllDonor,
    deleteDonor,
    // Ambulance-related functions

    getAllAmbulance,
    createAmbulance,
    deleteAmbulance,

    // Pharmacy-related functions
    getAllPharmacy,
    createPharmacy,
    deletePharmacy,

    // HomioPet-related functions
    getHomio,
    createHomio,
    deleteHomio,

    // AnimalCare-related functions
    createAnimalCare,
    getAnimalCare,
    deleteAnimalCare,

    // SliderImage-related functions
    getAllSliderImages,
    createSliderImage,
    updateSliderImage,
    deleteSliderImage,

    // SliderGrocartImage-related functions
    getAllGrocarySliderImages,
    createGrocarySliderImage,
    updateGrocarySliderImage,
    deleteGrocarySliderImage,

    // Community-related functions

    getAllCommunity,
    deletecommunity,

    // KutirShilpo-related functions

    getAllKutirShilpo,
    deleteKutirShilpo,

    // Gift-related functions
    getAllGift,
    deleteGift,
    // Tuition-related functions
    createTuition,
    getAllTuitions,
    deleteTuition,

    // Coaching-related functions
    getAllCoaching,
    deleteCoaching,

    // Skill and IT-related functions
    getAllSkillAndIT,
    deleteSkillAndIT,

    // Volunteer-related functions
    getAllVolunteer,
    deleteVolunteer,

    // Job-related functions
    createJob,
    getAllJobs,
    deleteJob,

    // Labor-related functions
    getAllLabor,
    deleteLabor,

    // Lost-related functions
    getAllLostPerson,
    deleteLostPerson,

    // Total-related functions
    getTotalCounts,
    // Admin-related functions
    createAdmin,
    alladmin,
    adminLogin,
    getAdminData,
    adminUpdate,
    deleteAdmin
}
