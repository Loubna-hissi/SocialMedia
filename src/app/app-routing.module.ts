import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuardService } from 'src/sm-api/src/services/guard/guard.service';
import { ContentComponent } from './components/content/content.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { RegisterComponent } from './pages/register/register.component';
import { SettingComponent } from './pages/setting/setting.component';

const routes: Routes = [
  {path:'register',component:RegisterComponent},
  {path:'login',component:LoginComponent},
  {path:'',component:HomeComponent,
  canActivate:[GuardService],
    children:
          [
            {
              path:'profil/notUser',component:ProfileComponent,
              canActivate:[GuardService],
            },
            {
              path:'profil',component:ProfileComponent,
              canActivate:[GuardService],
            },

            {
              path:'settings',component:SettingComponent,
              canActivate:[GuardService],
            },
            { path: '', component:ContentComponent },
          ]
},
  {path:'**',component:NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
