import React from 'react';
import { createHashRouter } from 'react-router-dom';
import AddUser from '../components/AddUser/AddUser';
import AddAsset from '../components/AddAsset';
import DefaultLayout from '../components/DefaultLayout';
import EditAsset from '../components/EditAsset';
import EditUser from '../components/EditUser';
import Home from './Home';
import Login from './Login';
import ManagerUser from './ManagerUser';
import ManagerAsset from './ManagerAsset';
import ManageAssignment from './ManageAssignment';
import NotFound from './NotFound';
import CreateAssignment from '../components/CreateAssignment/Display/CreateAssignment';
import ManageRequest from './ManageRequest';
import EditAssigment from '../components/EditAssigment/Display';

const admin = JSON.parse(localStorage.getItem('admin'));
const token = JSON.parse(localStorage.getItem('token'));

const roleUser = () => {
    if (token && admin === true) {
        return [
            {
                path: '/home',
                label: [
                    {
                        string: 'Home',
                        path: '/home',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <Home />
                    </DefaultLayout>
                ),
            },
            {
                path: '/manage-user',
                label: [
                    {
                        string: 'Manage User',
                        path: '/manage-user',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <ManagerUser />
                    </DefaultLayout>
                ),
            },
            {
                path: `/manage-user/edit/:id`,
                label: [
                    {
                        string: 'Manage User',
                        path: '/manage-user',
                    },
                    {
                        string: '> Edit User',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <EditUser />
                    </DefaultLayout>
                ),
            },
            {
                path: '/manage-user/create',
                label: [
                    {
                        string: 'Manage User',
                        path: '/manage-user',
                    },
                    {
                        string: '> Create New User',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <AddUser />
                    </DefaultLayout>
                ),
            },

            {
                path: '/manage-asset/edit/:id',
                label: [
                    {
                        string: 'Manage Asset',
                        path: '/manage-asset',
                    },
                    {
                        string: '> Edit Asset',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <EditAsset />
                    </DefaultLayout>
                ),
            },

            {
                path: '/manage-asset/create',
                label: [
                    {
                        string: 'Manage Asset',
                        path: '/manage-asset',
                    },
                    {
                        string: '> Create New Asset',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <AddAsset />
                    </DefaultLayout>
                ),
            },
            {
                path: '/manage-asset',
                label: [
                    {
                        string: 'Manage Asset',
                        path: '/manage-asset',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <ManagerAsset />
                    </DefaultLayout>
                ),
            },
            {
                path: '/manage-assignment',
                label: [
                    {
                        string: 'Manage Assignment',
                        path: '/manage-assignment',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <ManageAssignment />
                    </DefaultLayout>
                ),
            },
            {
                path: '/manage-assignment/create',
                label: [
                    {
                        string: 'Manage Assignment',
                        path: '/manage-assignment',
                    },
                    {
                        string: '> Create New Assignment',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <CreateAssignment />
                    </DefaultLayout>
                ),
            },
            {
                path: '/manage-request',
                label: [
                    {
                        string: 'Request for Returning',
                        path: '/manage-request',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <ManageRequest />
                    </DefaultLayout>
                ),
            },
            {
                path: '/manage-assignment/edit/:id',
                label: [
                    {
                        string: 'Manage Assignment',
                        path: '/manage-assignment',
                    },
                    {
                        string: '> Edit Assignment',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <EditAssigment />
                    </DefaultLayout>
                ),
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ];
    }
    if (token && admin === false) {
        return [
            {
                path: '/home',
                label: [
                    {
                        string: 'Home',
                        path: '/home',
                    },
                ],
                element: (
                    <DefaultLayout>
                        <Home />
                    </DefaultLayout>
                ),
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ];
    }
    if (!token) {
        return [
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '*',
                element: <NotFound />,
            },
        ];
    }
};

const router = createHashRouter(roleUser());

export default router;
