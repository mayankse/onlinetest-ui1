'use client'
import { Header } from "./Header";
import { Test } from "./Test";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { connect } from "react-redux";
import { appReducer } from "./reducers/appReducer";


function App(props) {
  const { isShowLoader, isShowModal } = props;
  return <div>
      <Header />
      <Test />
      <Footer />
   {isShowLoader && <Loader/>}
      {isShowModal && <Modal/>}
    </div>
  
}
App = connect(
  (state) => {
  const { isShowLoader, isShowModal } = state.appReducer
  return {
    isShowLoader,isShowModal
  }
}
)(App)

export default App;
