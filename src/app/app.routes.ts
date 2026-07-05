import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { MainLayout } from './core/layouts/main-layout/main-layout';
import { Dashboard } from './features/dashboard/pages/dashboard/dashboard';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'login',
        component: Login
    },

    {
        path: '',
        component: MainLayout,
        canActivate: [authGuard],
        children: [
            {
                path: '',
                component: Dashboard
            }
        ]
    },

    {
        path: '**',
        redirectTo: ''
    }
];
