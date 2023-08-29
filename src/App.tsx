
/* import Base */
import { BrowserRouter, Routes,Route } from "react-router-dom";

/*import context*/
import { CommerçantContextProvider } from "./Context/Commercant";
import { UserContextProvider } from "./Context/IdUser";

/*import Component */
import { FormaPage } from "./Components/FormatPage";

/*import pages */
import { Connect } from "./Pages/Connect";
import { Info } from "./Pages/Info";
import { LoginCommerçant } from "./Pages/LoginCommerçant";
import { Admin } from "./Pages/Admin";
import { Commerce } from "./Pages/Commerce";
import { Home } from "./Pages/Home";
import { Village } from "./Pages/Village";
import { Evenement } from "./Pages/Evenement";
import { Carte } from "./Pages/Carte";
import { Vitrophanie } from "./Pages/Vitrophanie";
import { AudioPage } from "./Pages/AudioPage";
import { Email } from "./Pages/Email";

/*import style */
import Global from "./Styles/Général";
import 'leaflet/dist/leaflet.css'
import { Evenements } from "./Pages/Evenements";
import { ACPB } from "./Pages/ACPB";


const App = () =>{
  return(
    <BrowserRouter>

      <Global/> {/*Style global */}

      {/*Contect */}
      <UserContextProvider>{/*Contexte utilisateur */}
          <CommerçantContextProvider>{/*Contexte Commerçant */}

            {/* Mais le header et le footer */}
            <FormaPage>  

              <Routes>

                {/*homepage et pres*/}
                <Route path="/" element={<Home/>}/>  {/* Homepage : Presentation de la FLX */}
                <Route path="/ACPB" element={<ACPB/>}/> {/*Presentation de l'ACPB */}

                {/*Log */}
                <Route path="/Connect" element={<Connect/>}/> {/*connection manuel/PC */}
                <Route path="/Login" element={<LoginCommerçant/>}/> {/* log des commerçant */}

                {/*Page d'information */}
                <Route path="/User/:id" element={<Info/>}/> {/* page perso */}
                <Route path="/Commerce/:id" element={<Commerce/>}/>  {/* page commerçant */}
                <Route path="/Villages" element={<Village/>}/>{/* page village */}
                <Route path="/Evenements" element={<Evenements/>}/> {/*Pages des Evenements */}
                <Route path="/Evenement/:id" element={<Evenement/>}/> {/* page d'un Evenement */}
                <Route path="/Email" element={<Email/>}/>{/*Envoie email aide */}

                {/* page Admin */}
                <Route path="/Admin" element={<Admin/>}/> {/*Admin central */}
                <Route path="/Admin/Carte/:id" element={<Carte/>}/> {/* Carte auto */}
                <Route path="/Admin/Vitrophanie/:id" element={<Vitrophanie/>}/> {/* vitrophanie auto */}
                <Route path="/Audio/:id" element={<AudioPage/>}/> {/*  QRcode audio */}

              </Routes>

          </FormaPage>

          </CommerçantContextProvider>
      </UserContextProvider>

    </BrowserRouter>
  )
}

export default App;
