
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Login from "./pages/Login";
import PrivateRoutes from "./utils/PrivateRoutes";
import PublicRoute from "./utils/PublicRoute";
import Signup from "./pages/Signup";
import LoadingOverlay from "react-loading-overlay";
import { start_loading, stop_loading } from "./Redux/Reducers";
import { useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Transactions from "./pages/Transactions";


function App(props) {
  useEffect(() => {
    console.log("app", props.load);
  }, [props.load]);

  return (
    <LoadingOverlay active={props.load} spinner text="Loading your content...">
      <div className="App">
        <ToastContainer
          position="top-right"
          
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route element={<Home />} path="/" exact />
              <Route element={<Products />} exact path="/product/:name" />
              <Route element={<Transactions />} exact path="/transactions" />

            </Route>
            <Route element={<PublicRoute />}>
              <Route element={<Login />} path="/login" />
              <Route element={<Signup />} path="/signup" />
            </Route>
          </Routes>
        </Router>
      </div>
    </LoadingOverlay>
  );
}

const mapStateToProps = (state) => {
  return {
    load: state.load,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    start_loading: () => dispatch(start_loading()),
    stop_loading: () => dispatch(stop_loading()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
