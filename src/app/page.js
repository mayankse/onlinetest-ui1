'use client'
import { Header } from "./Header";
import { Test } from "./Test";
import { Footer } from "./Footer";
import { Loader } from "./Loader";
import { connect } from "react-redux";

function App(props) {
  const { isShowLoader, isShowModal } = props;
  return <div>
      <Header />
      <Test />
      <Footer />
   {isShowLoader && <Loader/>}
    </div>
  
}
App = connect((state) => {
  const { isShowLoader, isShowModal } = state.appReducer
  return {
    isShowLoader,
    isShowModal,
  }
}
)(App)

export default App;
