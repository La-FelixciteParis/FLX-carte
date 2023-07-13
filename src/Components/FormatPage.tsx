// Retourne le format de page avec le header et le fouter qui encader le tout

//Import Style
import { Body } from "../Styles/Général";

//Import Type
import { ChildrenPropsType } from "../Types/Children";

//Import Components
import { Footer } from "./Footer";
import { Header } from "./Header";

export const FormaPage = ({children}:ChildrenPropsType)=>{
    return(
        <Body>
            <Header/>
            {children}
            <Footer/>
        </Body>
    )
}