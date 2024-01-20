import React from "react";
import { Redirect } from "react-router-dom";
import SimpleLayout from "./layouts/SimpleLayout";
const HOME = "/";
const DAPP = HOME + "dapp/";
const DAPP_HOME = DAPP + "home";
const DAPP_USER = DAPP + "user/:address";
const DAPP_LAUNCHPAD = DAPP + "presales/";
const DAPP_LAUNCHPAD_CREATE_OR_EDIT = DAPP_LAUNCHPAD + "edit/:presaleAddress";
const DAPP_LAUNCHPAD_ALL = DAPP_LAUNCHPAD + "all";
const DAPP_LAUNCHPAD_VIEW = DAPP_LAUNCHPAD + "view/:presaleAddress/:tab";

export const ROUTES_PATHS = {
  HOME,
  DAPP_BASE: `${DAPP}`,
  DAPP_HOME: `${DAPP_HOME}`,
  DAPP_USER: `${DAPP_USER}`,
  DAPP_LAUNCHPAD: `${DAPP_LAUNCHPAD}`,
  DAPP_LAUNCHPAD_CREATE_OR_EDIT: `${DAPP_LAUNCHPAD_CREATE_OR_EDIT}`,
  DAPP_LAUNCHPAD_ALL: `${DAPP_LAUNCHPAD_ALL}`,
  DAPP_LAUNCHPAD_VIEW: `${DAPP_LAUNCHPAD_VIEW}`,
};

export const appRoutes = [
  {
    exact: true,
    path: ROUTES_PATHS.HOME,
    component: () => {
      return <Redirect to={ROUTES_PATHS.DAPP_HOME} />;
    },
  },
  /*
         dapp it's better to render home in a route other than / to make use of layouts
         layout will not rerender on route change
         of course if you use anything other than hashrouter you will have to adjust your server
         to serve the index.html file for all routes
     */
  {
    path: ROUTES_PATHS.DAPP_BASE,
    layout: SimpleLayout, // React.lazy(() => import("./layouts/SimpleLayout")),
    routes: [
      {
        path: ROUTES_PATHS.DAPP_HOME,
        exact: true,
        component: React.lazy(() => import("./pages/Home")),
      },
      {
        path: "*",
        component: () => {
          return <Redirect to={ROUTES_PATHS.DAPP_HOME} />;
        },
      },
    ],
  },
];
