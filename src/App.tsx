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

const App = () =>{
  return(
    <BrowserRouter>
      <Global/>
      <UserContextProvider>
          <CommerçantContextProvider>
            <FormaPage>
              <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/Connect" element={<Connect/>}/>
                <Route path="/User/:id" element={<Info/>}/>
                <Route path="/Commerce/:id" element={<Commerce/>}/>
                <Route path="/Login" element={<LoginCommerçant/>}/>
                <Route path="/Village" element={<Village/>}/>
                <Route path="/Evenement/:id" element={<Evenement/>}/>
                <Route path="/Admin" element={<Admin/>}/>
                <Route path="/Admin/Carte/:id" element={<Carte/>}/>
                <Route path="/Admin/Vitrophanie/:id" element={<Vitrophanie/>}/>
              </Routes>
          </FormaPage>
          </CommerçantContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App;
