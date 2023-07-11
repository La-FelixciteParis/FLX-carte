import { BrowserRouter, Routes,Route } from "react-router-dom";
import { FormaPage } from "./Components/FormatPage";
import { CommerçantContextProvider } from "./Context/Commercant";
import { UserContextProvider } from "./Context/IdUser";
import { Connect } from "./Pages/Connect";
import { Info } from "./Pages/Info";
import { LoginCommerçant } from "./Pages/LoginCommerçant";
import Global from "./Styles/Général";
import { Admin } from "./Pages/Admin";
import { Commerce } from "./Pages/Commerce";
import 'leaflet/dist/leaflet.css'
import { Home } from "./Pages/Home";
import { Village } from "./Pages/Village";
import { Evenement } from "./Pages/Evenement";
import { Carte } from "./Pages/Carte";
import { Vitrophanie } from "./Pages/Vitrophanie";
import { AudioPage } from "./Pages/AudioPage";
import { Email } from "./Pages/Email";

const App = () =>{
  return(
    <BrowserRouter>
      <Global/>

      <UserContextProvider>

          <CommerçantContextProvider>

            {/* Mais le header et le footer */}
            <FormaPage>  

              <Routes>

                {/*homepage */}
                <Route path="/" element={<Home/>}/>  {/* Pas encore fait r'envoie au connect de base */}

                {/*Log */}
                <Route path="/Connect" element={<Connect/>}/> {/*connection manuel/PC */}
                <Route path="/Login" element={<LoginCommerçant/>}/> {/* log des commerçant */}

                {/*Page d'information */}
                <Route path="/User/:id" element={<Info/>}/> {/* page perso */}
                <Route path="/Commerce/:id" element={<Commerce/>}/>  {/* page commerçant */}
                <Route path="/Village" element={<Village/>}/>{/* page village */}
                <Route path="/Evenement/:id" element={<Evenement/>}/> {/* page Evenement */}

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
