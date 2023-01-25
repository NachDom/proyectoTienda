import { Route, RouterModule, Routes} from "@angular/router";
import { ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";

const appRoute : Routes = [

    {path: '', component: InicioComponent }
]

export const AppRoutingProviders : any [] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
