import { createBrowserRouter } from "react-router";
import App from "../App";
import Contact from "../pages/Contact";
// import Feedback from "../pages/Feedback";

const router = createBrowserRouter([
   {
      path: '/',
      element: <Contact />
   },
   {
      path: '/e-menu',
      element: <App />
   },
   {
      path: '/contact',
      element: <Contact />
   },
   // {
   //    path: '/feedback',
   //    element: <Feedback />
   // }
])

export default router;