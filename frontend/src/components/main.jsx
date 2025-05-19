import "./main.css";
import { useContext, useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom"
import { Context } from "../context"

import Login from "./login/login"
import Home from "./home"
import HomeContainer from "./homeContainer"
import UpadateAdmin from "./userControll/updateAdmin"
import AddProduct from "./addProduct/addProduct";
import Product from "./showProduct/products"
import AdminsTable from "./admins/showAdmins";
import ShowCustomer from "./customers/showCustomers"
import ShowOrder from "./order/showOrder"
import CreateAdmin from "./admins/createAdmin"
import Transport from "./transport/showTransport"
import GasPrice from "./gasPrice"
import Cylinder from "./cylinder/showCylinder"
import ShowImage from "../components/Cimages/showImages"
import ShowGrocaryImage from "../components/Cgimages/showImages.jsx"
import ShowTuitions from "../components/tuitions/showTuitions"
import AddTuition from "../components/tuitions/addTuition"
import ShowAllJobs from "../components/jobs/showAlljobs"
import AddJob from "../components/jobs/addJob"
import Labor from "../components/labor/showLabor"
import LostPerson from "../components/lostPerson/showAllPerson"
import AddHospital from "../components/hospital/addHospital"
import ShowHospitals from "../components/hospital/showHospital"
import AddAmbulance from "../components/ambulance/addAmdulance"
import ShowAmbulance from "../components/ambulance/showAmbulance"
import ShowPharmacy from "../components/pharmacy/showPharmacy"
import AddPharmacy from "../components/pharmacy/addPharmacy"
import AnimalCare from "../components/animalCare/showAnimaleCare"
import AddAnimal from "../components/animalCare/addAnimalCare"
import Homeopathy from "../components/homio/showHomio"
import AddHomeopathy from "../components/homio/addHomio"
import AddCommunity from "../components/community/addCommunity"
import ShowCommunityCenter from "../components/community/showCommunity"
import AddKutirShilpo from "../components/kutirShilpo/addKutirShilpo"
import ShowKutirShilpo from "../components/kutirShilpo/showKutirShilpo"
import AddSkillandit from "../components/skillAndIT/addSkillAndIT"
import ShowSkillandit from "../components/skillAndIT/showSkillAndIT"
import AddGifts from "../components/gifts/addGifts"
import ShowGifts from "../components/gifts/showGifts"
import Giftorders from "../components/gifts/giftOrder"
import KutirOrder from "../components/kutirShilpo/kutirOrder";
import AddVolunteers from "../components/volunteers/addVolunteer";
import ShowVolunteers from "../components/volunteers/showVolunteer";
import AddLink from "../components/linkProduct/linkProduct";
import AddDiagnostic from "../components/diagnostic/addDiagnostic";
import ShowDiagnostic from "../components/diagnostic/showDiagnostic";
import AddDoctor from "../components/diagnostic/addDoctor.jsx";
import Doctors from "../components/diagnostic/doctors";
import BloodDonners from "../components/blood donors/showBloodDonors"
import Groceryorders from "../components/grocery/showGroceryOrder"
import GroceryorderDetails from "../components/grocery/groceryOrderDetails"
export default function App() {
    const { state, dispatch } = useContext(Context);
    const online = () => {
        dispatch({ type: "CONNECTION", payload: true });
    }
    const offline = () => {
        dispatch({ type: "CONNECTION", payload: false });
    }
    window.addEventListener("online", online);
    window.addEventListener("offline", offline);

    return (
        < Routes >
            {
                !state.isLogin ? <Route path='/*' element={<Login />} />
                    : (
                        <Route path='/' element={<Home />}>
                            <Route path='/' element={<HomeContainer />} />
                            <Route path='/customers' element={<ShowCustomer />} />
                            <Route path='/addProduct' element={<AddProduct />} />
                            <Route path='/addProductLink' element={<AddLink />} />
                            <Route path='/hospitals' element={<ShowHospitals />} />
                            <Route path='/addHospital' element={<AddHospital />} />
                            <Route path='/diagnostics' element={<ShowDiagnostic />} />
                            <Route path='/addDiagnostic' element={<AddDiagnostic />} />
                            <Route path='/doctors' element={<Doctors />} />
                            <Route path='/addDoctor' element={<AddDoctor />} />
                            <Route path="/bloodDonors" element={<BloodDonners />} />
                            <Route path='/ambulances' element={<ShowAmbulance />} />
                            <Route path='/addAmbulance' element={<AddAmbulance />} />
                            <Route path='/pharmacies' element={<ShowPharmacy />} />
                            <Route path='/addPharmacy' element={<AddPharmacy />} />
                            <Route path='/animals' element={<AnimalCare />} />
                            <Route path='/addAnimal' element={<AddAnimal />} />
                            <Route path='/homeopathy' element={<Homeopathy />} />
                            <Route path='/addHomeopathy' element={<AddHomeopathy />} />
                            <Route path='/addCommunity' element={<AddCommunity />} />
                            <Route path='/community-centers' element={<ShowCommunityCenter />} />
                            <Route path='/addKutirShilpo' element={<AddKutirShilpo />} />
                            <Route path='/kutirshilpo' element={<ShowKutirShilpo />} />
                            <Route path='/skillandit' element={<ShowSkillandit />} />
                            <Route path='/addSkillAndIT' element={<AddSkillandit />} />
                            <Route path='/gifts' element={<ShowGifts />} />
                            <Route path='/addGift' element={<AddGifts />} />
                            <Route path='/giftorders' element={<Giftorders />} />
                            <Route path='/kutirorders' element={<KutirOrder />} />
                            <Route path='/products' element={<Product />} />
                            <Route path='/orders' element={<ShowOrder />} />
                            <Route path='/groceryorders' element={<Groceryorders />} />
                            <Route path='/groceryorders/:id' element={<GroceryorderDetails />} />
                            <Route path='/transport' element={<Transport />} />
                            <Route path='/addGasPrice' element={<GasPrice />} />
                            <Route path='/cylinder' element={<Cylinder />} />
                            <Route path='/images' element={<ShowImage />} />
                            <Route path='/gimages' element={<ShowGrocaryImage />} />
                            <Route path='/tuitions' element={<ShowTuitions />} />
                            <Route path='/addTuition' element={<AddTuition />} />
                            <Route path='/jobs' element={<ShowAllJobs />} />
                            <Route path='/addjob' element={<AddJob />} />
                            <Route path='/labors' element={<Labor />} />
                            <Route path='/volunteers' element={<ShowVolunteers />} />
                            <Route path='/addVolunteers' element={<AddVolunteers />} />
                            <Route path='/lostpersons' element={<LostPerson />} />
                            <Route path='/admins' element={<AdminsTable />} />
                            <Route path='/createadmin' element={<CreateAdmin />} />
                            <Route path='/profile' element={<UpadateAdmin />} />
                            <Route path='course/new' element={
                                state.connection && <h1>Connected</h1>
                            } />
                            <Route path="/*" element={<h1>Nothing Found</h1>} />
                        </Route>
                    )
            }
            {/* <Route path='/' element={<Home />}>
                <Route path='/' element={<HomeContainer />} />
                <Route path='students' element={<Allstudent />} />
                <Route path='student/new' element={<AddStudent />} />
                <Route path='studnts/views/:id' element={<SingelStudent />} />
                <Route path='studnts/edit/:id' element={<EditStudent />} />
                <Route path='student/result/new' element={<AddStudentResult />} />
                <Route path='teachers' element={<AllTeacher />} />
                <Route path='teacher/new' element={<NewTeacher />} />
                <Route path='courses' element={<AllCourse />} />
                <Route path='course/views/:id' element={<SingelCourse />} />
                <Route path='/course/edit/:id' element={<EditCourse />} />
                <Route path='course/new' element={
                    state.connection && <h1>Connected</h1>
                } />
                <Route path="/*" element={<h1>Nothing Found</h1>} />
            </Route> */}
        </Routes >
    )
}