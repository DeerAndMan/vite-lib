import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";

import Layout from "@/layouts";

import type { RouteObject } from "react-router-dom";

export const HomePage = lazy(() => import("@pages/home"));
export const Login = lazy(() => import("@pages/login"));
// export const GridShow = lazy(() => import('@/pages/grid/grid-show'));
// export const Charts = lazy(() => import('@/pages/charts/charts'));
// export const GridLayout = lazy(() => import('@/pages/grid/grid-layout'));
// export const SigmaGraph = lazy(() => import('@/pages/sigma-graph/graph'));

const routerList: RouteObject[] = [
  {
    element: (
      <Layout>
        <Suspense fallback={<Spin />}>
          <Outlet />
        </Suspense>
      </Layout>
    ),

    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element: <Login /> },
      // { path: '/grid-show', element: <GridShow /> },
      // { path: '/charts', element: <Charts /> },
      // { path: '/grid-layout', element: <GridLayout /> },
      // { path: 'sigma-graph', element: <SigmaGraph /> }
    ],
  },
];

/* eslint-disable react-refresh/only-export-components */
export default routerList;
