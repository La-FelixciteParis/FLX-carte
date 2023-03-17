import { BrowserRouter, Routes,Route } from "react-router-dom";
import { FormaPage } from "./Components/FormatPage";
import { CommerçantContextProvider } from "./Context/Commercant";
import { UserContextProvider } from "./Context/IdUser";
import { Connect } from "./Pages/Connect";
import { Info } from "./Pages/Info";
import { LoginCommerçant } from "./Pages/LoginCommerçant";
import Global from "./Styles/Général";

const App = () =>{
  return(
    <BrowserRouter>
      <Global/>
      <UserContextProvider>
          <CommerçantContextProvider>
            <FormaPage>
              <Routes>
                <Route path="/" element={<Connect/>}/>
                <Route path="/User/:id" element={<Info/>}/>
                <Route path="/Login" element={<LoginCommerçant/>}/>
              </Routes>
          </FormaPage>
          </CommerçantContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  )
}

export default App;
